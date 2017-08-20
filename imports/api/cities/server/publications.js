/* eslint prefer-arrow-callback: "off" */
import {CityWeather, SORT_BY_LOWEST_TEMPERATURE} from '../collection';

Meteor.publish('CityWeather.publications.all', () =>
  CityWeather.find(
    {openWeatherMapResponse: {$ne: null}},
    {limit: 10, sort: SORT_BY_LOWEST_TEMPERATURE}
  ), {
  url: 'cities/coldest/current'
});
