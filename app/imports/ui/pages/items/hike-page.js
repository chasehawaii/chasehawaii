import './hike-page.html';
import { Template } from 'meteor/templating';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Hike_Page.onCreated(function onCreated() {
  this.subscribe('Hike');
});

Template.Hike_Page.helpers({
  doc: () => Hikes.findOne({ _id: FlowRouter.getParam('_id') }),
});
