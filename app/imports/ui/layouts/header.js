import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles, ProfilesSchema } from '/imports/api/profiles/ProfileCollection.js';

Template.Header.onCreated(function onCreated() {
  this.subscribe('Profiles');
});


// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.

Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();
});

Template.Header.helpers({

  profpath() {
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

});

Template.Header.events({


});