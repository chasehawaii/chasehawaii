import { Stuff } from '../../api/stuff/stuff.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const stuffSeeds = [
  { name: 'Basket', quantity: 3 },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Stuff.find().count() === 0) {
  _.each(stuffSeeds, function seedStuffs(stuff) {
    Stuff.insert(stuff);
  });
}