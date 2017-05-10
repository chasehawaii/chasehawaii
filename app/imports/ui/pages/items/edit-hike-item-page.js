import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Hikes, HikesSchema } from '/imports/api/items/hike/hike-item.js';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';

/* eslint-env node, jquery */

const displayErrorMessages = 'displayErrorMessages';
export const locationList = ['Aiea', 'Haleiwa', 'Hawaii Kai', 'Kahala', 'Kailua', 'Kaimuki', 'Kakaako', 'Kalihi', 'Kaneohe', 'Laie', 'Liliha', 'Manoa', 'Makiki', 'Mililani', 'Moanalua', 'Moilili', 'Mokuleia', 'Pearl City', 'Waikiki'];
export const hikeTagList = ['Dangerous','Kid-friendly', 'Dog-friendly', 'Loop', 'Nice Views', 'Point-to-point', 'Ridge', 'Short', 'Waterfall'];
export const difficultyList = ['Stroll', 'Easy', 'Moderate', 'Difficult', 'Extreme'];
export const lengthList = ['0-1 Miles', '1-2 Miles', ' 2-4 Miles', '4-6 Miles', 'More than 6 Miles'];
export const typeList = ['Ridge', 'Valley', 'Paved', 'Peak'];

Template.Edit_Hike_Page.onCreated(function onCreated() {
  this.subscribe('Hikes');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.currentId = new ReactiveDict();
  this.context = HikesSchema.namedContext('Create_Hike_Form');
});

Template.Edit_Hike_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
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
  editHikeField(fieldName) {
    const hikeData = Hikes.findOne(FlowRouter.getParam('_id'));
    Template.instance().currentId.set('current', hikeData);
    return hikeData && hikeData[fieldName];
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

Template.Edit_Hike_Page.events({
  'submit .edit-hike-data'(event, instance) {
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

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    HikesSchema.clean(newItemData);

    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Hikes.update(instance.currentId.get('current')._id, { $set: newItemData });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Item_Feed_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

