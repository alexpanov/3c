import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {resetDatabase} from 'meteor/xolvio:cleaner';

chai.use(chaiAsPromised);

chai.should();

Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});
