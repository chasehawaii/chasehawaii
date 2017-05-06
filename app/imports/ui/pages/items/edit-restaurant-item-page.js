import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Restaurants, RestaurantsSchema } from '/imports/api/items/restaurant/restaurant-item.js';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';


/* eslint-env node, jquery */

const displayErrorMessages = 'displayErrorMessages';
export const locationList = ['Windward', 'Leeward', 'Central Oahu', 'Honoluu', 'North Shore'];
export const restaurantTagList = ['Kid-friendly', 'Dog-friendly', 'Busy', 'Quiet'];
export const foodTypeList = ['Chinese', 'Thai', 'Italian', 'Mexican', 'Local', 'Burgers', 'Japanese Grill', 'Sushi'];

Template.Edit_Restaurant_Page.onCreated(function onCreated() {
  this.subscribe('Restaurants');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.currentId = new ReactiveDict();
  this.context = RestaurantsSchema.namedContext('Create_Restaurant_Form');
});

Template.Edit_Restaurant_Page.helpers({
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
  editRestaurantField(fieldName) {
    const restaurantData = Restaurants.findOne(FlowRouter.getParam('_id'));
    Template.instance().currentId.set('current', restaurantData);
    return restaurantData && restaurantData[fieldName];
  },
});

Template.Edit_Restaurant_Page.events({
  'submit .edit-restaurant-data'(event, instance) {
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
    const picture = event.target.Picture.value;
    const status = 'Pending';
    const newItemData = { title, location, about, tags, status, picture, createdAt };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    RestaurantsSchema.clean(newItemData);

    // Determine validity.
    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Restaurants.update(instance.currentId.get('current')._id, { $set: newItemData });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Item_Feed_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

