import { Template } from 'meteor/templating';
import { Beaches } from '/imports/api/items/beach/beach-item.js';
import { Hikes } from '/imports/api/items/hike/hike-item.js';
import { Restaurants } from '/imports/api/items/restaurant/restaurant-item.js';
import { ReactiveDict } from 'meteor/reactive-dict';

const categoryFilterList = ['Beach', 'Hike', 'Restaurant'];

Template.Item_Feed_Page.onCreated(function onCreated() {
  this.subscribe('Beaches');
  this.subscribe('Hikes');
  this.subscribe('Restaurants');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set('Beach', false);
  this.messageFlags.set('Hike', false);
  this.messageFlags.set('Restaurant', false);
  this.messageFlags.set('Westward', false);
  this.messageFlags.set('Windward', false);
  this.messageFlags.set('Leeward', false);
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
      console.log(Template.instance().messageFlags.get('Beach'));
      return Beaches.find();
    } else {
      return [];
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
  categoryFilterChoice() {
    return _.map(categoryFilterList, function makefilterObject(category) {
      return { label: category };
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
});
