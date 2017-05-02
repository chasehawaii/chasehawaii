/**
 * Created by russellomo on 4/27/17.
 */
import { Template } from 'meteor/templating';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';

Template.Restaurant_Row.events({
  'click .approve_restaurant'(event) {
    event.preventDefault();
    const key = event.target.value;
    Restaurants.update(key, { $set: { status: 'Approved' } });
  },
  'click .deny_restaurant'(event) {
    event.preventDefault();
    const key = event.target.value;
    Restaurants.update(key, { $set: { status: 'Denied' } });
  },
});
