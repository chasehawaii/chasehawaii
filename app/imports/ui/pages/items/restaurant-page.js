import './restaurant-page.js';
import { Template } from 'meteor/templating';
import { Restaurants } from '/imports/api/items/beach/beach-item.js';
import { Comments, CommentsSchema } from '/imports/api/comments/CommentsCollection.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';

Template.Restaurant_Page.onCreated(function onCreated() {
  this.subscribe('Restaurant');
  this.context = CommentsSchema.namedContext('Restaurant_Page')
  this.subscribe('Comments');
});

Template.Restaurant_Page.helpers({
  rest: () => Restaurants.findOne({ _id: FlowRouter.getParam('_id') }),

  Comments() {
    return Comments.find();
  },

});

Template.Restaurant_Page.events({
  'submit .restaurant-comment-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)vali
    const username = Meteor.user().profile.name;
    const about = event.target.about.value;
    const newItemData = { username, about };


    console.log(username);
    console.log(about);

    // Clear out any old validation errors.
    // instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    // CommentsSchema.clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);
    //if (instance.context.isValid()) {
    Comments.insert(newItemData);
    //Comments.update(Session.get(''), { $set: newItemData });
    //  instance.messageFlags.set(displayErrorMessages, false);
    // FlowRouter.reload();
    //  } else {
    //   instance.messageFlags.set(displayErrorMessages, true);
    //}
  },
});
