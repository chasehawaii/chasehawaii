import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';

Template.Beach_Row.onCreated(function onCreated() {

});

Template.Beach_Row.helpers({

  /**
   * @returns {*} All of the Beach documents.

  beachesList() {
    return Beaches.find();
  },
  */
});
