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
  .then(() => filterCountry("US"))
  .then((singleCountryData) => startPlot(singleCountryData))
  .then(function () {
    function getMaxDeaths(c) {
      c = _.omit(c, ["Country/Region"]); // remove metadata before dates;
      return d3.max(_.values(c).map((c) => +c)); // get max of values
    }

    countries = deaths_world
      .filter((c) => getMaxDeaths(c) > 1000)
      .map((c) => c["Country/Region"])
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
      return all.reduce(
        (acc, region) => {
          for (const [key, value] of Object.entries(region)) {
            if (/^[a-zA-Z\/]/.test(key)) continue;
            acc[key] = acc[key] ? acc[key] + parseInt(value) : parseInt(value);
          }
          return acc;
        },
        { "Country/Region": all[0]["Country/Region"] }
      );
    })
    .entries(data)
    .map((c) => {
      c = c.values;
      return _.keys(c).reduce((acc, key) => {
        if (key === "Country/Region") acc[key] = c[key];
        else {
          acc[new Date(key).getTime()] = parseInt(c[key]);
        }
        return acc;
      }, {});
    });
}

function filterCountry(region) {
  return deaths_world.filter((country) => country["Country/Region"] === region);
}
