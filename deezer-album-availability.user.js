// ==UserScript==
// @name         Deezer Album Availability
// @namespace    https://github.com/pawllo01/deezer-album-availability
// @version      1.4
// @description  Show in which countries the album is available and in which it is unavailable.
// @author       pawllo01
// @match        https://www.deezer.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deezer.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const YOUR_COUNTRY_CODE = '';

  const COUNTRIES = {
    AD: 'Andorra',
    AE: 'United Arab Emirates',
    AF: 'Afghanistan',
    AG: 'Antigua and Barbuda',
    AI: 'Anguilla',
    AL: 'Albania',
    AM: 'Armenia',
    AO: 'Angola',
    AQ: 'Antarctica',
    AR: 'Argentina',
    AS: 'American Samoa',
    AT: 'Austria',
    AU: 'Australia',
    AW: 'Aruba',
    AX: 'Åland Islands',
    AZ: 'Azerbaijan',
    BA: 'Bosnia and Herzegovina',
    BB: 'Barbados',
    BD: 'Bangladesh',
    BE: 'Belgium',
    BF: 'Burkina Faso',
    BG: 'Bulgaria',
    BH: 'Bahrain',
    BI: 'Burundi',
    BJ: 'Benin',
    BL: 'Saint Barthélemy',
    BM: 'Bermuda',
    BN: 'Brunei Darussalam',
    BO: 'Bolivia, Plurinational State of',
    BQ: 'Bonaire, Sint Eustatius and Saba',
    BR: 'Brazil',
    BS: 'Bahamas',
    BT: 'Bhutan',
    BV: 'Bouvet Island',
    BW: 'Botswana',
    BY: 'Belarus',
    BZ: 'Belize',
    CA: 'Canada',
    CC: 'Cocos (Keeling) Islands',
    CD: 'Congo, Democratic Republic of the',
    CF: 'Central African Republic',
    CG: 'Congo',
    CH: 'Switzerland',
    CI: "Côte d'Ivoire",
    CK: 'Cook Islands',
    CL: 'Chile',
    CM: 'Cameroon',
    CN: 'China',
    CO: 'Colombia',
    CR: 'Costa Rica',
    CU: 'Cuba',
    CV: 'Cabo Verde',
    CW: 'Curaçao',
    CX: 'Christmas Island',
    CY: 'Cyprus',
    CZ: 'Czechia',
    DE: 'Germany',
    DJ: 'Djibouti',
    DK: 'Denmark',
    DM: 'Dominica',
    DO: 'Dominican Republic',
    DZ: 'Algeria',
    EC: 'Ecuador',
    EE: 'Estonia',
    EG: 'Egypt',
    EH: 'Western Sahara',
    ER: 'Eritrea',
    ES: 'Spain',
    ET: 'Ethiopia',
    FI: 'Finland',
    FJ: 'Fiji',
    FK: 'Falkland Islands (Malvinas)',
    FM: 'Micronesia, Federated States of',
    FO: 'Faroe Islands',
    FR: 'France',
    GA: 'Gabon',
    GB: 'United Kingdom of Great Britain and Northern Ireland',
    GD: 'Grenada',
    GE: 'Georgia',
    GF: 'French Guiana',
    GG: 'Guernsey',
    GH: 'Ghana',
    GI: 'Gibraltar',
    GL: 'Greenland',
    GM: 'Gambia',
    GN: 'Guinea',
    GP: 'Guadeloupe',
    GQ: 'Equatorial Guinea',
    GR: 'Greece',
    GS: 'South Georgia and the South Sandwich Islands',
    GT: 'Guatemala',
    GU: 'Guam',
    GW: 'Guinea-Bissau',
    GY: 'Guyana',
    HK: 'Hong Kong',
    HM: 'Heard Island and McDonald Islands',
    HN: 'Honduras',
    HR: 'Croatia',
    HT: 'Haiti',
    HU: 'Hungary',
    ID: 'Indonesia',
    IE: 'Ireland',
    IL: 'Israel',
    IM: 'Isle of Man',
    IN: 'India',
    IO: 'British Indian Ocean Territory',
    IQ: 'Iraq',
    IR: 'Iran, Islamic Republic of',
    IS: 'Iceland',
    IT: 'Italy',
    JE: 'Jersey',
    JM: 'Jamaica',
    JO: 'Jordan',
    JP: 'Japan',
    KE: 'Kenya',
    KG: 'Kyrgyzstan',
    KH: 'Cambodia',
    KI: 'Kiribati',
    KM: 'Comoros',
    KN: 'Saint Kitts and Nevis',
    KP: "Korea, Democratic People's Republic of",
    KR: 'Korea, Republic of',
    KW: 'Kuwait',
    KY: 'Cayman Islands',
    KZ: 'Kazakhstan',
    LA: "Lao People's Democratic Republic",
    LB: 'Lebanon',
    LC: 'Saint Lucia',
    LI: 'Liechtenstein',
    LK: 'Sri Lanka',
    LR: 'Liberia',
    LS: 'Lesotho',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    LV: 'Latvia',
    LY: 'Libya',
    MA: 'Morocco',
    MC: 'Monaco',
    MD: 'Moldova, Republic of',
    ME: 'Montenegro',
    MF: 'Saint Martin (French part)',
    MG: 'Madagascar',
    MH: 'Marshall Islands',
    MK: 'North Macedonia',
    ML: 'Mali',
    MM: 'Myanmar',
    MN: 'Mongolia',
    MO: 'Macao',
    MP: 'Northern Mariana Islands',
    MQ: 'Martinique',
    MR: 'Mauritania',
    MS: 'Montserrat',
    MT: 'Malta',
    MU: 'Mauritius',
    MV: 'Maldives',
    MW: 'Malawi',
    MX: 'Mexico',
    MY: 'Malaysia',
    MZ: 'Mozambique',
    NA: 'Namibia',
    NC: 'New Caledonia',
    NE: 'Niger',
    NF: 'Norfolk Island',
    NG: 'Nigeria',
    NI: 'Nicaragua',
    NL: 'Netherlands, Kingdom of the',
    NO: 'Norway',
    NP: 'Nepal',
    NR: 'Nauru',
    NU: 'Niue',
    NZ: 'New Zealand',
    OM: 'Oman',
    PA: 'Panama',
    PE: 'Peru',
    PF: 'French Polynesia',
    PG: 'Papua New Guinea',
    PH: 'Philippines',
    PK: 'Pakistan',
    PL: 'Poland',
    PM: 'Saint Pierre and Miquelon',
    PN: 'Pitcairn',
    PR: 'Puerto Rico',
    PS: 'Palestine, State of',
    PT: 'Portugal',
    PW: 'Palau',
    PY: 'Paraguay',
    QA: 'Qatar',
    RE: 'Réunion',
    RO: 'Romania',
    RS: 'Serbia',
    RU: 'Russian Federation',
    RW: 'Rwanda',
    SA: 'Saudi Arabia',
    SB: 'Solomon Islands',
    SC: 'Seychelles',
    SD: 'Sudan',
    SE: 'Sweden',
    SG: 'Singapore',
    SH: 'Saint Helena, Ascension and Tristan da Cunha',
    SI: 'Slovenia',
    SJ: 'Svalbard and Jan Mayen',
    SK: 'Slovakia',
    SL: 'Sierra Leone',
    SM: 'San Marino',
    SN: 'Senegal',
    SO: 'Somalia',
    SR: 'Suriname',
    SS: 'South Sudan',
    ST: 'Sao Tome and Principe',
    SV: 'El Salvador',
    SX: 'Sint Maarten (Dutch part)',
    SY: 'Syrian Arab Republic',
    SZ: 'Eswatini',
    TC: 'Turks and Caicos Islands',
    TD: 'Chad',
    TF: 'French Southern Territories',
    TG: 'Togo',
    TH: 'Thailand',
    TJ: 'Tajikistan',
    TK: 'Tokelau',
    TL: 'Timor-Leste',
    TM: 'Turkmenistan',
    TN: 'Tunisia',
    TO: 'Tonga',
    TR: 'Türkiye',
    TT: 'Trinidad and Tobago',
    TV: 'Tuvalu',
    TW: 'Taiwan, Province of China',
    TZ: 'Tanzania, United Republic of',
    UA: 'Ukraine',
    UG: 'Uganda',
    UM: 'United States Minor Outlying Islands',
    US: 'United States of America',
    UY: 'Uruguay',
    UZ: 'Uzbekistan',
    VA: 'Holy See',
    VC: 'Saint Vincent and the Grenadines',
    VE: 'Venezuela, Bolivarian Republic of',
    VG: 'Virgin Islands (British)',
    VI: 'Virgin Islands (U.S.)',
    VN: 'Viet Nam',
    VU: 'Vanuatu',
    WF: 'Wallis and Futuna',
    WS: 'Samoa',
    YE: 'Yemen',
    YT: 'Mayotte',
    ZA: 'South Africa',
    ZM: 'Zambia',
    ZW: 'Zimbabwe',
  };

  // add GeoChart script
  const geoChartScript = document.createElement('script');
  geoChartScript.src = 'https://www.gstatic.com/charts/loader.js';
  document.head.appendChild(geoChartScript);

  // observe URL change
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
      const albumData = await getAlbumData(albumId);
      const albumAvailability = getAlbumAvailability(albumData);
      const avalabilityElement = createAvailabilityElement(albumAvailability);

      // embed data
      const intervalId = setInterval(() => {
        const albumContainer = document.querySelector('div.container');
        if (albumContainer) {
          clearInterval(intervalId);

          // label & upc
          document.querySelector('div.catalog-legal-notice').insertAdjacentHTML(
            'beforeend',
            `<p>Label: ${albumData.label}</p>
             <p>UPC: ${albumData.upc}</p>`
          );

          // album availability
          albumContainer.insertAdjacentHTML('beforeend', avalabilityElement);
          embedGeoChart(albumAvailability, albumContainer);
        }
      }, 200);
    }
  }

  async function getAlbumData(albumId) {
    try {
      const res = await fetch(`https://www.deezer.com/en/album/${albumId}`);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      eval(doc.querySelector('body script').textContent); // window.__DZR_APP_STATE__ = {...}
      const albumData = window.__DZR_APP_STATE__.DATA;

      return {
        label: albumData?.LABEL_NAME,
        upc: albumData?.UPC,
        metaElements: [
          ...doc.querySelectorAll('meta[property="og:restrictions:country:disallowed"]'),
        ],
      };
    } catch (error) {
      console.log(error);
    }
  }

  function getAlbumAvailability(albumData) {
    const unavailableCountries = albumData.metaElements
      .map((country) => country.content)
      .filter((country) => country !== 'AN'); // https://en.wikipedia.org/wiki/ISO_3166-2:AN

    const availableCountries = Object.keys(COUNTRIES).filter(
      (country) => !unavailableCountries.includes(country)
    );

    return { unavailableCountries, availableCountries };
  }

  function createAvailabilityElement(albumAvailability) {
    const countriesStyle = objectStyleToString({
      'font-family': 'monospace',
      'font-size': '0.9rem',
      color: 'var(--tempo-colors-text-neutral-secondary-default)',
    });
    const highlightStyle = objectStyleToString({
      'background-color': '#ffff00',
      color: 'black',
    });

    const createCountryList = (title, countries) => {
      const countrySpans = countries.map((country) => {
        const highlight =
          country === YOUR_COUNTRY_CODE.toUpperCase() ? `style="${highlightStyle}"` : '';

        return `
          <span title="${COUNTRIES[country]}" ${highlight}>${country}</span>`;
      });

      return `
        <div style="margin:8px 0">
          <p>${title} (${countries.length}):</p>
          <div style="${countriesStyle}">${countrySpans.join(', ')}</div>
        </div>`;
    };

    return `
      <div>
        <h2 class="chakra-heading css-uae1qr" data-testid="section_title">Album Availability</h2>
        ${createCountryList('Available in', albumAvailability.availableCountries)}
        ${createCountryList('Unavailable in', albumAvailability.unavailableCountries)}
      </div>`;
  }

  function objectStyleToString(style) {
    return Object.entries(style)
      .map(([key, value]) => `${key}:${value};`)
      .join(' ');
  }

  // https://developers.google.com/chart/interactive/docs/gallery/geochart?hl=en
  function embedGeoChart(albumAvailability, albumContainer) {
    google.charts.load('current', { packages: ['geochart'] });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
      const data = google.visualization.arrayToDataTable([
        ['Country ISO', 'Country Name', { role: 'tooltip' }],
        ...Object.entries(COUNTRIES).map(([iso, name]) => [
          iso,
          albumAvailability.unavailableCountries.includes(iso) ? 0 : 1,
          `${name} ${albumAvailability.unavailableCountries.includes(iso) ? '❌' : '✅'}`,
        ]),
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
