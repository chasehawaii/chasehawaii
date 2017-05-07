import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';

export const locationList = ['Windward', 'Leeward', 'Central Oahu', 'Honoluu', 'North Shore'];
export const tagList = ['Busy', 'Secluded', 'Kid-friendly', 'Dog-friendly', 'Good waves', 'No waves', 'Windward',
  'Leeward', 'Central Oahu', 'Honoluu', 'North Shore', 'Chinese', 'Thai', 'Italian', 'Mexican', 'Local', 'Burgers',
  'Japanese Grill', 'Sushi'];

Template.Item_Feed_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.subscribe('Hikes');
  this.subscribe('Restaurants');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set('Tags', undefined);
  this.messageFlags.set('Filtered', false);
});

Template.Item_Feed_Page.onRendered(function onRendered() {
  this.$('div.dropdown').dropdown();
});

Template.Item_Feed_Page.helpers({
  beaches() {
    const allBeaches = Beaches.find().fetch();
    const selectedBeaches = Template.instance().messageFlags.get('Tags');
    const filteredBeaches =  _.filter(allBeaches, beach => _.intersection(beach.tags, selectedBeaches).length > 0);
    if (!Template.instance().messageFlags.get('Filtered')) {
      return _.filter(allBeaches, beach => beach.status === 'Approved');
    }
    return _.filter(filteredBeaches, beach => beach.status === 'Approved');
  },
  hikes() {
    const allHikes = Hikes.find().fetch();
    const selectedHikes = Template.instance().messageFlags.get('Tags');
    const filteredHikes =  _.filter(allHikes, hike => _.intersection(hike.tags, selectedHikes).length > 0);
    if (!Template.instance().messageFlags.get('Filtered')) {
      return _.filter(allHikes, hike => hike.status === 'Approved');
    }
    return _.filter(filteredHikes, hike => hike.status === 'Approved');
  },
  restaurants() {
    const allRestaurants = Restaurants.find().fetch();
    const selectedRestaurants = Template.instance().messageFlags.get('Tags');
    const filteredRestaurants =  _.filter(allRestaurants, restaurant => _.intersection(restaurant.tags, selectedRestaurants).length > 0);
    if (!Template.instance().messageFlags.get('Filtered')) {
      return _.filter(allRestaurants, restaurant => restaurant.status === 'Approved');
    }
    return _.filter(filteredRestaurants, restaurant => restaurant.status === 'Approved');
  },

  tagFilterChoice() {
    return _.map(tagList, function makefilterObject(tag) {
      return { label: tag };
    });
  },
});

Template.Item_Feed_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Tags.selectedOptions, (option) => option.selected);
    instance.messageFlags.set('Tags', _.map(selectedOptions, (option) => option.value));
    instance.messageFlags.set('Filtered', true);
  },
});
