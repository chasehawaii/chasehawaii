import { Restaurant } from '../../api/restaurant/restaurant.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Restaurant', function publishRestaurantData() {
  return Restaurant.find();
});
