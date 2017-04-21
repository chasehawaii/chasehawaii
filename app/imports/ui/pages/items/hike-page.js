import './hike-page.html';
import { Template } from 'meteor/templating';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Hike_Page.onCreated(function onCreated() {
  this.subscribe('Hikes');
});

Template.Hike_Page.helpers({
  hik: () => Hikes.findOne({ _id: FlowRouter.getParam('_id') }),
});
