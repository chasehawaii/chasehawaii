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
  userID() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile._id;
  },
  username() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile && profile.username;
  },
  image() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile && profile.image;
  },
  about() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile && profile.about;
  },
  first() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile && profile.first;
  },
  last() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile && profile.last;
  },
  standing() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile && profile.standing;
  },
  beaches() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    const filteredBeaches =  _.filter(profile.bucketlist, function beaches(id) {
      return Beaches.findOne({ _id: id });
    });
    return _.map(filteredBeaches, function beaches(beach) { return Beaches.findOne({ _id: beach }); });
  },
  ifFacebook() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return (profile && profile.facebook);
  },
  facebook() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile.facebook;
  },
  ifTwitter() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return (profile && profile.twitter);
  },
  twitter() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile.twitter;
  },
  ifInstagram() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return (profile && profile.instagram);
  },
  instagram() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    return profile.instagram;
  },
  userbeach() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    const filteredBeaches =  _.filter(profile.youritems, function beaches(id) {
      return Beaches.findOne({ _id: id });
    });
    return _.map(filteredBeaches, function beaches(beach) { return Beaches.findOne({ _id: beach }); });
  },
  hikes() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    const filteredHike = _.filter(profile.bucketlist, function hikes(id) {
      return Hikes.findOne({ _id: id });
    });
    return _.map(filteredHike, function hikes(hike) { return Hikes.findOne({ _id: hike }); });
  },
  userhike() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    const filteredHikes =  _.filter(profile.youritems, function hikes(id) {
      return Hikes.findOne({ _id: id });
    });
    return _.map(filteredHikes, function hikes(hike) { return Hikes.findOne({ _id: hike }); });
  },
  restaurants() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    const filteredRestaurants = _.filter(profile.bucketlist, function restaurants(id) {
      return Restaurants.findOne({ _id: id });
    });
    return _.map(filteredRestaurants, function restaurants(restaurant) { return Restaurants.findOne({ _id: restaurant }); });
  },
  userrestaurant() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });
    const filteredRestaurant =  _.filter(profile.youritems, function restaurant(id) {
      return Restaurants.findOne({ _id: id });
    });
    return _.map(filteredRestaurant, function restaurants(restaurant) { return Restaurants.findOne({ _id: restaurant }); });
  },
});

Template.Profile_Page.events({
  'click .edit_profile'(event) {
    event.preventDefault();
    const username = event.target.value;
    FlowRouter.go(`/${username}/edit-profile`);
  },
});
