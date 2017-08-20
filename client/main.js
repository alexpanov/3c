import {Tracker} from 'meteor/tracker';
import React from 'react';
import {render} from 'react-dom';
import Root from './router';

Meteor.startup(() => {
  Tracker.autorun((computations) => {
    if (Meteor.user() !== undefined) {
      computations.stop();
      render(<Root />, document.getElementById('root'));
    }
  });
});
