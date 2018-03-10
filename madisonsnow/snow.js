d3.csv("snow.csv", function(csv) {
    var count = 0;
    var allData = [],
        xaxis = [];
    for (var k in csv[0]) {
        if (csv[0].hasOwnProperty(k)) {
            ++count;
        }
    }
    //Not attaching to window
    for (i = 0; i < count; i++) {
        tempArray = [Object.keys(csv[0])[i]];
        name = Object.keys(csv[0])[i]
        csv.map(function(d) {
            if ((i == 0) && (+d[name] % 10 == 0)) {
                xaxis.push(+d[name])
            }
            tempArray.push(+d[name]);
        })
        allData.push(tempArray)
    }
    console.log(xaxis)
    plot_1(allData, xaxis);
});

function plot_1(allData, xaxis) {
    console.log(allData);
    var chart = c3.generate({
        bindto: "#chart",
        size: {
            height: 300,
        },
        title: {
            text: 'Snowfall in Madison, Wisconsin',
        },
        data: {
            x: 'x',
            columns: allData,
            type: 'spline',
        },
        color: {
            pattern: ['#1f77b4', '#aec7e8']
        },
        point: {
            show: false
        },
        legend: {
            position: 'inset',
            inset: {
                anchor: 'top-left',
                y: 5
            },
        },
        axis: {
            x: {
                tick: {
                    // values: xaxis,
                    fit: true,
                    culling: true
                },
            },
            y: {
                label: {
                    text: 'Cumulative Snowfall',
                    position: 'outer-right'
                },
                tick: {
                    format: function(x) {
                        return x + "\"";
                    },
                },
            }
        },
        tooltip: {
            format: {
                title: function(x) {
                    return "Winter of " + x + '-' + String(x + 1).substring(2, 4);
                },
                value: function(value, ) {
                    return value.toFixed(1) + "\"";
                }
            }
        }
    });
}
