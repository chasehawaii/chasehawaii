import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Meteor } from 'meteor/meteor';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';

Meteor.publish('Beaches', function publishContacts() {
  return Beaches.find();
});
Meteor.publish('Hikes', function publishContacts() {
  return Hikes.find();
});
Meteor.publish('Restaurants', function publishContacts() {
  return Restaurants.find();
});