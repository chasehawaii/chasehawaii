import { Template } from 'meteor/templating';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { Beaches } from '/imports/api/items/beach/beach-item.js';


Template.Beach_User_Cards.helpers({
  status() {
    return this.beach.status === 'Approved';
  },
});

Template.Hike_User_Cards.helpers({
  status() {
    return this.hike.status === 'Approved';
  },
});

Template.Restaurant_User_Cards.helpers({
  status() {
    return this.restaurant.status === 'Approved';
  },
});

Template.Beach_User_Cards.events({
  'click .beach-delete'(event) {
    event.preventDefault();
    Beaches.update(this.beach._id, { $set: { deleteRequest: true } });
  },
});

Template.Hike_User_Cards.events({
  'click .hike-delete'(event) {
    event.preventDefault();
    Hikes.update(this.hike._id, { $set: { deleteRequest: true } });
  },
});

Template.Restaurant_User_Cards.events({
  'click .restaurant-delete'(event) {
    event.preventDefault();
    Restaurants.update(this.restaurant._id, { $set: { deleteRequest: true } });
    console.log(this);
  },
});