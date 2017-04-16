import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profiles/ProfileCollection.js';


Template.Profile_Page.helpers({
  username() {
    const profile = Profiles.findOne({ username: 'rao642' });
    return profile.username;
  },
  image() {
    const profile = Profiles.findOne({ username: 'rao642' });

    return profile.image;
  },
  about() {
    const profile = Profiles.findOne({ username: 'rao642' });

    return profile.about;
  },
  first() {
    const profile = Profiles.findOne({ username: 'rao642' });

    return profile.first;
  },
  last() {
    const profile = Profiles.findOne({ username: 'rao642' });

    return profile.last;
  },

  standing() {
    const profile = Profiles.findOne({ username: 'rao642' });

    return profile.standing;
  },
});
