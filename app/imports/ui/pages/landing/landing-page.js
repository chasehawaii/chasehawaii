import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';

Template.Landing_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  window.Profiles = Profiles;
});

Template.Landing_Page.helpers({
  /**
   * @returns {String} Returns the user who's logged in
   */
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
  },
  clear: function clear() {
    return Profiles.remove();
  },
});
