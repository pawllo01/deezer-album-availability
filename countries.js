const fs = require('fs');

// https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes
getCountries();

async function getCountries() {
  const res = await fetch(
    'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json'
  );
  const countries = await res.json();

  const sortedCountries = countries.sort((a, b) => {
    if (a['alpha-2'] > b['alpha-2']) return 1;
    if (a['alpha-2'] < b['alpha-2']) return -1;
    return 0;
  });

  let myCountries = {};

  for (const country of sortedCountries) {
    myCountries[country['alpha-2']] = country.name;
  }

  fs.writeFileSync('./countries.json', JSON.stringify(myCountries, null, 2));
}
