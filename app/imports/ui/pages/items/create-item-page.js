import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';



Template.Create_Item_Page.onCreated(function () {
  this.currentTab = new ReactiveVar();
  this.currentTab = new ReactiveVar();
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
    console.log(clickedTab);

    // currentTab.addClass('active');
    // $('.nav').not(currentTab).removeClass( "active" );

    instance.currentTab.set($(clickedTab).attr('data-template'));
  },
});

