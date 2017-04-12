import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

class RestaurantCollection extends BaseCollection {
  /**
   Creates the Restaurant Items collection
   */
  constructor() {
    super('Restaurant', new SimpleSchema({
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
    }));
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Restaurants = new RestaurantCollection();
