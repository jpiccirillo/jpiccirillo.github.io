let deaths_us,
  deaths_world,
  region = "U.S.",
  scope = "world",
  countries,
  states,
  initial;

function changeRegion(chosen) {
  region = chosen === "Nationwide" ? "U.S." : chosen;
  scope = states.includes(region) ? "us" : "world";
  const c = $("#statesContainer");
  c[scope == "world" && region !== "U.S." ? "hide" : "show"]();
  startPlot(parseData());
}

function init() {
  var chartData = { deaths_us, deaths_world };

  ["us", "world"].forEach(scope => {
    var cutoff = cutoffs_world[scope];
    chartData["deaths_" + scope].forEach(obj => {
      const chart_label = (obj.chart_label =
        country_lookup[obj.key] || obj.key);
      obj.display_name = chart_label;
      obj.aliases = (country_aliases[obj.key] || []).join(" ") + " " + obj.key;

      if (!obj.values) {
        obj.values = obj.all_values.filter(d => d.days || d.days == 0);

        obj.all_values.forEach(d => {
          d.date_text = d.date;
          d.date = new Date(
            +d.date.slice(0, 4),
            +d.date.slice(5, 7) - 1,
            +d.date.slice(8, 10)
          );
        });
      }

      obj.values.forEach(d => {
        d.days = d.days + obj.offset;
        d.chart_label = chart_label;
      });

      if (obj.values[0].value != cutoff) {
        obj.values.unshift({
          chart_label,
          days: 0,
          value: cutoff
        });
      }

      obj.first_last =
        obj.values.length > 2
          ? obj.values[obj.values.length - 2]
          : obj.values[obj.values.length - 1];
      obj.last_last = obj.values[obj.values.length - 1];
    });

    chartData["deaths_" + scope].forEach(obj => {
      obj.values.forEach(d => {
        d.obj_doubling_time = obj.doubling_time;
        d.obj = obj;
      });
      obj.to_highlight = true;
      obj.sort_magic =
        obj.values.length > 2
          ? (obj.values.length *
              (1 + obj.last_last.value) *
              (1 + obj.last_last.value)) /
            obj.doubling_time
          : 0;
    });
  });

  return parseData(scope);
}

function parseData() {
  const type = "deaths",
    chartData = { deaths_us, deaths_world };
  const dat = chartData[`${type}_${scope}`];
  const index = Object.keys(dat).filter(k => {
    return dat[k].chart_label === region;
  });

  const dataField = scope === "us" ? "values" : "all_values";
  filtered_data = dat[index][dataField].map(v => {
    delete v.obj;
    delete v.doubling_time;
    delete v.date_text;
    v.date = new Date(v.date);
    return v;
  });

  let deaths = filtered_data.reduce(
    (a, i, index) => {
      !index
        ? a.push(i.value, 0)
        : a.push(i.value - filtered_data[index - 1].value);
      return a;
    },
    ["Daily Deaths"]
  );

  let cum_deaths = filtered_data.reduce(
    (a, i) => {
      a.push(i.value);
      return a;
    },
    ["Cumulative Deaths"]
  );

  let dates = filtered_data.reduce(
    (a, i) => {
      a.push(i.date);
      return a;
    },
    ["date"]
  );
  return [dates, deaths, cum_deaths];
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
  json(
    "https://static01.nyt.com/newsgraphics/2020/03/18/coronavirus-deaths-chart/d3709acca3165d0e831b936ae57d48221d92d8e7/cumulative_deaths_us.json"
  ),
  json(
    "https://static01.nyt.com/newsgraphics/2020/03/18/coronavirus-deaths-chart/d3709acca3165d0e831b936ae57d48221d92d8e7/cumulative_deaths_world.json"
  )
])
  .then(r => {
    deaths_us = r[0];
    deaths_world = r[1];
    return init(deaths_us, deaths_world);
  })
  .then(r => startPlot(r))
  .then(function() {
    countries = deaths_world
      .filter(c => c.last_last.value > 3000)
      .map(c => c.chart_label);

    states = deaths_us
      .filter(c => c.last_last.value > 150)
      .map(c => c.chart_label);

    var cDropdown = $("#dropdown");
    for (let c = 0; c < countries.length; c++) {
      $("<option />", { value: countries[c], text: countries[c] }).appendTo(
        cDropdown
      );
    }
    cDropdown.val("U.S.");

    var sDropdown = $("#states");
    for (let c = 0; c < states.length; c++) {
      $("<option />", { value: states[c], text: states[c] }).appendTo(
        sDropdown
      );
    }
    sDropdown.val("Nationwide");
  })
  .catch(err => console.log(err));
