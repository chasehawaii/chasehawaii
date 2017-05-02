import { Template } from 'meteor/templating';
import { Hikes } from '/imports/api/items/hike/hike-item.js';

Template.Hike_Row.events({
  'click .approve_hike'(event) {
    event.preventDefault();
    const key = event.target.value;
    Hikes.update(key, { $set: { status: 'Approved' } });
  },
  'click .deny_hike'(event) {
    event.preventDefault();
    const key = event.target.value;
    Hikes.update(key, { $set: { status: 'Denied' } });
  },
});
