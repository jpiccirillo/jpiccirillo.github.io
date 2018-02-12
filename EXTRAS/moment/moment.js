var applications = [],
    modData = [],
    groups = [],
    dates = ['x'],
    minuteCount = ['Screentime'],
    pickupCount = ['Pickups'],
    labels = ['Appstore', 'Bumble', 'Camera', 'Google Drive', 'Google Photos', 'Facebook', 'Fitbit', 'Gmail', 'Google Maps', 'Grindr', 'Hornet', 'Instagram', 'Maps', 'Messages', 'Messenger', 'Mint', 'Moment', 'Music', 'Notes', 'OK Cupid', 'Outlook', 'Phone', 'Photos', 'Reversee', 'Safari', 'Scruff', 'Settings', 'Snapchat', 'Uber', 'Lyft', 'Weather'],
    ramps = [
        ['#8b0000', '#cb2f44', '#f47461', '#ffbd84', '#ffffe0'],
        ['#253494', '#2c7fb8', '#41b6c4', '#a1dab4', '#ffffcc'],
        ['#006837', '#31a354', '#78c679', '#c2e699', '#ffffcc'], ];
    // style = window.getComputedStyle(document.getElementById("#chart"), null);
    // width = style.getPropertyValue("width");

d3.queue()
    .defer(d3.json, "moment_before.json")
    .defer(d3.json, "moment.json")
    .await(processJSONs);

function processJSONs(error, data2, data1) {
    data = function (array) {
        var o = {};
        array.forEach(function (a) {
            Object.keys(a).forEach(function (k) {
                o[k] = a[k];
            });
        });
        return o;
    }([data1, data2]);

    for (var i = 0; i < labels.length; i++) {
        applications.push([labels[i]]);
    }

    readData(data);
    changeLabels();
    makeGroups();
    makeChart();
}

function compare(a, b) {
    var a_total = 0,
        b_total = 0;
        len = a.length

    for (var i = 1; i < a.length; i++) {
        a_total += a[i]
        b_total += b[i]
    }

    //Sort over entire length
    if ((a_total / len) < (b_total / len)) {return 1;}
    if ((a_total / len) > (b_total / len)) {return -1;}
    else return 0;
}

function readData(obj) {
    for (var key in obj) {
        // if (obj.hasOwnProperty(key)) {
            var val = obj[key];
        // }
        for (var i = 0; i < val.length; i++) {

            //If appUsages subarray has length of 0 for a day, it means that battery screenshot failed 4 that day.
            //For these cases I manually paste data into moment_before.json.  Therefore, wrap code that generates
            //the arrays in an if loop to make sure that we're only writing days into the array for which there is
            //data. Since there is no day where I do not open up the messages app, I'll use the Message app being
            //zero to indicate battery screenshot failure.
            var hasData = false;
            for (var j = 0; j < val[i]["appUsages"].length; j++) {
                var app_name = val[i]["appUsages"][j]['appName']
                if (app_name == "Messages") {
                    hasData = true;
                    break
                }
            }

            if (hasData) {
                dates.push(val[i].date);
                pickupCount.push(val[i].pickupCount);
                minuteCount.push(val[i].minuteCount);
                for (var k = 0; k < applications.length; k++) {
                    var written = 0;

                    for (var j = 0; j < val[i]["appUsages"].length; j++) {
                        var app_name = val[i]["appUsages"][j]['appName']
                        if (app_name == "Sc ruff") {
                            app_name = "Scruff"
                        }
                        if (applications[k][0] == app_name) {
                            var new_value = Math.floor(val[i]["appUsages"][j]['onScreen'])
                                //                        var random_low_value = Math.floor((Math.random() * (5 - 0) + 0))

                            //                        if (new_value < 2) {
                            //                            new_value = random_low_value
                            //                        }

                            applications[k].push(new_value);
                            var written = 1;
                        }
                    }

                    if (written == 0) {
                        applications[k].push(0);
                        //                    applications[k].push(Math.floor((Math.random() * (5 - 0) + 0)));
                    }
                }
            }
            else {
                console.log("No application data found for: " + val[i].date)
            }
        }
    }

    applications = applications.sort(compare);
    //    console.log(dates.length);
    //    console.log(applications[0].length);
    //    console.log(dates);
    console.log(applications[0],
                    applications[1],
                    applications[2],
                    applications[3],
                    applications[4]);
    console.log(applications);
}

function makeGroups() {
    for (var i = 0; i < 5; i++) {
        groups.push(applications[i][0])
    }
    console.log(groups)
}

function changeLabels() {
    for (var i = 0; i < applications.length; i++) {
        if (applications[i][0] == "Grindr") { applications[i][0] = "Tinder" }
        if (applications[i][0] == "Messages") { applications[i][0] = "iMessage"
        }
    }
}

function makeChart() {
    console.log(parseInt(window.innerWidth/100))
    var chart = c3.generate({
        data: {
            x: 'x',
            xFormat: '%Y-%m-%dT%H:%M:%S-%L:%S',
            columns: [
                dates,
                applications[0],
                applications[1],
                applications[2],
                applications[3],
                applications[4]
            ],
            type: 'area-spline',
            groups: [groups]
        },
        // bar: {
        //     width: {
        //         ratio: 1 // this makes bar width 50% of length between ticks
        //     }
        // },
        point: {
            show: false
        },
        legend: {
            position: 'inset',
            reverse: true
        },
        subchart: {
            show: true
        },
        zoom: {
            rescale: true
        },
        tooltip: {
            format: {
                value: function (value) {
                    return value + " min"
                },
            }
            //            value: d3.format(',') // apply this format to both y and y2
        },
        axis: {
            x: {
                extent: [dates[32], dates[1]],
                type: 'timeseries',
                tick: {
                    fit: false,
                    format: '%m/%d',
                    //                    rotate: -45,
                    //                    multiline: false,
                    // culling: {
                    //     max: parseInt(window.innerWidth/10),
                    // }
                },
                padding: 0
            },
            y: {
                padding: {
                    bottom: 0
                }
            }
        },
        // onresized: function () {
        //     window.innerWidth > 830 ?
        //         chart.internal.config.axis_x_tick_culling_max = 36 : (window.innerWidth >= 600 ? chart.internal.config.axis_x_tick_culling_max = 14 : (window.innerWidth < 500 ? chart.internal.config.axis_x_tick_culling_max = 7 : (
        //             chart.internal.config.axis_x_tick_culling_max = 5)));
        // },
        color: {
            pattern: ramps[Math.floor((Math.random() * (3 - 0) + 0))]
        },
        padding: {
            left: 25,
            right: 15
        }
    });
}
