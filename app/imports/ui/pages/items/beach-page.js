import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Comments, CommentsSchema } from '/imports/api/comments/CommentsCollection.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';

Template.Beach_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.context = CommentsSchema.namedContext('Beach_Page');
  this.subscribe('Comments');
  this.subscribe('Profiles');

});

Template.Beach_Page.helpers({
  bea: () => Beaches.findOne({ _id: FlowRouter.getParam('_id') }),
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
    if (profile.image) {
      return true;
    }
    return false;
  },
  image() {
    const user = Meteor.user().profile.name;
    const profile = Profiles.findOne({ username: user });
    console.log(profile.image);
    return profile.image;
  },
});

Template.Beach_Page.events({
  'submit .beach-comment-form'(event, instance) {
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
  'click .beach-bucket'(event) {
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
