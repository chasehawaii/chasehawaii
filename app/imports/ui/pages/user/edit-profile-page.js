import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Profiles, ProfilesSchema } from '/imports/api/profiles/ProfileCollection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

const displayErrorMessages = 'displayErrorMessages';
export const standingList = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Post-Graduate'];

Template.Edit_Profile_Page.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ProfilesSchema.namedContext('Edit_Profile_Page');
});

Template.Edit_Profile_Page.helpers({
  profileDataField(fieldName) {
    const profileData = Profiles.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return profileData && profileData[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  standingChoice() {
    return _.map(standingList, function makeLocationObject(standing) {
      return { label: standing };
    });
  },
});

Template.Edit_Profile_Page.events({
  'submit .edit-profile-data'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const username = Meteor.user().profile.name;
    const first = event.target.First.value;
    const last = event.target.Last.value;
    const standing = event.target.Standing.value;
    const image = event.target.Image.value;
    const facebook = event.target.Facebook.value;
    const instagram = event.target.Instagram.value;
    const twitter = event.target.Twitter.value;
    const about = event.target.About.value;

    const updatedProfileData = { username, first, last, standing, image, facebook, instagram, twitter, about };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    ProfilesSchema.clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(updatedProfileData);
    if (instance.context.isValid()) {
      Profiles.update(FlowRouter.getParam('_id'), { $set: updatedProfileData });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go(`/${username}/profile`);
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
