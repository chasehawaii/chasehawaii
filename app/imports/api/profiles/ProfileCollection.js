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
  /*
  facebook: {
    label: 'facebook',
    type: String,
    optional: true,
    max: 20,
  },
  insta: {
    label: 'insta',
    type: String,
    optional: true,
    max: 20,
    autoform: {
      group: 'Stuff',
      placeholder: '3',
    },
  },
  twitter: {
    label: 'twitter',
    type: String,
    optional: true,
    max: 20,
  },
  */
  image: {
    label: 'image',
    type: String,
    optional: true,
    max: 200,
  },
  about: {
    label: 'about',
    type: String,
    optional: true,
    max: 140,
  },
});

Profiles.attachSchema(ProfilesSchema);
