import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

class HikeCollection extends BaseCollection {
  /**
   Creates the Hike Items schema
   */
  constructor() {
    super('Hike', new SimpleSchema({
      title: {
        label: 'title',
        type: String,
        optional: false,
      },
      category: {
        label: 'category',
        type: String,
        optional: false,
      },
      location: {
        label: 'location',
        type: String,
      },
      status: {
        label: 'status',
        type: String,
        optional: false,
      },
      about: {
        label: 'about',
        type: String,
      },
      tags: {
        label: 'tags',
        type: String,
      },
      picture: {
        type: SimpleSchema.RegEx.Url,
        optional: true,
      },
      kind: {
        label: 'kind',
        type: String,
      },
      length: {
        label: 'length',
        type: String,
      },
      difficulty: {
        label: 'difficulty',
        type: String,
      },
    }));
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Hikes = new HikeCollection();

