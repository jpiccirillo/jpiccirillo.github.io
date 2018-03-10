$(document).ready(function() {
    prepareData();
});

function prepareData() {
    d3.csv("snowadvanced.csv", function(csv) {
        var count = 0;
        var allData = [],
            xaxis = []

        for (var k in csv[0]) {
            if (csv[0].hasOwnProperty(k)) {
                ++count;
            }
        }
        //Not attaching to window
        var plot = 0;
        var month;
        for (i = 0; i < count; i++) {
            tempArray = [Object.keys(csv[0])[i]];
            name = Object.keys(csv[0])[i]
            desiredMonth = parseInt($("#month").val())
            // log(desiredMonth)
            csv.map(function(d) {
                if (name == "YearMonth") {
                    year = d[name].substring(0, 4);
                    month = d[name].substring(4, 6);
                    // console.log(month)
                    date = new Date(year, month, 1)
                    if (month == desiredMonth) {
                        if (year % 5 == 0) {
                            xaxis.push(date)
                        }
                        plot = 1
                        tempArray.push(date)
                    }
                } else if (d['YearMonth'].substring(4, 6) == desiredMonth) {
                    // console.log(month)
                    tempArray.push(+d[name]);
                }
            })
            allData.push(tempArray)
        }
        // console.log(xaxis)
        plot_1(allData, xaxis);
    });
}

function plot_1(allData, xaxis) {
    // console.log(allData)
    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // ramps = [
    //     ['#8b0000', '#cb2f44', '#f47461', '#ffbd84', '#ffffe0'],
    //     ['#253494', '#2c7fb8', '#41b6c4', '#a1dab4', '#ffffcc'],
    //     ['#006837', '#31a354', '#78c679', '#c2e699', '#ffffcc'], ];
    var chart = c3.generate({
        bindto: "#chart",
        padding: {
            top: 30,
        },
        size: {
            height: 300,
            // width: (window.innerWidth > 800) ? window.innerWidth : window.innerWidth
        },

        data: {
            x: 'YearMonth',
            xFormat: '%m-%Y',
            columns: allData,
            type: 'spline',
        },
        color: {
            pattern: setRamps()
        },
        point: {
            show: false
        },
        legend: {
            position: 'inset',
            inset: {
                anchor: 'top-left',
            },
        },
        axis: {
            x: {
                // label: {
                //     text: 'Years',
                //     position: 'outer-center'
                // },
                type: 'timeseries',
                tick: {
                    format: '%Y',
                    values: xaxis
                },
                padding: {
                    left: 5,
                    // right: 0
                }
            },
            y: {
                label: {
                    text: 'Degrees Farenheit',
                    position: 'outer-right'
                },
                // tick: {
                //     format: function(x) {
                //         return x + "°";
                //     },
                // },
                // max: 1,
                // min: 0,
                // padding: {
                //     top: 0,
                //     bottom: 0
                // }
            }
        },
        tooltip: {
            format: {
                title: function(x) {
                    return (monthNames[x.getMonth()] + ", " + x.getFullYear())
                }
                // value: function(value, ) {
                //     return value + "\"";
                // }
            }
        }
    });
    d3.select('#chart svg').append('text')
        .attr('x', (d3.select('#chart svg').node().getBoundingClientRect().width / 2))
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '1.4em')
        .text('Monthly Temperatures in Madison, WI');
}

function setRamps() {
    desiredMonth = $("#month").val()
    ramps = [
        ['#3182bd', '#9ecae1', '#deebf7'],
        ["#f03b20", "#feb24c", "#ffeda0"],
    ];
    console.log(desiredMonth)
    if ((+desiredMonth>9)||(desiredMonth<4)) {return ramps[0];}
    else return ramps[1];
}
