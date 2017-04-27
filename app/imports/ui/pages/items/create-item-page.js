import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/* eslint-env node, jquery */

Template.Create_Item_Page.onCreated(function onCreated() {
  this.currentTab = new ReactiveVar();
});

Template.Create_Item_Page.helpers({
  tab() {
    return Template.instance().currentTab.get();
  },
});

Template.Create_Item_Page.events({
  'click .nav'(event, instance) {
    event.preventDefault();
    const clickedTab = event.target.closest('button');
    instance.currentTab.set($(clickedTab).attr('data-template'));
  },
});

