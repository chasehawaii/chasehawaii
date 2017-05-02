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

Template.Beach_Row.events({
  'click .approve_beach'(event) {
    event.preventDefault();
    const key = event.target.value;
    Beaches.update(key, { $set: { status: 1 } });
  },
  'click .deny_beach'(event) {
    event.preventDefault();
    const key = event.target.value;
    Beaches.update(key, { $set: { status: 0 } });
  },
  'click .delete_beach'(event) {
    event.preventDefault();
    const key = event.target.value;
    Beaches.remove(key);
  },
});
