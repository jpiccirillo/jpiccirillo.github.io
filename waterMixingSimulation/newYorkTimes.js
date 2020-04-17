function init(deaths_us, deaths_world) {
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

  return (function({ type, scope }) {
    var dat = chartData[`${type}_${scope}`].filter(
      d => d.chart_label != "Mainland China"
    );

    const index = Object.keys(dat).filter(k => {
      return dat[k].key === "USA";
    });

    filtered_data = dat[index].all_values.map(v => {
      delete v.obj;
      delete v.doubling_time;
      delete v.date_text;
      v.date = new Date(v.date);
      return v;
    });

    let deaths = filtered_data.reduce(
      (a, i) => {
        a.push(i.value);
        return a;
      },
      ["deaths"]
    );

    let dates = filtered_data.reduce(
      (a, i) => {
        a.push(i.date);
        return a;
      },
      ["date"]
    );

    return [dates, deaths];
  })({ type: "deaths", scope: "world" });
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
    console.log(r);
    return init(r[0], r[1]);
  })
  .then(r => startPlot(r))
  .catch(err => console.log(err));
