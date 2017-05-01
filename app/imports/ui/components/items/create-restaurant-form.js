import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Restaurants, RestaurantsSchema } from '/imports/api/items/restaurant/restaurant-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';
export const locationList = ['Windward', 'Leeward', 'Central Oahu', 'Honoluu', 'North Shore'];
export const restaurantTagList = ['Kid-friendly', 'Dog-friendly', 'Busy', 'Quiet'];
export const foodTypeList = ['Chinese', 'Thai', 'Italian', 'Mexican', 'Local', 'Burgers', 'Japanese Grill', 'Sushi'];

Template.Create_Restaurant_Form.onCreated(function onCreated() {
  this.subscribe('Profiles');
  this.subscribe('Restaurants');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = RestaurantsSchema.namedContext('Create_Item_Page');
});

Template.Create_Restaurant_Form.helpers({
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
  foodTypeChoice() {
    return _.map(foodTypeList, function makeFoodObject(choice) {
      return { label: choice };
    });
  },
  restaurantTagChoice() {
    return _.map(restaurantTagList, function maketagObject(tag) {
      return { label: tag };
    });
  },
});

Template.Create_Restaurant_Form.events({
  'submit .create-restaurant-data'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const title = event.target.Title.value;
    const location = event.target.Location.value;
    const about = event.target.About.value;
    const food = event.target.Food.value;
    const selectedTags = _.filter(event.target.Tags.selectedOptions, (option) => option.selected);
    const tags = _.map(selectedTags, (option) => option.value);
    tags.push(location, food);
    const createdAt = Date.now();
    const status = 'Pending';
    const newItemData = { title, location, about, tags, status, createdAt };
    const currentTitle = title;


    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    RestaurantsSchema.clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Restaurants.insert(newItemData);
      instance.messageFlags.set(displayErrorMessages, false);
      const usernameCurrent = Meteor.user().profile.name;
      const profileId = Profiles.findOne({ username: usernameCurrent })._id;
      const currentRestaurant = Restaurants.findOne({ title: currentTitle })._id;
      Profiles.update(profileId, { $push: { youritems: currentRestaurant } });
      FlowRouter.go('Item_Feed_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
