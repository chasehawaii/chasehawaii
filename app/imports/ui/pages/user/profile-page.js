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
  yourlikes() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });

    let beaches = _.filter(profile.yourlikes, function items(item) { return Beaches.findOne({ _id: item }); });
    beaches = _.map(beaches, items => Beaches.findOne({ _id: items }));

    let hikes = _.filter(profile.yourlikes, function items(item) { return Hikes.findOne({ _id: item }); });
    hikes = _.map(hikes, items => Hikes.findOne({ _id: items }));

    let restaurants = _.filter(profile.yourlikes, function items(item) { return Restaurants.findOne({ _id: item }); });
    restaurants = _.map(restaurants, items => Restaurants.findOne({ _id: items }));

    const items = _.union(beaches, hikes, restaurants);
    return items;
  },
  yourcompletions() {
    const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: currUser });

    let beaches = _.filter(profile.yourcompletions, function items(item) { return Beaches.findOne({ _id: item }); });
    beaches = _.map(beaches, items => Beaches.findOne({ _id: items }));

    let hikes = _.filter(profile.yourcompletions, function items(item) { return Hikes.findOne({ _id: item }); });
    hikes = _.map(hikes, items => Hikes.findOne({ _id: items }));

    let restaurants = _.filter(profile.yourcompletions, function items(item) { return Restaurants.findOne({ _id: item }); });
    restaurants = _.map(restaurants, items => Restaurants.findOne({ _id: items }));

    const items = _.union(beaches, hikes, restaurants);
    return items;
  },
});

Template.Profile_Page.events({
  'click .edit_profile'(event) {
    event.preventDefault();
    const id = event.target.value;
    FlowRouter.go(`/edit-profile/${id}`);
  },
});
