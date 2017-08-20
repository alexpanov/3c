import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Mongo} from 'meteor/mongo';

export const CityWeather = new Mongo.Collection('cityWeather');

CityWeather.deny({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

const CityWeatherSchema = new SimpleSchema({
  city: {
    type: String,
  },

  provinceCode: {
    type: String,
  },

  openWeatherMapResponse: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  lastTouched: {
    type: Date,
    autoValue: () => new Date()
  },
});

export const SORT_BY_LOWEST_TEMPERATURE = {'openWeatherMapResponse.main.temp': 1};

CityWeather.attachSchema(CityWeatherSchema);
