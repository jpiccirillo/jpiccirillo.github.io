let deaths_us,
  deaths_world,
  region = "U.S.",
  scope = "world",
  countries,
  states,
  initial;

function changeRegion(chosen) {
  region = chosen;
  startPlot(filterCountry(region));
}

function responseJson(response) {
  if (!response.ok)
    throw new Error(response.status + " " + response.statusText);
  return response.json();
}

function json(input, init) {
  return fetch(input, init).then(responseJson);
}

Promise.all([
  new Promise((res, rej) => {
    return d3.csv(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",
      (err, data) => res(data)
    );
  }),
])
  .then((r) => parseJohnsHopkinsData(r[0]))
  .then(() => fixData("China", 1587099600000))
  .then(() => fixData("France", 1589864400000))
  .then(() => fixData("Spain", 1590382800000))
  .then(() => filterCountry("US"))
  .then((singleCountryData) => startPlot(singleCountryData))
  .then(function () {
    function getMaxDeaths(c) {
      c = _.omit(c, ["Country/Region"]); // remove metadata before dates;
      return d3.max(_.values(c).map((c) => +c)); // get max of values
    }

    countries = deaths_world
      .filter((c) => getMaxDeaths(c.values) > 1000)
      .map((c) => c.key)
      .sort();

    var cDropdown = $("#dropdown");
    for (let c = 0; c < countries.length; c++) {
      $("<option />", { value: countries[c], text: countries[c] }).appendTo(
        cDropdown
      );
    }
    cDropdown.val("US");
  })
  .catch((err) => console.log(err));

function parseJohnsHopkinsData(data) {
  deaths_world = d3
    .nest()
    .key((p) => p["Country/Region"])
    .rollup((all) => {
      return all.reduce((acc, region) => {
        for (const [key, value] of Object.entries(region)) {
          if (/^[a-zA-Z\/]/.test(key)) continue;
          acc[key] = acc[key] ? acc[key] + parseInt(value) : parseInt(value);
        }
        return acc;
      }, {});
    })
    .entries(data)
    .map((c) => {
      c.values = _.keys(c.values).reduce((acc, key) => {
        if (key !== "Country/Region")
          acc[new Date(key).getTime()] = parseInt(c.values[key]);
        return acc;
      }, {});
      return c;
    });
}

function filterCountry(region) {
  return deaths_world.filter((country) => country.key === region);
}

function fixData(country, timestamp) {
  // Get index of china in deaths_world
  const countryIndex = deaths_world.findIndex((r) => r.key === country);
  const data = deaths_world[countryIndex].values;

  // Get total cumulative deaths at date-to-correct:
  const max = data[timestamp];
  const dates = _.keys(data);
  const prevStamp = dates[dates.findIndex((d) => d == timestamp) - 1];
  const difference = max - data[prevStamp];

  for (let day in data) {
    if (day >= timestamp) data[day] = data[day] - difference;
  }

  // Now we have the difference to redistibute around the curve
  // For each day, ask how much that day's death toll was of total.
  const spread = dates
    .map((key, i) => {
      const deathsToday = data[key] - (data[dates[i - 1]] || 0);
      return Math.ceil((deathsToday / max) * 1290);
    })
    .map(cumulativeSum);

  deaths_world[countryIndex].values = Object.entries(data).reduce(
    (acc, [dat, count], i) => {
      acc[dat] = count + spread[i];
      return acc;
    },
    {}
  );
}
