import {CityWeather, SORT_BY_LOWEST_TEMPERATURE} from '/imports/api/cities/collection';
import {createContainer} from 'meteor/react-meteor-data';
import 'normalize.css';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ColdestCitiesMap from './components/ColdestCitiesMap';

class App extends Component {
  render() {
    if (this.props.loading) {
      return <h1>Loading</h1>;
    }
    return (
      <ColdestCitiesMap cities={this.props.cities} />
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
};

export default createContainer(({params: {groupId}}) => {
  const subscription = Meteor.subscribe('CityWeather.publications.all', {groupId});
  const cities = CityWeather.find({}, {sort: SORT_BY_LOWEST_TEMPERATURE}).fetch();
  return {
    loading: !subscription.ready(),
    cities
  };
}, App);
