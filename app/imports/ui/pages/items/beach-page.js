import './beach-page.html';
import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Beach_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
});

Template.Item_Page.helpers({
  doc: () => Beaches.findOne({ _id: FlowRouter.getParam('_id') }),
});
