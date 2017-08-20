import '/imports/startup/server';
import seedCities from './seedCities';

Meteor.startup(() => {
  seedCities();
});
