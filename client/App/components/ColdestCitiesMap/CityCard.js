import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {Button, Card} from 'semantic-ui-react';

export default class CityCard extends React.Component {
  currentTemp() {
    return this.props.city.openWeatherMapResponse.main.temp;
  }

  render() {
    const now = moment();

    const {city: {city, provinceCode, lastTouched}, onCancel} = this.props;
    const temp = this.currentTemp();
    return (
      <Card centered style={{marginBottom: 10}}>
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
