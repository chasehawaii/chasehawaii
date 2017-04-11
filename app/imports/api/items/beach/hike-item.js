import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

class BeachCollection extends BaseCollection {
  /**
   Creates the Hike Items collection
   */
  constructor() {
    super('Hike', new SimpleSchema({
      title: {
        label: 'title',
        type: String,
        optional: false,
      },
      category: {
        type: String,
        optional: false,
      },
      location: {
        type: String,
      },
      status: {
        type: String,
        optional: false,
      },
      about: {
        type: String
      },
      tags: {
        type: String
      },
      kind: {
        type: String
      },
      length: {
        type: String
      },
      difficulty: {
        type: String
      },

    }));

  }





}