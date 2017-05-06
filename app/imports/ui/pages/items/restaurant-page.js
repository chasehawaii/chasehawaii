import './restaurant-page.html';
import { Template } from 'meteor/templating';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { Comments, CommentsSchema } from '/imports/api/comments/CommentsCollection.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';

Template.Restaurant_Page.onCreated(function onCreated() {
  this.subscribe('Restaurants');
  this.context = CommentsSchema.namedContext('Restaurant_Page')
  this.subscribe('Comments');

});

Template.Restaurant_Page.helpers({
  rest: () => Restaurants.findOne({ _id: FlowRouter.getParam('_id') }),

  Comments() {
    return Comments.find({ itemid: FlowRouter.getParam('_id') });
  },

  profpath() {
    //console.log(Meteor.user().profile.name);
    return Meteor.user().profile.name;
  },

  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY, HH:MM');
  },

});

Template.Restaurant_Page.events({
  'submit .restaurant-comment-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const username = Meteor.user().profile.name;
    const about = event.target.about.value;
    const itemid = FlowRouter.getParam('_id');
    const newItemData = { username, about, itemid };

    console.log(username);
    console.log(about);
    console.log(itemid);

    // Clear out any old validation errors.
    // instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    // CommentsSchema.clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);
    //if (instance.context.isValid()) {
    Comments.insert(newItemData);
    event.target.reset();
    // template.find("form").reset();
    //Comments.update(Session.get(''), { $set: newItemData });
    //  instance.messageFlags.set(displayErrorMessages, false);
    // FlowRouter.reload();
    //  } else {
    //   instance.messageFlags.set(displayErrorMessages, true);
    //}
  },
});
