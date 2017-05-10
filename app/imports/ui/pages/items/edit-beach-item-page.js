import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Beaches, BeachesSchema } from '/imports/api/items/beach/beach-item.js';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';

/* eslint-env node, jquery */
/* eslint max-len: ["error", 150] */

const displayErrorMessages = 'displayErrorMessages';
export const locationList = [
  'Aiea', 'Haleiwa', 'Hawaii Kai', 'Kahala', 'Kailua', 'Kaimuki', 'Kakaako', 'Kalihi', 'Kaneohe', 'Laie', 'Liliha', 'Manoa', 'Makiki',
  'Mililani', 'Moanalua', 'Moilili', 'Pearl City', 'Waikiki',
];
export const beachTagList = ['Busy', 'Dog-friendly', 'Good waves', 'Kid-friendly', 'No Lifeguard', 'No waves', 'Private Access', 'Secluded'];


Template.Edit_Beach_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.currentId = new ReactiveDict();
  this.context = BeachesSchema.namedContext('Create_Beach_Form');
});

Template.Edit_Beach_Page.helpers({
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
  editBeachField(fieldName) {
    const beachData = Beaches.findOne(FlowRouter.getParam('_id'));
    Template.instance().currentId.set('current', beachData);
    return beachData && beachData[fieldName];
  },
});

Template.Edit_Beach_Page.events({
  'submit .edit-beach-data'(event, instance) {
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

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    BeachesSchema.clean(newItemData);

    // Determine validity.
    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Beaches.update(instance.currentId.get('current')._id, { $set: newItemData });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Item_Feed_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

