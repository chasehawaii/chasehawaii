import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Restaurants, RestaurantsSchema } from '/imports/api/items/restaurant/restaurant-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';
import { Meteor } from 'meteor/meteor';


Template.Beach_User_Cards.events({
  'click .beach-edit'(event) {
    event.preventDefault();
    FlowRouter.go('Edit_Beach_Page');
  },
});

Template.Hike_User_Cards.events({
  'click .hike-edit'(event, instance) {
    FlowRouter.go('Edit_Hike_Page');
  },
});

Template.Restaurant_User_Cards.events({
  'click .restaurant-edit'(event, instance) {
    FlowRouter.go('Edit_Restaurant_Page');
  },
});
