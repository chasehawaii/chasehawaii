import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { _ } from 'meteor/underscore';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Beaches');
  this.subscribe('Hikes');
  this.subscribe('Restaurants');

});

Template.Profile_Page.helpers({
  username() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile.username;
  },
  image() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile.image;
  },
  about() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile.about;
  },
  first() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile.first;
  },
  last() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile.last;
  },
  standing() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile.standing;
  },
  beaches() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return _.filter(profile.bucketlist, function (id) {return Beaches.findOne({ _id: id });});
  },
  hikes() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return _.filter(profile.bucketlist, function (id) {return Hikes.findOne({ _id: id });});
  },
  restaurants() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return _.filter(profile.bucketlist, function (id) {return Restaurants.findOne({ _id: id });});
  },
});
