import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Hikes, HikesSchema } from '/imports/api/items/hike/hike-item.js';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';


/* eslint-env node, jquery */

const displayErrorMessages = 'displayErrorMessages';
export const locationList = ['Windward', 'Leeward', 'Central Oahu', 'Honoluu', 'North Shore'];
export const hikeTagList = ['Kid-friendly', 'Dog-friendly'];

Template.Edit_Hike_Page.onCreated(function onCreated() {
  this.subscribe('Hikes');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
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
    const hikeData = Hikes.findOne(Session.get('hikeID'));
    return hikeData && hikeData[fieldName];
  },
});

Template.Edit_Hike_Page.events({
  'submit .edit-hike-data'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const title = event.target.Title.value;
    const location = event.target.Location.value;
    const about = event.target.About.value;
    const selectedTags = _.filter(event.target.Tags.selectedOptions, (option) => option.selected);
    const tags = _.map(selectedTags, (option) => option.value);
    tags.push(location);
    const createdAt = Date.now();
    const status = 'Pending';
    const newItemData = { title, location, about, tags, status, createdAt };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    HikesSchema.clean(newItemData);

    // Determine validity.
    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Hikes.update(Session.get('hikeID'), { $set: newItemData });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Item_Feed_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

