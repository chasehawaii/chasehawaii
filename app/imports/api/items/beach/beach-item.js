import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class BeachCollection extends BaseCollection {
  /**
   Creates the Beach Items schema
   */
  /*export const BeachesSchema = new SimpleSchema({
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
   });
   */
//   export
//   const
//   Beaches = new Mongo.Collection('Beaches');
//   Beaches
// .
//   attachSchema(BeachesSchema);

  constructor() {
    super('Beach', new SimpleSchema({
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
  define({ title = '', category = '', location = '', status = '', about = '', tags = '', picture = '' }) {
    // make sure required fields are OK.
    const checkPattern = { title: String, category: String, location: String, status: String, about: String,
      tags: String, picture: String };
    check({ title, category, location, status, about, tags, picture }, checkPattern);

    return this._collection.insert({ title, category, location, status, about, tags, picture });
  }
}
export const Beaches = new BeachCollection();

