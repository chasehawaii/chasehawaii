import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';

Template.Item_Feed_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.subscribe('Hikes');
  this.subscribe('Restaurants');
});

Template.Item_Feed_Page.helpers({
  beaches() {
    return Beaches.find();
  },
  hikes() {
    return Hikes.find();
  },
  restaurants() {
    return Restaurants.find();
  },
});

