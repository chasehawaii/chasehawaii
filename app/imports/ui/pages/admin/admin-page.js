import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';

Template.Admin_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.subscribe('Hikes');
  this.subscribe('Restaurants');
});


Template.Admin_Page.helpers({

  /**
   * @returns {*} All of the Beach documents.
   */
  beachesList() {
    return Beaches.find();
  },
  /**
   * @returns {*} All of the Hike documents.
   */
  hikesList() {
    return Hikes.find();
  },
  /**
   * @returns {*} All of the Restaurant documents.
   */
  restaurantsList() {
    return Restaurants.find();
  },
});

