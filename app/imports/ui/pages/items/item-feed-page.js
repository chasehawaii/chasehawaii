import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';

Template.Item_Feed_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  console.log(Beaches);
});

Template.Item_Feed_Page.helpers({
  beaches() {
    return Beaches.find();
  },
});

Beaches.define({
  title: 'Lanikai Beach',
  category: 'Beach',
  location: 'Windward',
  status: 'approved',
  about: 'blurb',
  tags: 'no surf',
});