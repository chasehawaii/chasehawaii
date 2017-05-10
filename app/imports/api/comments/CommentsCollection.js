import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

/**
 * Create the schema for Stuff
 */
export const CommentsSchema = new SimpleSchema({
  username: {
    label: 'username',
    type: String,
    optional: true,
    max: 20,
  },
  about: {
    label: 'about',
    type: String,
    optional: false,
    max: 500,
  },
  itemid: {
    label: 'itemid',
    type: SimpleSchema.RegEx.Url,
    optional: false,
    max: 200,
  },
});

export const Comments = new Mongo.Collection('Comments');
Comments.attachSchema(CommentsSchema);
