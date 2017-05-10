import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Hikes, HikesSchema } from '/imports/api/items/hike/hike-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';
const displaySuccessMessage = 'displaySuccessMessage';
export const locationList = ['Aiea', 'Haleiwa', 'Hawaii Kai', 'Kahala', 'Kailua', 'Kaimuki', 'Kakaako', 'Kalihi', 'Kaneohe', 'Laie', 'Liliha', 'Manoa', 'Makiki', 'Mililani', 'Moanalua', 'Moilili', 'Mokuleia', 'Pearl City', 'Waikiki'];
export const hikeTagList = ['Dangerous','Kid-friendly', 'Dog-friendly', 'Loop', 'Nice Views', 'Point-to-point', 'Ridge', 'Short', 'Waterfall'];
export const difficultyList = ['Stroll', 'Easy', 'Moderate', 'Difficult', 'Extreme'];
export const lengthList = ['0-1 Miles', '1-2 Miles', ' 2-4 Miles', '4-6 Miles', 'More than 6 Miles'];
export const typeList = ['Ridge', 'Valley', 'Paved', 'Peak'];


Template.Create_Hike_Form.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Hikes');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = HikesSchema.namedContext('Create_Hike_Form');
});

Template.Create_Hike_Form.helpers({
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
  hikeTagChoice() {
    return _.map(hikeTagList, function maketagObject(tag) {
      return { label: tag };
    });
  },
  difficultyChoice() {
    return _.map(difficultyList, function maketagObject(tag) {
      return { label: tag };
    });
  },
  lengthChoice() {
    return _.map(lengthList, function maketagObject(tag) {
      return { label: tag };
    });
  },
  typeChoice() {
    return _.map(typeList, function maketagObject(tag) {
      return { label: tag };
    });
  },
});

Template.Create_Hike_Form.events({
  'submit .create-hike-data'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const title = event.target.Title.value;
    const location = event.target.Location.value;
    const about = event.target.About.value;
    const length = event.target.Length.value;
    const difficulty = event.target.Difficulty.value;
    const kind = event.target.Type.value;
    const selectedTags = _.filter(event.target.Tags.selectedOptions, (option) => option.selected);
    const tags = _.map(selectedTags, (option) => option.value);
    tags.push(location, length, difficulty, kind);
    const createdAt = Date.now();
    const picture = event.target.Picture.value;
    const status = 'Pending';
    const newItemData = { title, location, about, length, difficulty, kind, tags, status, picture, createdAt };
    const currentTitle = title;

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    HikesSchema.clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Hikes.insert(newItemData);
      instance.messageFlags.set(displayErrorMessages, false);
      const usernameCurrent = Meteor.user().profile.name;
      const profileId = Profiles.findOne({ username: usernameCurrent })._id;
      const currentHike = Hikes.findOne({ title: currentTitle })._id;
      Profiles.update(profileId, { $push: { youritems: currentHike } });
      instance.messageFlags.set(displaySuccessMessage, true);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Item_Feed_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
      instance.messageFlags.set(displaySuccessMessage, false);
    }
  },
});
