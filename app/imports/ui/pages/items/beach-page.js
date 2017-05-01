import './beach-page.html';
import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Comments, CommentsSchema } from '/imports/api/comments/CommentsCollection.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Beach_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
});

Template.Beach_Page.helpers({
  bea: () => Beaches.findOne({ _id: FlowRouter.getParam('_id') }),

  CommentsList() {
    return Comments.find();
  },

});

Template.Beach_Page.events({
  'submit .beach-comment-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const username = Meteor.user().profile.name;
    const content = event.target.Content.value;
    const newItemData = { username, content };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    CommentsSchema.clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);

    Comments.insert(newItemData);
    instance.messageFlags.set(displayErrorMessages, false);
    FlowRouter.reload();

  },
});
