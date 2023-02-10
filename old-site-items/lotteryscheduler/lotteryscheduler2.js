d3.csv("CumulativeTicks.csv", function(csv) {
    var count = 0;
    var allData = [];
    for (var k in csv[0]) {
        if (csv[0].hasOwnProperty(k)) {
            ++count;
        }
    }
    // console.log(count)
    for (i = 0; i < count; i++) {
        window['Series_' + i] = [Object.keys(csv[0])[i]];
        name = Object.keys(csv[0])[i]
        csv.map(function(d) {
            window['Series_' + i].push(+d[name]);
        })
        allData.push(window['Series_' + i])
    }
    // console.log("allData:", allData);
    plot_2(allData);
});

function plot_2(allData) {
    // console.log(allData)
    var chart2 = c3.generate({
        bindto: '#chart2',
        padding: {
            top: 30,
            right: 30,
        },
        size: {
            // max: window.innerWidth > 830 ? 30
            height: 400,
            width: (window.innerWidth > 800) ? window.innerWidth * .8 : window.innerWidth
        },
        data: {
            columns: allData,
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
                    text: 'Time Slices',
                    position: 'outer-right'
                },
                tick: {
                    values: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850],
                },
                padding: {
                    left: 5,
                    right: 0
                }
            },
            y: {
                label: {
                    text: '# Time Slices Received',
                    position: 'outer-right'
                },
                // tick: {
                //     format: function(x) {
                //         return x * 100 + "% ";
                //     },
                // },
                max: 500,
                min: 0,
                padding: {
                    top: 0,
                    bottom: 0
                }
            }
        },
        tooltip: {
            format: {
                title: function(x) {
                    return 'At time slice: ' + x;
                },
                name: function(name) {
                    return name.substring(0, 10);
                },
            }
        }
    });

    d3.select('#chart2 svg').append('text')
        .attr('x', (d3.select('#chart2 svg').node().getBoundingClientRect().width / 2) * 1.1)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '1.4em')
        .text('Cumulative Time Slices Received per Concurrent Process');
}
