import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Beaches', function publishContacts() {
  return Beaches.find();
});