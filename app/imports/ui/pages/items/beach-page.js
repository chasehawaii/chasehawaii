import './beach-page.html';
import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Beach_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
});

Template.Beach_Page.helpers({
  bea: () => Beaches.findOne({ _id: FlowRouter.getParam('_id') }),


});

Template.Beach_Page.events({
  'submit .beach-comment-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const username = Meteor.user().profile.name;
    const content = event.target.Content.value;

    const newItemData = { username,  content };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    ProfilesSchema.clean(newItemData);
    // Determine validity.
    instance.context.validate(newItemData);
    if (instance.context.isValid()) {
      Profiles.insert(newItemData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go(`/${username}/profile`);
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
