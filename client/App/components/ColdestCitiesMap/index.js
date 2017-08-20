import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {GoogleMap, withGoogleMap} from 'react-google-maps';
import {Container} from 'semantic-ui-react';
import CityCard from './CityCard';
import CityMarker from './CityMarker';

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{lat: 57.691898, lng: -113.2609688}}
    onClick={props.selectCity}>
    {props.cities.map(city => (
      <CityMarker city={city} key={city._id} onClick={props.onMarkerClick} />
    ))}
  </GoogleMap>
));

export default class ColdestCitiesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: null
    };
  }

  selectCity(city) {
    this.setState({
      selectedCity: city
    });
  }

  renderMap() {
    return (
      <div id="map" style={{height: '55%'}}>
        <Map
          containerElement={
            <div style={{height: '100%'}} />
          }
          mapElement={
            <div style={{height: '100%'}} />
          }
          onMapClick={console.log}
          cities={this.props.cities}
          onMarkerClick={city => this.selectCity(city)}
        />
      </div>
    );
  }

  renderCurrentlySelectedCity() {
    const {selectedCity} = this.state;
    if (!selectedCity) {
      return (
        <div>
          <h3>Select on the map for more info</h3>
        </div>
      );
    }

    return (
      <CityCard city={selectedCity} onCancel={() => this.selectCity(null)} />
    );
  }

  render() {
    return (
      <div id="app">
        {this.renderMap()}
        <Container className="center aligned" style={{height: '40%', paddingTop: 15}}>
          <h1>Coldest cities in Canada right now</h1>
          {this.renderCurrentlySelectedCity()}
        </Container>
      </div>
    );
  }
}

ColdestCitiesMap.propTypes = {
  cities: PropTypes.array.isRequired
};
