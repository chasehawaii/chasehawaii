import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';


Template.Filter.onCreated(function onCreated() {
  Session.set('categoryFilter', 'empty');

});

Template.Filter.onRendered(function onRendered() {
  this.$('div.dropdown').dropdown();
});

Template.Filter.events({
  'click .category-filter'(event, instance) {
    const clickedFilter = event.target.closest('div');
    Session.set('categoryFilter', $(clickedFilter).attr('data-value'));
    console.log(Session.get('categoryFilter'));
  },
});
