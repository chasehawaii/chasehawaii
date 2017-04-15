import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Restaurant = new Mongo.Collection('Restaurant');

/**
 * Create the schema for Item
 */
export const RestaurantSchema = new SimpleSchema({
  name: {
    label: 'name',
    type: String,
    optional: false,
    max: 200,
  },

  telephone: {
    label: 'telephone',
    type: String,
    optional: false,
    max: 200,
  },
  takeout: {
    label: 'takeout',
    type: String,
    optional: false,
    max: 200,
  },
});

Restaurant.attachSchema(RestaurantSchema);
