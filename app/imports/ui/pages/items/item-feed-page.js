import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';

export const locationList = ['Windward', 'Leeward', 'Central Oahu', 'Honoluu', 'North Shore'];
export const tagList = ['Dog-friendly', 'busy'];

Template.Item_Feed_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.subscribe('Hikes');
  this.subscribe('Restaurants');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set('Beach', false);
  this.messageFlags.set('Hike', false);
  this.messageFlags.set('Restaurant', false);
  this.messageFlags.set('Locations', undefined);

});

Template.Item_Feed_Page.onRendered(function onRendered() {
  this.$('div.dropdown').dropdown();
  this.$('.ui.accordion').accordion({ exclusive: false });
  this.$('.ui.buttons .button').on('click', function () {
    $(this).addClass('positive')
        .siblings()
        .removeClass('positive');
    $('.treemenu').toggleClass('boxed');
  });
});

Template.Item_Feed_Page.helpers({
  beaches() {
    if (Template.instance().messageFlags.get('Beach')) {
      const allBeaches = Beaches.find().fetch();
      const selectedBeaches = Template.instance().messageFlags.get('Locations');
      console.log(allBeaches[0].location);
      return _.filter(allBeaches, beach => _.intersection(beach.location, selectedBeaches).length > 0);
    } else {
      return Beaches.find().fetch();
    }
  },

  hikes() {
    if (Template.instance().messageFlags.get('Hike')) {
      console.log(Template.instance().messageFlags.get('Hike'));
      return Hikes.find();
    } else {
      return [];
    }
  },
  restaurants() {
    if (Template.instance().messageFlags.get('Restaurant')) {
      console.log(Template.instance().messageFlags.get('Restaurant'));
      return Restaurants.find();
    } else {
      return [];
    }
  },
  locationFilterChoice() {
    return _.map(locationList, function makefilterObject(location) {
      return { label: location };
    });
  },
  tagFilterChoice() {
    return _.map(tagList, function makefilterObject(tag) {
      return { label: tag };
    });
  },
});

Template.Item_Feed_Page.events({
  'click .filter-category'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const clickedFilter = event.target.closest('button');
    Template.instance().messageFlags.set($(clickedFilter).attr('data-category'), true);
  },
  'click .filter-location'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const clickedFilter = event.target.closest('button');
    Template.instance().messageFlags.set($(clickedFilter).attr('data-location'), true);
  },
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Location.selectedOptions, (option) => option.selected);
    instance.messageFlags.set('Locations', _.map(selectedOptions, (option) => option.value));
    console.log(instance.messageFlags.get('Locations'));
  },
});
