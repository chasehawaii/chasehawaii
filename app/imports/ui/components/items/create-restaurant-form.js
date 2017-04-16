/*
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Hikes, HikesSchema } from '/imports/api/items/hike/hike-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

/!* eslint-disable no-param-reassign *!/

const displayErrorMessages = 'displayErrorMessages';
export const locationList = ['Windward', 'Leeward', 'Central Oahu', 'Honoluu'];
export const hikeTagList = ['Kid-friendly', 'Dog-friendly'];

Template.Create_Hike_Form.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = HikesSchema.namedContext('Create_Item_Page');
});

Template.Create_Hike_Form.helpers({
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
});

Template.Create_Hike_Form.events({
  'submit .create-item-data'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const title = event.target.Title.value;
    const location = event.target.Location.value;
    const about = event.target.About.value;
    const tags = [];
    _.each(hikeTagList, function setTags(tag) {
      if (event.target[tag].checked) {
        tags.push(event.target[tag].value);
      }
    });

    const newItemData = { title, location, about, tags };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    HikesSchema.clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Hikes.insert(newItemData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Item_Feed_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});*/
