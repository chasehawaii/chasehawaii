import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';


/* eslint-env node, jquery */


Template.Beach_Cards.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.subscribe('Profiles');
  this.cards = new ReactiveDict();
});
Template.Hike_Cards.onCreated(function onCreated() {
  this.subscribe('Hikes');
  this.subscribe('Profiles');
});
Template.Restaurant_Cards.onCreated(function onCreated() {
  this.subscribe('Restaurants');
  this.subscribe('Profiles');
});

Template.Beach_Cards.helpers({
  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY');
  },
  inBucketList() {
    const usernameCurrent = Meteor.user().profile.name;
    const bucketlist = Profiles.findOne({ username: usernameCurrent }).bucketlist;
    return _.contains(bucketlist, this.beach._id);
  },
  beachAbout() {
    const about = this.beach.about;
    return about.substring(0, 100);
  },
  activePage() {
    let username = Meteor.user().profile.name;
    const path = FlowRouter.current().path;
    username = `/${username}/profile`;
    return username === path;
  },
});
Template.Hike_Cards.helpers({
  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY');
  },
  inBucketList() {
    const usernameCurrent = Meteor.user().profile.name;
    const bucketlist = Profiles.findOne({ username: usernameCurrent }).bucketlist;
    return _.contains(bucketlist, this.hike._id);
  },
  hikeAbout() {
    const about = this.hike.about;
    return about.substring(0, 100);
  },
  equal(a, b) {
    return a === b;
  },
  activePage() {
    let username = Meteor.user().profile.name;
    const path = FlowRouter.current().path;
    username = `/${username}/profile`;
    return username === path;
  },
});
Template.Restaurant_Cards.helpers({
  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY');
  },
  inBucketList() {
    const usernameCurrent = Meteor.user().profile.name;
    const bucketlist = Profiles.findOne({ username: usernameCurrent }).bucketlist;
    return _.contains(bucketlist, this.restaurant._id);
  },
  restaurantAbout() {
    const about = this.restaurant.about;
    return about.substring(0, 100);
  },
  activePage() {
    let username = Meteor.user().profile.name;
    const path = FlowRouter.current().path;
    username = `/${username}/profile`;
    return username === path;
  },
});

Template.Beach_Cards.events({
  'click .beach-bucket'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.beach._id;
    if (_.every(profileName.bucketlist, function (id) { return id !== cardId; })) {
      Profiles.update(profileId, { $push: { bucketlist: cardId } });
    }
  },
  'click .beach-likes'(event) {
    event.preventDefault();
    const cardId = this.beach._id;
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    if (!_.contains(profileName.yourlikes, cardId)) {
      let initialLikes = Beaches.findOne({ _id: cardId }).likes;
      if (!initialLikes) {
        initialLikes = 0;
      }
      Beaches.update(cardId, { $set: { likes: initialLikes + 1 } });
      Profiles.update(profileId, { $push: { yourlikes: cardId } });
    }
  },
  'click .beach-bucket-remove'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.beach._id;
    Profiles.update(profileId, { $set: { bucketlist: _.without(profileName.bucketlist, cardId) } });
  },
  'click .beach-completed'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.beach._id;
    if (!profileName.yourcompletions){
      Profiles.update(profileId, { $push: { yourcompletions: cardId } });
    } else if (_.every(profileName.yourcompletions, function (id) { return id !== cardId; })) {
      Profiles.update(profileId, { $push: { yourcompletions: cardId } });
    }
  },
});

Template.Hike_Cards.events({
  'click .hike-bucket'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.hike._id;
    if (_.every(profileName.bucketlist, function (id) { return id !== cardId; })) {
      Profiles.update(profileId, { $push: { bucketlist: cardId } });
    }
  },
  'click .hike-likes'(event) {
    event.preventDefault();
    const cardId = this.hike._id;
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    if (!_.contains(profileName.yourlikes, cardId)) {
      let initialLikes = Hikes.findOne({ _id: cardId }).likes;
      if (!initialLikes) {
        initialLikes = 0;
      }
      Hikes.update(cardId, { $set: { likes: initialLikes + 1 } });
      Profiles.update(profileId, { $push: { yourlikes: cardId } });
    }
  },
  'click .hike-bucket-remove'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.hike._id;
    Profiles.update(profileId, { $set: { bucketlist: _.without(profileName.bucketlist, cardId) } });
  },
  'click .hike-completed'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.hike._id;
    if (!profileName.yourcompletions) {
      Profiles.update(profileId, { $push: { yourcompletions: cardId } });
    } else if (_.every(profileName.yourcompletions, function (id) { return id !== cardId; })) {
      Profiles.update(profileId, { $push: { yourcompletions: cardId } });
    }
  },
});
Template.Restaurant_Cards.events({
  'click .restaurant-bucket'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.restaurant._id;
    if (_.every(profileName.bucketlist, function (id) { return id !== cardId; })) {
      Profiles.update(profileId, { $push: { bucketlist: cardId } });
    }
  },
  'click .restaurant-likes'(event) {
    event.preventDefault();
    const cardId = this.restaurant._id;
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    if (!_.contains(profileName.yourlikes, cardId)) {
      let initialLikes = Restaurants.findOne({ _id: cardId }).likes;
      if (!initialLikes) {
        initialLikes = 0;
      }
      Restaurants.update(cardId, { $set: { likes: initialLikes + 1 } });
      Profiles.update(profileId, { $push: { yourlikes: cardId } });
    }
  },
  'click .restaurant-bucket-remove'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.restaurant._id;
    Profiles.update(profileId, { $set: { bucketlist: _.without(profileName.bucketlist, cardId) } });
  },
  'click .restaurant-completed'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.restaurant._id;
    if (!profileName.yourcompletions) {
      Profiles.update(profileId, { $push: { yourcompletions: cardId } });
    } else if (_.every(profileName.yourcompletions, function (id) { return id !== cardId; })) {
      Profiles.update(profileId, { $push: { yourcompletions: cardId } });
    }
  },
});
