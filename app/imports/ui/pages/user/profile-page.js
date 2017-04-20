import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
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
});
