let cumulativeSum = ((sum) => (value) => (sum += value))(0);
let runningSim,
    counter = 0,
    chart;

function startPlot(data) {
    data = data[0].values;
    //   https://github.com/CSSEGISandData/COVID-19/issues/2126#issuecomment-612546925
    if (region === "Germany") data[1586581200000] = 2871;

    const deaths = _.values(data);
    const dates = _.keys(data).map((d) => new Date(+d));
    const rateOfGrowth = moving_average(
        deaths.map((cur, i) => {
            const yday = deaths[i - 1];
            //If yesterday or today is 0, return null
            return cur === 0 || yday === 0 ? null : ((cur - yday) / yday) * 100;
        })
    );

    let dailyDeaths = deaths.map((cur, i) => cur - deaths[i - 1]);
    const smoothed_deaths = moving_average(dailyDeaths);

    dates[0] = "date";
    rateOfGrowth.unshift("Cumulative growth");
    dailyDeaths.unshift("Daily deaths");
    smoothed_deaths.unshift("Smoothed average");

    chart = c3.generate({
        bindto: "#chartContainer",
        size: {
            height: 700
        },
        title: {
            text: `Coronavirus deaths in ${region} since ${date(dates[1])}`
        },
        data: {
            x: "date",
            columns: [dates, dailyDeaths, smoothed_deaths, rateOfGrowth],
            type: "spline",
            colors: {
                "Daily deaths": "#d8dfe4",
                "Smoothed average": "#5f6fa2",
                "Cumulative growth": "#ef7c8e",
            },
            axes: {
                deaths: "y",
                "Cumulative growth": "y2"
            }
        },
        point: {
            show: false
        },
        legend: {
            position: "inset",
            inset: {
                anchor: "top-left",
                y: 5
            }
        },
        axis: {
            x: {
                show: false,
                label: {
                    text: "Date",
                    position: "outer-right"
                },
                tick: {
                    // values: 'x',
                    rotate: 75,
                    multiline: false,
                    format: d => date(d),
                    fit: true,
                    culling: false
                }
            },
            y: {
                label: {
                    text: "Daily Deaths",
                    position: "outer-right"
                },
                tick: {
                    format: x => `${Number(x).toLocaleString()}`
                }
            },
            y2: {
                max: 100,
                show: true,
                label: {
                    text: "Rate of Growth",
                    position: "outer-right"
                },
                tick: {
                    format: x => `${x.toFixed(1)}%`
                }
            }
        },
        tooltip: {
            contents: generateTooltip,
            order: (t1, t2) => t1.id > t2.id,
            format: {
                title: x => `On ${date(x)}`,
                value: v =>
                    v % 1 === 0 ? `${Number(v).toLocaleString()}` : `${v.toFixed(2)}%`
            }
        }
    });
}

function date(d) {
    return new Date(d).toLocaleString("en-US", {
        day: "2-digit",
        year: "numeric",
        month: "short"
    });
}

function pause() {
    const options = ["Pause", "Continue"];
    if (options[counter % 2] === "Pause") {
        clearTimeout(runningSim);
    } else {
        updatePlot(chart);
        runningSim = setInterval(() => {
            updatePlot(chart);
        }, 1000);
    }
    counter += 1;
    $("#pauseButton").text(options[counter % 2]);
}

function newTemp(oldDate) {
    newDate = oldDate + 1;
    // const month = oldDate.split("/")[1];
    // const year = oldDate.split("/")[2];
    // const d = new Date("20" + year, month, 1);

    // const e = new Date(d.setMonth(d.getMonth() + 1));
    // const options = { day: "2-digit", year: "2-digit", month: "2-digit" }

    return newDate;

    //     numeric: newDate,
    //     // text: `${e.toLocaleString("fr-FR", { year: "2-digit" })}-${e.toLocaleString("en-US", { month: "short" })}`
    // };
}

function newTick(oldTick) {
    return oldTick + 1;
}

function getRandomTemp() {
    return Math.random() * (1200 - 800) + 800;
}

function updatePlot(chart) {
    const oldData = chart.data()[0].values;
    if (oldData.length > 20) oldData.shift();

    const oldTemps = oldData.map(v => v.value);
    oldTemps.push(getRandomTemp());

    const oldTimes = oldData.map(v => v.x);
    oldTimes.push(newTick(oldTimes[oldTimes.length - 1]));

    chart.load({
        columns: [
            ["heat", ...oldTemps],
            ["x", ...oldTimes]
        ]
    });
}

function sum(numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

function average(numbers) {
    return sum(numbers) / (numbers.length || 1);
}

function make_window(before, after) {
    return function (_number, index, array) {
        const start = Math.max(0, index - before);
        const end = Math.min(array.length, index + after + 1);
        return array.slice(start, end);
    };
}

function moving_average(numbers) {
    return _.chain(numbers).map(make_window(1, 1)).map(average).value();
}

function generateTooltip(d, defaultTitleFormat, defaultValueFormat, color) {
    var $$ = this,
        config = $$.config,
        titleFormat = config.tooltip_format_title || defaultTitleFormat,
        nameFormat = config.tooltip_format_name || ((n) => n),
        valueFormat = config.tooltip_format_value || defaultValueFormat,
        text,
        i,
        title,
        value,
        name,
        bgcolor;
    for (i = 0; i < d.length; i++) {
        if (!(d[i] && (d[i].value || d[i].value === 0))) {
            continue;
        }

        if (d[i].id === "Smoothed average") continue;

        if (!text) {
            title = titleFormat ? titleFormat(d[i].x) : d[i].x;
            text =
                "<table class='" +
                $$.CLASS.tooltip +
                "'>" +
                (title || title === 0
                    ? "<tr><th colspan='2'>" + title + "</th></tr>"
                    : "");
        }

        name = nameFormat(d[i].name);
        value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
        bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

        text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
        text +=
            "<td class='name'><span style='background-color:" +
            bgcolor +
            "'></span>" +
            name +
            "</td>";
        text += "<td class='value'>" + value + "</td>";
        text += "</tr>";
    }
    return text + "</table>";
}
