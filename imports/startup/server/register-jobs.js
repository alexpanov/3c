import {SyncedCron} from 'meteor/percolate:synced-cron';
import {updateMostStaleCityWeather} from './weather';

SyncedCron.add({
  name: 'Update the oldest weather point',
  schedule(parser) {
    return parser.text('every 10 seconds');
  },
  job() {
    updateMostStaleCityWeather();
  }
});

SyncedCron.start();
