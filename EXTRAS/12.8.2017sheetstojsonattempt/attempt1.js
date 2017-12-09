var dates = ['x'],
    distance = ['Distance walked'],
    rows = new Array();

bin_menu = d3.select("#bin").on("change", change_bin),

function makeURL() {
    var base = 'http://gsx2json.com/api?id=',
        key = '1flnZoRPq17SryqYN3xWC4AI4402DbO11_XHAF0c7Soo',
        integers = 'false',
        query = '2017-12-08',
        rows = 'false'

    url = base.concat(key, "&integers=", integers, "&rows=", rows);
    console.log("Loading from: ", url)
}

function loadCSV() {
    //replace with 'url' when you're ready to call the data using a url again
    $.getJSON('fitbit.json', function(jsonData) {
            rows = jsonData.rows;
            // console.log
        })
        .done(function() {
            makePlot("Day");
        });
}

Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
};

function bin(bucket) {
    // console.log(columns2)

    var nestedData2 = d3.nest()
        .key(function(d) {
            if (bucket=="Day") {return d.date;}
            else {return getDateOfISOWeek(new Date(d.date).getWeek(), new Date(d.date).getYear()+1900)}
        })
        .rollup(function(d) {
            return d3.sum(d, function(g) {
                return g.distance*0.621371;
            });
        }).entries(rows);
    // console.log(nestedData2)
    return nestedData2;
}

function makePlot(bucket) {
    // console.log(rows)
    // console.log(bin());

    makeArrays(bin(bucket), bucket);
        console.log(dates, distance);
    var chart = c3.generate({
        data: {
            type: bucket=="Week" ? 'area' : 'area',
            x: 'x',
            columns: [
                distance,
                dates
            ],
        },
        tooltip: {
            format: {
                value: function (value) {
                    var format = d3.format(",.2f");
                    return format(value) + ' mi';
                },
            }
        },
        axis: {
            x: {
                type: 'timeseries',
                extent: bucket == "Week" ? [dates[24], dates[1]] : [dates[180], dates[1]],
                tick: {
                    fit: false,
                    format: '%m/%d/%y',
                    culling: {
                        max: window.innerWidth > 830 ? 36 : window.innerWidth >= 600 ? 14 : window.innerWidth < 500 ? 7 : 5
                    }
                    // count:10
                }
            }
        },
        onresized: function () {
            window.innerWidth > 830 ?
                chart.internal.config.axis_x_tick_culling_max = 36 : (window.innerWidth >= 600 ? chart.internal.config.axis_x_tick_culling_max = 14 : (window.innerWidth < 500 ? chart.internal.config.axis_x_tick_culling_max = 7 : (
                    chart.internal.config.axis_x_tick_culling_max = 5)));
        },
        subchart: { show: true },
        point: { show: false },
        legend: { position: 'inset' },
        zoom: { rescale: true },
    });

}
function change_bin(bucket) {
    // console.log(rows)
    //For the length of that time bucket (# categories), re-bucket data with "1" flag to
    //manually specifiy categories instead of pulling from current selection
    // for (var i=1, len=finalDataTotal[longest].length; i<len; i++) {
    //         bucketData(finalDataTotal[longest][i][0],1)
    // }

    //Finally re-plot using current time bucket selection
    console.log(bucket)
    makePlot(bucket);
};


function makeArrays(nestedData2, bucket) {
    // console.log(columns);
    dates=['x']
    distance=['Distance walked']
    console.log(nestedData2);
    for (var i = 0, len = nestedData2.length; i < len; i++) {
        // console.log(new Date(nestedData2[i].key))
        // console.log(new Date())
        // console.log(new Date(nestedData2[i].key) < new Date())
        oldDate = new Date(nestedData2[i].key),
        today = new Date();
        if ((oldDate < today) && (nestedData2[i].values!=0)) {
            dates.push(oldDate);
            if (bucket=="Week"){ distance.push(nestedData2[i].values/7); }
            else {distance.push(nestedData2[i].values);}
        }
        // }

        // console.log(distance)


        // cnsole.log(dates)
        // console.log(dates);
        // console.log(distance);

    }

}

// makeURL();
loadCSV();
