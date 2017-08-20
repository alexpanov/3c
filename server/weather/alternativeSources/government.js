import {createChromeless} from '/server/headlessChrome';

async function getCityLink({city}) {
  const chromeless = createChromeless();

  const cityLink = await chromeless
    .goto(`https://weather.gc.ca/forecast/canada/index_e.html?id=${city.provinceCode}`)
    .evaluate(() => {
      const links = [].filter.call(
        document.querySelectorAll('a'),
        x => x.innerText === city
      ).map(({href}) => href);
      return links[0];
    });

  await chromeless.end();
  return cityLink;
}

async function fetchCurrentTemp(cityLink) {
  const chromeless = createChromeless();

  const temp = await chromeless
    .goto(`${cityLink}?unit=imperial`)
    .evaluate(() => document.querySelector('span.wxo-imperial-hide').textContent
      .trim()
      .split('°')[0]);
  await chromeless.end();
  return temp;
}

export async function fetchTemperature(city) {
  const cityLink = await getCityLink(city);

  if (cityLink) {
    // noinspection UnnecessaryLocalVariableJS
    const temp = await fetchCurrentTemp(cityLink);
    return temp;
  }

  return null;
}
