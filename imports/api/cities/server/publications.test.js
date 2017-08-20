import {CityWeather} from '/imports/api/cities/collection';
import Factory from '/imports/testSupport/factory';
import '/imports/testSupport/setup';
import orderBy from 'lodash.orderby';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';
import './publications';

const select10Coldest = (cities) => {
  const result = orderBy(cities, 'openWeatherMapResponse.main.temp').slice(0, 10);

  const temp = x => x.openWeatherMapResponse.main.temp;
  temp(result[0]).should.be.lessThan(temp(result[1]));
  result.length.should.equal(10);

  return result;
};

describe('CityWeather.publications', () => {
  beforeEach(() => {
    CityWeather.remove({});
  });

  it('publishes only cities with weather data', (done) => {
    Factory.create('cityWeather', {openWeatherMapResponse: null});
    Factory.create('cityWeather');

    const collector = new PublicationCollector();
    collector.collect('CityWeather.publications.all', (collections) => {
      collections.cityWeather.length.should.equal(1);
      done();
    });
  });
  it('publishes 10 cities only', (done) => {
    [...new Array(11)].forEach(() => Factory.create('cityWeather'));

    const collector = new PublicationCollector();
    collector.collect('CityWeather.publications.all', (collections) => {
      collections.cityWeather.length.should.equal(10);
      done();
    });
  });
  it('publishes 10 cities only', (done) => {
    const cities = [...new Array(11)].map(() => Factory.create('cityWeather'));
    const tenColdest = select10Coldest(cities);

    const collector = new PublicationCollector();
    collector.collect('CityWeather.publications.all', ({cityWeather}) => {
      const toId = ({_id}) => _id;
      const coldestIds = tenColdest.map(toId);
      const publishedItemIds = cityWeather.map(toId);

      publishedItemIds.should.include.members(coldestIds);
      done();
    });
  });
});
