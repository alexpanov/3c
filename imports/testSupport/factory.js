import {CityWeather} from '/imports/api/cities/collection';
import faker from 'faker';
import {Factory} from 'meteor/dburles:factory';

Factory.define('cityWeather', CityWeather, {
  city: faker.address.city(),
  provinceCode: faker.address.stateAbbr(),
  openWeatherMapResponse: () => ({
    main: {
      temp: faker.random.number()
    }
  }),
});

export default Factory;
