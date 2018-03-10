d3.csv("snow.csv", function(csv) {
    var count = 0;
    var allData = [];
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
            tempArray.push(+d[name]);
        })
        allData.push(tempArray)
    }
    plot_1(allData);
});

function plot_1(allData) {
    console.log(allData);
    var chart = c3.generate({
        bindto: "#chart",
        padding: {
            top: 30,
            right: 30,
        },
        size: {
            height: 300,
            width: (window.innerWidth > 800) ? window.innerWidth * .9 : window.innerWidth
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
            },
        },
        axis: {
            x: {
                label: {
                    text: 'Years',
                    position: 'outer-right'
                },
                // tick: {
                //     values: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850],
                // },
                padding: {
                    left: 5,
                    right: 0
                }
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
                // max: 1,
                // min: 0,
                padding: {
                    top: 0,
                    bottom: 0
                }
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
    d3.select('#chart svg').append('text')
        .attr('x', (d3.select('#chart svg').node().getBoundingClientRect().width / 2) )
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '1.4em')
        .text('Historical Snowfall for Madison WI');
}
