import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Comments, CommentsSchema } from '/imports/api/comments/CommentsCollection.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';

Template.Beach_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.context = CommentsSchema.namedContext('Beach_Page')
  this.subscribe('Comments');
  this.subscribe('Profiles');

});

Template.Beach_Page.helpers({
  bea: () => Beaches.findOne({ _id: FlowRouter.getParam('_id') }),
  Comments() {
    return Comments.find({ itemid: FlowRouter.getParam('_id') });
  }
  
  profpath() {
    //console.log(Meteor.user().profile.name);
    return Meteor.user().profile.name;
  },
<<<<<<< HEAD


=======
>>>>>>> issue-70
  displayDate() {
    return moment(this.createdAt).format('MM/DD/YYYY, HH:MM');
  },
  inBucketList() {
    const usernameCurrent = Meteor.user().profile.name;
    const bucketlist = Profiles.findOne({ username: usernameCurrent }).bucketlist;
    return _.contains(bucketlist, FlowRouter.getParam('_id'));
  },
});

Template.Beach_Page.events({
  'submit .beach-comment-form'(event, instance) {
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
  'click .beach-bucket'(event, instance) {
    event.preventDefault();
    const usernameCurrent = Meteor.user().profile.name;
    const profileName = Profiles.findOne({ username: usernameCurrent });
    const profileId = profileName._id;
    const itemid = FlowRouter.getParam('_id');
    Profiles.update(profileId, { $push: { bucketlist: itemid } });
  },
});
