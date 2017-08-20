import {CityWeather} from '/imports/api/cities/collection';
import cities from './cities.json';

const seedCity = (city) => {
  const cityWeather = CityWeather.findOne(city);
  if (!cityWeather) {
    console.log('Seeding city: ', JSON.stringify(city));
    CityWeather.insert({
      ...city,
    });
  }
};

const seedCities = () => {
  cities.forEach(seedCity);
};

export default seedCities;
