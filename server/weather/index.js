import {CityWeather} from '/imports/api/cities/collection';
import {HTTP} from 'meteor/http';

const OPEN_WEATHER_MAP_ID = process.env.OPEN_WEATHER_MAP_APP_ID || '28d1dcc0445799a106f3daa1783ee4ca';

const updateWeatherInfo = ({_id, city, provinceCode}) => {
  const query = `${city},${provinceCode},Canada&appid=${OPEN_WEATHER_MAP_ID}&units=imperial`;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}`;

  const {data} = HTTP.call('GET', url);
  CityWeather.update(_id, {$set: {openWeatherMapResponse: data}});
};

const touch = ({_id}) => CityWeather.update(_id, {$set: {lastTouched: new Date()}});

export const updateMostStaleCityWeather = () => {
  const oldest = CityWeather.findOne({}, {sort: {lastTouched: 1, limit: 1}});

  const message = `Updating weather for ${oldest.city}, ${oldest.provinceCode}. Last updated: ${oldest.lastTouched}`;
  console.log(message);
  touch(oldest);

  updateWeatherInfo(oldest);
};
