import { Beaches } from '../../api/items/beach/beach-item.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const beachSeeds = [
  {
    title: 'Lanikai Pill Box',
    category: 'Hike',
    location: 'Windward',
    status: 'approved',
    about: 'blurb',
    tags: 'kid-friendly',
  },
  { title: 'Lanikai Pill Box',
    category: 'Hike',
    location: 'Windward',
    status: 'approved',
    about: 'blurb',
    tags: 'kid-friendly', },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Beaches.find().count() === 0) {
  _.each(beachSeeds, function seedBeach(beach) {
    Beaches.insert(beach);
  });
}
