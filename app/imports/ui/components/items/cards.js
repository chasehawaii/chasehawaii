import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';
import { Meteor } from 'meteor/meteor';
//import moment from 'meteor/moment.js';

/* eslint-env node, jquery */


Template.Beach_Cards.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.subscribe('Profiles');
});
Template.Hike_Cards.onCreated(function onCreated() {
  this.subscribe('Hikes');
  this.subscribe('Profiles');
});
Template.Restaurant_Cards.onCreated(function onCreated() {
  this.subscribe('Hikes');
  this.subscribe('Profiles');
});

Template.Beach_Cards.helpers({
  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY, HH:MM');
  },
});
Template.Hike_Cards.helpers({
  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY, HH:MM');
  },
});
Template.Restaurant_Cards.helpers({
  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY, HH:MM');
  },
});

Template.Beach_Cards.events({
  'click .beach-bucket'(event) {
    event.preventDefault();
    const clickedCard = event.target.closest('div');
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = $(clickedCard).attr('data-id');
    Profiles.update(profileId, { $push: { bucketlist: cardId } });
  },
  'click .beach-likes'(event) {
    event.preventDefault();
    const clickedCard = event.target.closest('div');
    const cardId = $(clickedCard).attr('data-id');
    let initialLikes = Beaches.findOne({ _id: cardId }).likes;
    if (!initialLikes) {
      initialLikes = 0;
    }
    Beaches.update(cardId, { $set: { likes: initialLikes + 1 } });
  },
});

Template.Hike_Cards.events({
  'click .hike-bucket'(event) {
    event.preventDefault();
    const clickedCard = event.target.closest('div');
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = $(clickedCard).attr('data-id');
    Profiles.update(profileId, { $push: { bucketlist: cardId } });
  },
  'click .hike-likes'(event) {
    event.preventDefault();
    const clickedCard = event.target.closest('div');
    const cardId = $(clickedCard).attr('data-id');
    let initialLikes = Hikes.findOne({ _id: cardId }).likes;
    if (!initialLikes) {
      initialLikes = 0;
    }
    Hikes.update(cardId, { $set: { likes: initialLikes + 1 } });
  },
});
Template.Restaurant_Cards.events({
  'click .restaurant-bucket'(event) {
    event.preventDefault();
    const clickedCard = event.target.closest('div');
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const cardId = $(clickedCard).attr('data-id');
    Profiles.update(profileId, { $push: { bucketlist: cardId } });
  },
  'click .restaurant-likes'(event) {
    event.preventDefault();
    const clickedCard = event.target.closest('div');
    const cardId = $(clickedCard).attr('data-id');
    let initialLikes = Restaurants.findOne({ _id: cardId }).likes;
    if (!initialLikes) {
      initialLikes = 0;
    }
    Restaurants.update(cardId, { $set: { likes: initialLikes + 1 } });
  },
});
