import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

/**
 Creates the Beach Items schema
 */
export const HikesSchema = new SimpleSchema({
  title: {
    label: 'title',
    type: String,
    optional: true,
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
    type: String,
    optional: true,
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
});
export const Hikes = new Mongo.Collection('Hikes');
Hikes.attachSchema(HikesSchema);


