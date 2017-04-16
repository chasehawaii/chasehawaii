import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';



Template.Create_Item_Page.onCreated(function () {
  this.currentTab = new ReactiveVar('Create_Beach_Form');
  this.currentTab = new ReactiveVar('Create_Hike_Form');
  this.currentTab = new ReactiveVar('Create_Restaurant_Form');
});

Template.Create_Item_Page.helpers({
  tab() {
    return Template.instance().currentTab.get();
  },
});

Template.Create_Item_Page.events({
  'click .nav'(event, instance) {
    const clickedTab = event.target.closest('button');
    console.log(clickedTab);

    // currentTab.addClass('active');
    // $('.nav').not(currentTab).removeClass( "active" );

    instance.currentTab.set($(clickedTab).attr('data-template'));
  },
});

/*
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Beaches, BeachesSchema } from '/imports/api/items/beach/beach-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

/!* eslint-disable no-param-reassign *!/

const displayErrorMessages = 'displayErrorMessages';
export const locationList = ['Windward', 'Leeward', 'Central Oahu', 'Honoluu'];
export const beachTagList = ['Busy', 'Secluded', 'Kid-friendly', 'Dog-friendly', 'Good waves', 'No waves'];

Template.Create_Item_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = BeachesSchema.namedContext('Create_Item_Page');
});

Template.Create_Item_Page.helpers({
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
  beachTagChoice() {
    return _.map(beachTagList, function maketagObject(tag) {
      return { label: tag };
    });
  },
});

Template.Create_Item_Page.events({
  'submit .create-item-data'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const title = event.target.Title.value;
    const location = event.target.Location.value;
    const about = event.target.About.value;
    const tags = [];
    _.each(beachTagList, function setTags(tag) {
      if (event.target[tag].checked) {
        tags.push(event.target[tag].value);
      }
    });

    const newItemData = { title, location, about, tags };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    BeachesSchema.clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Beaches.insert(newItemData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Item_Feed_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
*/
