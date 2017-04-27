import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Profiles = new Mongo.Collection('Profiles');

/**
 * Create the schema for Stuff
 */
export const ProfilesSchema = new SimpleSchema({
  username: {
    label: 'username',
    type: String,
    optional: false,
    max: 20,
  },
  first: {
    label: 'first',
    type: String,
    optional: true,
    max: 20,
  },
  last: {
    label: 'last',
    type: String,
    optional: true,
    max: 20,
  },
  standing: {
    label: 'standing',
    type: String,
    optional: true,
    max: 20,
  },
  image: {
    label: 'image',
    type: String,
    optional: true,
    max: 200,
  },
  facebook: {
    label: 'facebook',
    type: String,
    optional: true,
    max: 20,
  },
  instagram: {
    label: 'instagram',
    type: String,
    optional: true,
    max: 20,
  },
  twitter: {
    label: 'twitter',
    type: String,
    optional: true,
    max: 20,
  },
  about: {
    label: 'about',
    type: String,
    optional: true,
    max: 140,
  },
  bucketlist: {
    label: 'bucketlist',
    type: [String],
    optional: true,
  },
});

Profiles.attachSchema(ProfilesSchema);
