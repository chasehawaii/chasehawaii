import { Beaches } from '../../api/items/beach/beach-item.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const beachSeeds = [
  {
    title: 'Lanikai Beach',
    category: 'Beach',
    location: 'Windward',
    status: 'approved',
    about: 'blurb',
    tags: 'no surf',
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Beaches.find().count() === 0) {
  _.each(beachSeeds, function seedBeach(beach) {
    Beaches.insert(beach);
  });
}
