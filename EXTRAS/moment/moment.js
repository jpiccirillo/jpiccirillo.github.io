var applications = [],
    numApps = 6, //top n-1 apps
    modData = [],
    groups = [],
    dates = ['x'],
    minuteCount = ['Screentime'],
    pickupCount = ['Pickups'],
    labels = ['Appstore', 'Bumble', 'Camera', 'Google Drive', 'Google Photos', 'Facebook', 'Fitbit', 'Gmail', 'Google Maps', 'Grindr', 'Hornet', 'Instagram', 'Maps', 'Messages', 'Messenger', 'Mint', 'Moment', 'Music', 'Notes', 'OK Cupid', 'Outlook', 'Phone', 'Photos', 'Reversee', 'Safari', 'Scruff', 'Settings', 'Snapchat', 'Uber', 'Lyft', 'Weather'];
    // ramps = [
    //     ['#8b0000', '#cb2f44', '#f47461', '#ffbd84', '#ffffe0'],
    //     ['#253494', '#2c7fb8', '#41b6c4', '#a1dab4', '#ffffcc'],
    //     ['#006837', '#31a354', '#78c679', '#c2e699', '#ffffcc'], ];
    // style = window.getComputedStyle(document.getElementById("#chart"), null);
    // width = style.getPropertyValue("width");

d3.queue()
    .defer(d3.json, "moment.json")
    .defer(d3.json, "moment_before.json")
    .await(processJSONs);

function processJSONs(error, data1, data2) {
    var a = data1.days, b = data2.days_1;
    var data = {a, b};

    applications = labels.map(function(labels) { return [labels]})
    readData(data);
    changeLabels();
    makeGroups(numApps);
    makeChart();
}

function compare(a, b) {
    var a_total = 0,
        b_total = 0,
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
        var val = obj[key];

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
                        if (app_name == "Sc ruff") { app_name = "Scruff" }

                        if (applications[k][0] == app_name) {
                            var new_value = Math.floor(val[i]["appUsages"][j]['onScreen'])
                            applications[k].push(new_value);
                            written = 1;
                        }
                    }

                    if (written == 0) { applications[k].push(0);  }
                }
            }
            else {
                console.log("No application data found for: " + val[i].date)
            }
        }
    }

    applications = applications.sort(compare);
    for (var i = 0; i < numApps; i++) {
        console.log(applications[i]);
    }
}

function makeGroups(limit) {
    groups = applications.slice(0, limit).map(function(i) {return i[0]})
}

function changeLabels() {
    applications.forEach(function(a, index) {
        if (a[0] == "Grindr") { a[0] = "Tinder" }
        if (a[0] == "Messages") { a[0] = "iMessage" }
        //more exceptions and changes here if necessary
    })
}

function makeChart() {
    var columns = applications.filter(function(i, index) { return index < numApps})
    columns.unshift(dates) //dates is global

    // console.log(parseInt(window.innerWidth/100))
    var chart = c3.generate({
        data: {
            x: 'x',
            xFormat: '%Y-%m-%dT%H:%M:%S-%L:%S',
            columns: columns,
            type: 'area-spline',
            groups: [groups]
        },
        point: { show: false },
        legend: { position: 'inset', reverse: true },
        subchart: { show: true },
        zoom: { rescale: true },
        tooltip: {
            format: {
                value: function (value) {
                    return value + " min"
                },
            }
        },
        axis: {
            x: {
                extent: [dates[32], dates[1]],
                type: 'timeseries',
                tick: { fit: false, format: '%m/%d', },
                padding: 0
            },
            y: { padding: { bottom: 0 } }
        },

        // color: {
        //     pattern: ramps[Math.floor((Math.random() * (3 - 0) + 0))]
        // },
        padding: {
            left: 25,
            right: 15
        }
    });
}
