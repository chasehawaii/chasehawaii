import { Restaurant } from '../../api/restaurant/restaurant.js';
import { _ } from 'meteor/underscore';

/**
 * A list of item to pre-fill the Collection.
 * @type {*[]}
 */
const restaurantSeeds = [
  { name: 'Hailis', telephone: '808-111-2222', takeout: 'yes' },
  { name: 'Ono Hawaiian Seafood', telephone: '808-111-2222', takeout: 'yes' },
  { name: 'Lucky Charms', telephone: '909-112-3040', takeout: 'yes' },
];

/**
 * Initialize the item collection if empty with seed data.
 */
if (Restaurant.find().count() === 0) {
  _.each(restaurantSeeds, function seedRestaurants(restaurant) {
    Restaurant.insert(restaurant);
  });
}
