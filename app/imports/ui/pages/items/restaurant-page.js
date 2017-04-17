import './restaurant-page.html';
import { Template } from 'meteor/templating';
import { Restaurant } from '/imports/api/items/restaurant/restaurant-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Restaurant_Page.onCreated(function onCreated() {
  this.subscribe('Hike');
});

Template.Restaurant_Page.helpers({
  doc: () => Restaurant.findOne({ _id: FlowRouter.getParam('_id') }),
});
