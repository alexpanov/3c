import PropTypes from 'prop-types';
import React from 'react';
import {Marker} from 'react-google-maps';

export default class CityMarker extends React.Component {
  markerPosition() {
    const {city: {openWeatherMapResponse: {coord: {lat, lon}}}} = this.props;
    return {
      lat, lng: lon
    };
  }

  render() {
    const {city, onClick} = this.props;

    const position = this.markerPosition();
    return (
      <Marker
        position={position}
        key={city._id}
        onClick={() => onClick(city)}
      />
    );
  }
}

CityMarker.propTypes = {
  onClick: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};
