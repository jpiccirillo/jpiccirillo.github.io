let runningSim, counter = 0, chart;
let data = [
    ['x', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ['heat', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
]

function startPlot() {

    console.log(data);
    chart = c3.generate({
        bindto: "#chartContainer",
        size: {
            height: 700,
        },
        title: {
            text: 'Temperature of Water over Time',
        },
        data: {
            x: 'x',
            columns: data,
            type: 'spline',
        },
        // point: {
        //     show: false
        // },
        legend: {
            position: 'inset',
            inset: {
                anchor: 'top-left',
                y: 5
            },
        },
        axis: {
            x: {
                label: {
                    text: 'Seconds',
                    position: 'outer-right'
                },
                tick: {
                    // values: 'x',
                    fit: true,
                    culling: false
                },
            },
            y: {
                label: {
                    text: 'Temperature',
                    position: 'outer-right'
                },
                tick: {
                    format: x => `${x}\°F`
                },
            }
        },
        tooltip: {
            format: {
                title: x => `At ${x} seconds`,
                value: v => `${v.toFixed(1)}°`
            }
        }
    });

    runningSim = setInterval(() => { updatePlot(chart) }, 1000)
}

function pause() {
    const options = ["Pause", "Continue"];
    if (options[counter % 2] === "Pause") {
        clearTimeout(runningSim);
    } else {
        updatePlot(chart)
        runningSim = setInterval(() => { updatePlot(chart) }, 1000)
    }
    counter += 1;
    $("#pauseButton").text(options[counter % 2])
}

function newTemp(oldDate) {
    console.log(oldDate);
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

    const oldTemps = oldData.map(v => v.value)
    oldTemps.push(getRandomTemp())

    const oldTimes = oldData.map(v => v.x);
    oldTimes.push(newTick(oldTimes[oldTimes.length - 1]))

    chart.load({
        columns: [
            ['heat', ...oldTemps],
            ['x', ...oldTimes]
        ],

    })
};

startPlot()