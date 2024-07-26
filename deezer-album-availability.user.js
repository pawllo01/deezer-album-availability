// ==UserScript==
// @name         Deezer Album Availability
// @namespace    https://github.com/pawllo01/deezer-album-availability
// @version      1.0
// @description  Show in which countries the album is available and in which it is unavailable.
// @author       pawllo01
// @match        https://www.deezer.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deezer.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  const YOUR_COUNTRY_CODE = '';

  const COUNTRIES = [
    'AD',
    'AE',
    'AF',
    'AG',
    'AI',
    'AL',
    'AM',
    'AO',
    'AQ',
    'AR',
    'AS',
    'AT',
    'AU',
    'AW',
    'AX',
    'AZ',
    'BA',
    'BB',
    'BD',
    'BE',
    'BF',
    'BG',
    'BH',
    'BI',
    'BJ',
    'BL',
    'BM',
    'BN',
    'BO',
    'BQ',
    'BR',
    'BS',
    'BT',
    'BV',
    'BW',
    'BY',
    'BZ',
    'CA',
    'CC',
    'CD',
    'CF',
    'CG',
    'CH',
    'CI',
    'CK',
    'CL',
    'CM',
    'CN',
    'CO',
    'CR',
    'CU',
    'CV',
    'CW',
    'CX',
    'CY',
    'CZ',
    'DE',
    'DJ',
    'DK',
    'DM',
    'DO',
    'DZ',
    'EC',
    'EE',
    'EG',
    'EH',
    'ER',
    'ES',
    'ET',
    'FI',
    'FJ',
    'FK',
    'FM',
    'FO',
    'FR',
    'GA',
    'GB',
    'GD',
    'GE',
    'GF',
    'GG',
    'GH',
    'GI',
    'GL',
    'GM',
    'GN',
    'GP',
    'GQ',
    'GR',
    'GS',
    'GT',
    'GU',
    'GW',
    'GY',
    'HK',
    'HM',
    'HN',
    'HR',
    'HT',
    'HU',
    'ID',
    'IE',
    'IL',
    'IM',
    'IN',
    'IO',
    'IQ',
    'IR',
    'IS',
    'IT',
    'JE',
    'JM',
    'JO',
    'JP',
    'KE',
    'KG',
    'KH',
    'KI',
    'KM',
    'KN',
    'KP',
    'KR',
    'KW',
    'KY',
    'KZ',
    'LA',
    'LB',
    'LC',
    'LI',
    'LK',
    'LR',
    'LS',
    'LT',
    'LU',
    'LV',
    'LY',
    'MA',
    'MC',
    'MD',
    'ME',
    'MF',
    'MG',
    'MH',
    'MK',
    'ML',
    'MM',
    'MN',
    'MO',
    'MP',
    'MQ',
    'MR',
    'MS',
    'MT',
    'MU',
    'MV',
    'MW',
    'MX',
    'MY',
    'MZ',
    'NA',
    'NC',
    'NE',
    'NF',
    'NG',
    'NI',
    'NL',
    'NO',
    'NP',
    'NR',
    'NU',
    'NZ',
    'OM',
    'PA',
    'PE',
    'PF',
    'PG',
    'PH',
    'PK',
    'PL',
    'PM',
    'PN',
    'PR',
    'PS',
    'PT',
    'PW',
    'PY',
    'QA',
    'RE',
    'RO',
    'RS',
    'RU',
    'RW',
    'SA',
    'SB',
    'SC',
    'SD',
    'SE',
    'SG',
    'SH',
    'SI',
    'SJ',
    'SK',
    'SL',
    'SM',
    'SN',
    'SO',
    'SR',
    'SS',
    'ST',
    'SV',
    'SX',
    'SY',
    'SZ',
    'TC',
    'TD',
    'TF',
    'TG',
    'TH',
    'TJ',
    'TK',
    'TL',
    'TM',
    'TN',
    'TO',
    'TR',
    'TT',
    'TV',
    'TW',
    'TZ',
    'UA',
    'UG',
    'UM',
    'US',
    'UY',
    'UZ',
    'VA',
    'VC',
    'VE',
    'VG',
    'VI',
    'VN',
    'VU',
    'WF',
    'WS',
    'YE',
    'YT',
    'ZA',
    'ZM',
    'ZW',
  ];

  let unavailableCountries;

  // https://gist.github.com/jpcaparas/e8257fca97e2fad44a43c34668810244
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://www.gstatic.com/charts/loader.js',
    onload: (ev) => {
      let e = document.createElement('script');
      e.innerText = ev.responseText;
      document.head.appendChild(e);
    },
  });

  // https://stackoverflow.com/questions/53303519/detect-an-url-change-in-a-spa
  let previousUrl = '';
  const observer = new MutationObserver(() => {
    if (location.href !== previousUrl) {
      previousUrl = location.href;
      app();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  async function app() {
    if (location.pathname.includes('/album/')) {
      const albumId = location.pathname.split('/')[3];
      const avalabilityElement = await createAvailabilityElement(albumId);

      const intervalId = setInterval(() => {
        const albumContainer = document.querySelector('div.container');
        if (albumContainer) {
          clearInterval(intervalId);
          albumContainer.insertAdjacentHTML('beforeend', avalabilityElement);
          embedGeoChart(albumContainer);
        }
      }, 200);
    }
  }

  async function createAvailabilityElement(albumId) {
    const metaElements = [...(await fetchMetaElements(albumId))];

    unavailableCountries = metaElements
      .map((country) => country?.content)
      .filter((country) => country !== 'AN'); // https://en.wikipedia.org/wiki/ISO_3166-2:AN

    const availableCountries = COUNTRIES.filter(
      (country) => !unavailableCountries.includes(country)
    );

    const countriesStyle = objectStyleToString({
      'font-family': 'monospace',
      'font-size': '0.9rem',
      color: 'var(--tempo-colors-text-neutral-secondary-default)',
    });
    const highlightStyle = objectStyleToString({
      'background-color': '#ffff00',
      color: 'black',
    });

    const createCountryList = (title, countries) => `
    <div style="margin:8px 0">
      <p>${title} (${countries.length}):</p>
      <p style="${countriesStyle}">${countries
      .join(', ')
      .replace(
        YOUR_COUNTRY_CODE,
        `<span style="${highlightStyle}">${YOUR_COUNTRY_CODE}</span>`
      )}</p>
    </div>`;

    return `
    <div>
    <h2 class="chakra-heading css-uae1qr" data-testid="section_title">Album Availability</h2>
      ${createCountryList('Available in', availableCountries)}
      ${createCountryList('Unavailable in', unavailableCountries)}
    </div>`;
  }

  async function fetchMetaElements(albumId) {
    try {
      const res = await fetch(`https://www.deezer.com/en/album/${albumId}`);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.querySelectorAll('meta[property="og:restrictions:country:disallowed"]');
    } catch (error) {
      console.log(error);
    }
  }

  function objectStyleToString(style) {
    return Object.entries(style)
      .map(([key, value]) => `${key}:${value};`)
      .join(' ');
  }

  // https://developers.google.com/chart/interactive/docs/gallery/geochart?hl=en
  function embedGeoChart(albumContainer) {
    google.charts.load('current', { packages: ['geochart'] });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
      const data = google.visualization.arrayToDataTable([
        ['Country', 'Available'],
        ...COUNTRIES.map((country) => [country, unavailableCountries.includes(country) ? 0 : 1]),
      ]);

      const options = {
        colorAxis: { colors: ['#df3c3c', '#00b23d'] }, // red, green
        backgroundColor: 'transparent',
        legend: 'none',
      };

      const geoChart = document.createElement('div');
      geoChart.style.width = '95%';
      geoChart.style.margin = '0 auto';
      albumContainer.append(geoChart);

      const chart = new google.visualization.GeoChart(geoChart);

      chart.draw(data, options);
    }
  }
})();
