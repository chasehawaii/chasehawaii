import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';



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
});

Template.Beach_Cards.events({
  'click .beach-bucket'(event, instance) {
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
    let initialLikes = Beaches.findOne({ _id: cardId }).likes;
    if (!initialLikes) {
      initialLikes = 0;
    }
    Beaches.update(cardId, { $set: { likes: initialLikes + 1 } });
  },
  'click .beach-bucket-remove'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.beach._id;
    Profiles.update(profileId, { $set: { bucketlist: _.without(profileName.bucketlist, cardId) } });
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
    let initialLikes = Hikes.findOne({ _id: cardId }).likes;
    if (!initialLikes) {
      initialLikes = 0;
    }
    Hikes.update(cardId, { $set: { likes: initialLikes + 1 } });
  },
  'click .hike-bucket-remove'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.hike._id;
    Profiles.update(profileId, { $set: { bucketlist: _.without(profileName.bucketlist, cardId) } });
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
    let initialLikes = Restaurants.findOne({ _id: cardId }).likes;
    if (!initialLikes) {
      initialLikes = 0;
    }
    Restaurants.update(cardId, { $set: { likes: initialLikes + 1 } });
  },
  'click .restaurant-bucket-remove'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = this.restaurant._id;
    Profiles.update(profileId, { $set: { bucketlist: _.without(profileName.bucketlist, cardId) } });
  },
});
