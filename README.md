# 3C: Coldest Canadian Cities

This app provides data about current coldest canadian cities.
The app collects weather information for [350+ cities](https://github.com/alexpanov/3c/blob/master/server/seedCities/cities.json) as small as 3000 inhabitants.

Current weather for each city is updated roughly once per hour. More specifically, the oldest piece of data is updated [every 10 seconds](https://github.com/alexpanov/3c/blob/master/imports/startup/server/register-jobs.js).

## Live App
### Browser App
You can check out the app at http://coldest-canadian-cities.herokuapp.com. 

As the new data comes in, the map updates in a reactive manner.

### API
The data is also available through an HTTP API at [`$API_HOST/cities/coldest/current`](http://coldest-canadian-cities.herokuapp.com/cities/coldest/current).

## Data Sources
### Default
By default, the app uses [OpenWeatherMap API](https://openweathermap.org/api).

### Alternative
There is also an alternative data source ready for scraping [Government of Canada's weather information](https://weather.gc.ca/canada_e.html). 

The code lives [here](https://github.com/alexpanov/3c/blob/master/server/weather/alternativeSources/government.js).

It uses [Chromeless](https://github.com/graphcool/chromeless) deployed on AWS Lambda.

## Running Locally
### Requirements
* [Meteor](https://www.meteor.com/install)
* Yarn or npm
* Node

1. Install the dependencies via `npm i` or `yarn`.
2. Execute `meteor`.
