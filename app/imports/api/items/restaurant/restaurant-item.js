import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

/**
 Creates the Beach Items schema
 */
export const RestaurantsSchema = new SimpleSchema({
  title: {
    label: 'title',
    type: String,
    optional: false,
  },
  category: {
    label: 'category',
    type: String,
    optional: true,
  },
  location: {
    label: 'location',
    type: String,
    optional: true,
  },
  food: {
    label: 'food',
    type: String,
    optional: true,
  },
  status: {
    label: 'status',
    type: String,
    optional: true,
  },
  about: {
    label: 'about',
    type: String,
    optional: true,
  },
  tags: {
    label: 'tags',
    type: [String],
    optional: true,
  },
  picture: {
    type: SimpleSchema.RegEx.Url,
    optional: false,
  },
  likes: {
    label: 'likes',
    type: Number,
    optional: true,
  },
  createdAt: {
    label: 'createdAt',
    type: Date,
  },
  deleteRequest: {
    label: 'deleteRequest',
    type: Boolean,
    optional: true,
  },
});
export const Restaurants = new Mongo.Collection('Restaurants');
Restaurants.attachSchema(RestaurantsSchema);
