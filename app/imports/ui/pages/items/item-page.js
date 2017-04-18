/* import './item-page.html';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Beaches } from '../../../api/items/beach/beach-item.js';
import { Hikes } from '../../../api/items/hike/hike-item.js';
import { Restaurants } from '../../../api/items/restaurant/restaurant-item.js';

Template.Item_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.subscribe('Hikes');
  this.subscribe('Restaurants');
});

Template.Item_Page.helpers({
  doc: () =>  Beaches.findOne({_id: FlowRouter.getParam('_id') }) || Hikes.findOne({_id: FlowRouter.getParam('_id') }) || Restaurants.findOne({_id: FlowRouter.getParam('_id') }),
});


*/
