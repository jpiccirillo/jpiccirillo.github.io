function initVariables(){
    $(document).ready(function() {
        $('input.selector_left').css("background-color", "lightgrey");
    });
    $('input').click(function() {
        $(this).css('background', 'lightgrey');
        $(this).siblings().css('background', 'none');
    })
    dates = ['x'],
    distance = ['Distance'],
    rows = new Array(),
    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    loadCSV();
}

function makeURL() {
    var base = 'http://gsx2json.com/api?id=',
        key = '1flnZoRPq17SryqYN3xWC4AI4402DbO11_XHAF0c7Soo',
        integers = 'false',
        query = '2017-12-08',
        rows = 'false'

    url = base.concat(key, "&integers=", integers, "&columns=", rows);
    console.log("Loading from: ", url)
    return url;
}

function loadCSV() {
    //replace with 'url' when you're ready to call the data using a url again
    $.getJSON(makeURL(), function(jsonData) {
            rows = jsonData.rows;
        })
        .done(function() {
            makePlot("Day");
        });
}

Date.prototype.getWeek = function() {
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

function JFP_GetMonth(date) {
    date = new Date(date)
    var month_number = date.getMonth(),
        year = date.getFullYear(),
        month = new Date(year, month_number, 1)
    // console.log(month)
    return month
}

function convertDate(d) {
    var parts = d.toString().split(" "),
        months = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
        };
    return months[parts[1]] + "/" + parts[2] + "/" + parts[3].slice(-2);
};

function bin(bucket) {
    var nestedData2 = d3.nest()
        .key(function(d) {
            if (bucket == "Day") {
                return d.date.replace(/-/g, '\/').replace(/T.+/, '');
            } else if (bucket == "Week") {
                return getDateOfISOWeek(new Date(d.date).getWeek(), new Date(d.date).getYear() + 1900);
            } else {
                return JFP_GetMonth(d.date)
            }
        })
        .rollup(function(d) {
            return d3.sum(d, function(g) {
                return g.distance * 0.621371;
            });
        }).entries(rows);
    return nestedData2;
}

function makePlot(bucket) {

    makeArrays(bin(bucket), bucket);
    $("#loader").remove();
    $("#chart").css("display", "block");
    // console.log(dates, distance);
    var chart = c3.generate({
        data: {
            type: 'area',
            x: 'x',
            columns: [
                distance,
                dates
            ],
        },
        tooltip: {
            format: {
                title: function(x) {
                    if (bucket=='Month') {return monthNames[x.getMonth()] + " " + x.getFullYear()}
                    if (bucket=='Week') {return "Week of " + monthNames[x.getMonth()] + " " + convertDate(x).split('/')[1]}
                    else {return (monthNames[x.getMonth()] + " " + convertDate(x).split('/')[1] + ", " + x.getFullYear())};
                },
                value: function(value) {
                    var format = d3.format(",.2f");
                    return format(value) + ' mi';
                },
            }
        },
        axis: {
            x: {
                type: 'timeseries',
                extent: bucket == "Week" ? [dates[24], dates[1]] :
                    (bucket == "Day" ? [dates[180], dates[2]] : [dates[6], dates[1]]),
                tick: {
                    fit: false,
                    // culling: false,
                    format: '%m/%d/%y',
                    // culling: {
                    //     max: window.innerWidth > 830 ? 30 : window.innerWidth >= 600 ? 14 : window.innerWidth < 500 ? 7 : 5
                    // }
                    // count: bucket=="Week"?dates.length:Math.floor(dates.length/15)
                }
            },
            y: {
                    tick: {
                        format: function(x) {
                            return x + "mi"
                        }
                    },
                },
            },
        grid: {
            y: {
                lines: [{
                    value: 5,
                    text: '5mi goal',
                    class: 'grid800'
                }, ]
            }
        },

        subchart: {
            show: true
        },
        point: {
            show: false
        },
        legend: {
            position: 'inset'
        },
        zoom: {
            rescale: true
        },
        color: {
            pattern: chosenramp,
        }
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
    // console.log(bucket)
    makePlot(bucket);
}

function makeArrays(nestedData2, bucket) {
    console.log(nestedData2);
    dates = ['x']
    distance = ['Distance']
    for (var i = 0, len = nestedData2.length; i < len; i++) {
        oldDate = new Date(nestedData2[i].key),
            today = new Date();
        if ((oldDate < today) && (nestedData2[i].values != 0)) {
            dates.push(new Date(nestedData2[i].key));
            if (bucket == "Day") {
                distance.push(nestedData2[i].values);
            } else if (bucket == "Week") {
                distance.push(nestedData2[i].values / 7);
            } else if (bucket == "Month") {
                distance.push(nestedData2[i].values / 30);
            }
        }
    }
    // console.log(dates, distance);
}