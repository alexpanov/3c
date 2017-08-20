# 3C: Coldest Canadian Cities

This app provides data about current coldest canadian cities.
The app collects weather information for 350+ cities as small as 3000 people.

The data is available through a client facing frontend and the HTTP API at `$API_HOST/cities/coldest/current`

## Live App
You can check out the app at http://coldest-canadian-cities.herokuapp.com

## Data Sources
### Default
By default, the app uses OpenWeatherMap API.

### Alternative
There is also an alternative data source ready for scraping https://weather.gc.ca/canada_e.html. 

The code lives here: https://github.com/alexpanov/3c/blob/master/server/weather/alternativeSources/government.js.

It uses https://github.com/graphcool/chromeless deployed as an AWS Lambda.
