import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';
import {Button, Card, Container} from 'semantic-ui-react';

class CityMarker extends React.Component {
  markerPosition() {
    const {city: {openWeatherMapResponse: {coord: {lat, lon}}}} = this.props;
    return {
      lat, lng: lon
    };
  }

  render() {
    const {city, onClick} = this.props;
    console.log(city);

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

class CityCard extends React.Component {
  currentTemp() {
    return this.props.city.openWeatherMapResponse.main.temp;
  }

  render() {
    const now = moment();

    const {city: {city, provinceCode, lastTouched}, onCancel} = this.props;
    const temp = this.currentTemp();
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>
            {`${city}, ${provinceCode}`}
          </Card.Header>
          <Card.Meta>
            {`Last Update: ${moment(lastTouched).from(now)}`}
          </Card.Meta>
          <Card.Description>
            {`Currently: ${temp}°F`}
          </Card.Description>
        </Card.Content>
        <Button onClick={onCancel}>
          Cancel
        </Button>
      </Card>
    );
  }
}

CityCard.propTypes = {
  city: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default class ColdestCitiesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: null
    };
  }

  selectCity(city) {
    console.log(city);
    this.setState({
      selectedCity: city
    });
  }

  renderMap() {
    return (
      <div id="map" style={{height: '65%'}}>
        <Map
          containerElement={
            <div style={{height: '100%'}} />
          }
          mapElement={
            <div style={{height: '100%'}} />
          }
          onMapLoad={console.log}
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
    console.log('rendering');
    return (
      <div id="app">
        {this.renderMap()}
        <Container className="center aligned" style={{height: '30%', paddingTop: 15}}>
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
