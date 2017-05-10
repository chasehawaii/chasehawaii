import { Template } from 'meteor/templating';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Comments, CommentsSchema } from '/imports/api/comments/CommentsCollection.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';


Template.Hike_Page.onCreated(function onCreated() {
  this.subscribe('Hikes');
  this.subscribe('Profiles');
  this.subscribe('Comments');
  this.context = CommentsSchema.namedContext('Hike_Page')


});

Template.Hike_Page.helpers({
  hik: () => Hikes.findOne({ _id: FlowRouter.getParam('_id') }),

  Comments() {
    return Comments.find( {itemid: FlowRouter.getParam('_id')} );
  },
  profpath() {
    //console.log(Meteor.user().profile.name);
    return Meteor.user().profile.name;
  },

  profimage(){
    const user = Meteor.user().profile.name;
    const profile = Profiles.findOne({ username: user });
    if(profile.image){
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
  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY, HH:MM');
  },
});

Template.Hike_Page.events({
  'submit .hike-comment-form'(event, instance) {
    event.preventDefault();
    const username = Meteor.user().profile.name;
    const about = event.target.about.value;
    const itemid = FlowRouter.getParam('_id');
    const newItemData = { username, about, itemid };
    instance.context.validate(newItemData);
    Comments.insert(newItemData);
    event.target.reset();
  },
  'click .hike-bucket'(event, instance) {
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
