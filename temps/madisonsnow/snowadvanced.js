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
                        if (year % 10 == 0) {
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
    var chart = c3.generate({
        bindto: "#chart",
        padding: {
            top: 0,
        },
        size: {
            height: 300,
        },
        title: {
  text: 'Temperatures by Month in Madison, Wisconsin',
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
                y: 5,
            },
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y',
                    // values: xaxis,
                    fit: true,
                    culling: true
                },
                padding: {
                    left: 5,
                }
            },
            y: {
                label: {
                    text: 'Degrees Farenheit',
                    position: 'outer-right'
                },
            }
        },
        tooltip: {
            format: {
                title: function(x) {
                    return (monthNames[x.getMonth()] + ", " + x.getFullYear())
                }
            }
        }
    });
}

function setRamps() {
    desiredMonth = $("#month").val()
    ramps = [
        ['#3182bd', '#9ecae1', '#deebf7'],
        ['#ff8c00','#ffb568','#f5deb3'],
        ["#f03b20", "#feb24c", "#ffeda0"],
    ];
    console.log(desiredMonth)
    if ((+desiredMonth>4)&&(desiredMonth<8)) { return ramps[2];}
    else if ((+desiredMonth>9)||(desiredMonth<3)) { return ramps[0];}
    else return ramps[1]
}
