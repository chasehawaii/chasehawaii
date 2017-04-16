import { Template } from 'meteor/templating';

Template.Add_Restaurant_Page.onCreated(function onCreated() {
  this.subscribe('Restaurant');
});
