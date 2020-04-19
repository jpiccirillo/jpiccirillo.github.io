let runningSim,
    counter = 0,
    chart;

function startPlot(data) {
    //   https://github.com/CSSEGISandData/COVID-19/issues/2126#issuecomment-612546925
    if (region === "Germany") data[0][1586581200000] = 2871;

    const deaths = _.values(data[0]);
    deaths[0] = "Cumulative deaths";

    const dates = _.keys(data[0]).map((d, i) => (i === 0 ? d : new Date(+d)));
    dates[0] = "date";

    let rateOfGrowth = deaths.map((cur, i) => {
        const calcRate = function () {
            const yday = deaths[i - 1];
            if (i === 1) return null; // First in cumulative dataset is title
            if (cur === 0) return null; //If cumulative still 0, no growth 
            if (yday === 0) return null; //If yesterday was 0, returns infinity
            return ((cur - yday) / yday) * 100;
        };
        return i === 0 ? "Cumulative growth" : calcRate();
    });
    let dailyDeaths = deaths.map((cur, i) =>
        i === 0 ? "Daily deaths" : cur - deaths[i - 1]
    );

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
            columns: [dates, dailyDeaths, rateOfGrowth],
            type: "spline",
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
