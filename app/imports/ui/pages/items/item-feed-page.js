import { Template } from 'meteor/templating';
import { Restaurant } from '../../../api/restaurant/restaurant.js';

Template.Item_Feed_Page.helpers({

  /**
   * @returns {*} All of the Item documents.
   */
  restaurantsList() {
    return Restaurant.find();
  },
});

Template.Item_Feed_Page.onCreated(function onCreated() {
  this.subscribe('Restaurant');
});
