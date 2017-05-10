import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Beaches, BeachesSchema } from '/imports/api/items/beach/beach-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';
const displaySuccessMessage = 'displaySuccessMessage';
export const locationList = ['Aiea', 'Haleiwa', 'Hawaii Kai', 'Kahala', 'Kailua', 'Kaimuki', 'Kakaako', 'Kalihi', 'Kaneohe', 'Laie', 'Liliha', 'Manoa', 'Makiki', 'Mililani', 'Moanalua', 'Moilili', 'Pearl City', 'Waikiki'];
export const beachTagList = ['Busy', 'Dog-friendly', 'Good waves', 'Kid-friendly', 'No Lifeguard', 'No waves' , 'Private Access', 'Secluded'];

Template.Create_Beach_Form.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Beaches');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = BeachesSchema.namedContext('Create_Beach_Form');
});

Template.Create_Beach_Form.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  locationChoice() {
    return _.map(locationList, function makeLocationObject(location) {
      return { label: location };
    });
  },
  beachTagChoice() {
    return _.map(beachTagList, function maketagObject(tag) {
      return { label: tag };
    });
  },
});

Template.Create_Beach_Form.events({
  'submit .create-beach-data'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const title = event.target.Title.value;
    const location = event.target.Location.value;
    const about = event.target.About.value;
    const selectedTags = _.filter(event.target.Tags.selectedOptions, (option) => option.selected);
    const tags = _.map(selectedTags, (option) => option.value);
    tags.push(location);
    const createdAt = Date.now();
    const picture = event.target.Picture.value;
    const status = 'Pending';
    const newItemData = { title, location, about, tags, status, picture, createdAt };
    const currentTitle = title;
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    BeachesSchema.clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Beaches.insert(newItemData);
      instance.messageFlags.set(displayErrorMessages, false);
      const usernameCurrent = Meteor.user().profile.name;
      const profileId = Profiles.findOne({ username: usernameCurrent })._id;
      const currentBeach = Beaches.findOne({ title: currentTitle })._id;
      Profiles.update(profileId, { $push: { youritems: currentBeach } });
      instance.messageFlags.set(displaySuccessMessage, true);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Item_Feed_Page');
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
