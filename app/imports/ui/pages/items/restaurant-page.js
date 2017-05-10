import './restaurant-page.html';
import { Template } from 'meteor/templating';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { Comments, CommentsSchema } from '/imports/api/comments/CommentsCollection.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';

/* eslint-env node, jquery */

/* eslint no-dupe-keys: 3 */

Template.Restaurant_Page.onCreated(function onCreated() {
  this.subscribe('Restaurants');
  this.context = CommentsSchema.namedContext('Restaurant_Page')
  this.subscribe('Comments');
  this.subscribe('Profiles');
});

Template.Restaurant_Page.helpers({
  rest: () => Restaurants.findOne({ _id: FlowRouter.getParam('_id') }),

  Comments() {
    return Comments.find({ itemid: FlowRouter.getParam('_id') });
  },
  profpath() {
    return Meteor.user().profile.name;
  },
  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY, HH:MM');
  },
  inBucketList() {
    const usernameCurrent = Meteor.user().profile.name;
    const bucketlist = Profiles.findOne({ username: usernameCurrent }).bucketlist;
    return _.contains(bucketlist, FlowRouter.getParam('_id'));
  },

  profimage() {
    const user = Meteor.user().profile.name;
    const profile = Profiles.findOne({ username: user });
    if (profile.image){
      //  console.log('true');
      //  console.log(profile.image);
      return true;
    }
    return false;
  },

  image() {
    const user = Meteor.user().profile.name;
    // const currUser = FlowRouter.getParam('username');
    const profile = Profiles.findOne({ username: user });
    console.log(profile.image);
    return profile.image;
  },
  inBucketList() {
    const usernameCurrent = Meteor.user().profile.name;
    const bucketlist = Profiles.findOne({ username: usernameCurrent }).bucketlist;
    return _.contains(bucketlist, FlowRouter.getParam('_id'));
  },

});

Template.Restaurant_Page.events({
  'submit .restaurant-comment-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const username = Meteor.user().profile.name;
    const about = event.target.about.value;
    const itemid = FlowRouter.getParam('_id');
    const newItemData = { username, about, itemid };
    instance.context.validate(newItemData);
    Comments.insert(newItemData);
    event.target.reset();
  },
  'click .restaurant-bucket'(event) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const itemid = FlowRouter.getParam('_id');
    Profiles.update(profileId, { $push: { bucketlist: itemid } });
  },
  'click .user-profile'(event) {
    const clickedUser = event.target.closest('a');
    const clickedUserName = $(clickedUser).attr('data-id');
    FlowRouter.go('Profile_Page', { username: clickedUserName });
  },
});
