var brush = [],
    day = 86400000, //day in miliseconds
    month = 2592000000, //month in miliseconds
    finalDataTotal = [],
    finalDatesTotal = [],
    binArray = ['Week', 'Date', 'Month'],
    parseDate = d3.time.format("%m/%d/%Y").parse,
    formatCount = d3.format(",.2f"),
    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    choicesarray = []

for (i in binArray) {
    finalDataTotal.push([binArray[i]])
    finalDatesTotal.push([binArray[i]])
}

menu = d3.select("#menu_choice").on("change", change_category);
bin_menu = d3.select("#bin").on("change", change_bin),
    change_zoom_menu = d3.select("#change_zoom").on("change", change_zoom)

d3.queue()
    //Beware that top name might change if you clear your downloads folder
    .defer(d3.csv, "transactions (14).csv")
    .defer(d3.csv, "NonMintTransactions.csv")
    .await(process_csvs);

function process_csvs(error, csv_data, early_csv_data) {
    csv_data.forEach(function (d) {
        d.Amount = +d.Amount
        d.Date = parseDate(d["Date"])
        console.log(d.Date)
        d.Week = getDateOfISOWeek(d.Date.getWeek(), (d.Date.getYear() + 1900).toString());
        d.Month = JFP_GetMonth(d.Date);
        d.Category = d.Category;
    });
    early_csv_data.forEach(function (d2) {
        d2.Amount = +d2.Amount
        d2.Date = parseDate(d2["Date"])
        d2.Week = getDateOfISOWeek(d2.Date.getWeek(), (d2.Date.getYear() + 1900).toString());
        d2.Month = JFP_GetMonth(d2.Date);
        d2.Category = d2.Category;
    });
    csv_data = csv_data.concat(early_csv_data)

    window.csv_data = csv_data

    for (var i = 0, len = csv_data.length; i < len; i++) {
        if (csv_data[i]["Transaction Type"] == 'debit') {
            csv_data[i].Multiplier = -1
        } else csv_data[i].Multiplier = 1;

        if (((csv_data[i].Category == 'Transfer') && (csv_data[i].Amount > 10))
            || (csv_data[i].Original == 'Credit Card Payment')
            || (csv_data[i]["Original Description"].indexOf("SRVC DES:AUTO") != -1)) {
            csv_data[i].Multiplier = 0 }
    };

    for (var i = 0, len = csv_data.length; i < len; i++) {
        //        console.log(csv_data[i].Date);
        normaldate = csv_data[i].Date
        to_miliseconds = Date.parse(normaldate);
        csv_data[i].DateMS = to_miliseconds
        var timestamp = new Date(csv_data[i].DateMS)
        csv_data[i].Date = timestamp;
        //        console.log(csv_data[i].Date);
    };

    var s = new Date(Math.min.apply(Math, csv_data.map(function (o) { return o.DateMS; }))),
        e = new Date(Math.max.apply(Math, csv_data.map(function (o) { return o.DateMS; }))),
        a = [],
        all_days = [],
        all_weeks = [],
        all_months = [];

    while (s < e) {
        m = JFP_GetMonth(s)
        w = getDateOfISOWeek(s.getWeek(), (s.getYear() + 1900).toString())
        d = convertDate(s)
        wd = convertDate(w)
        s = new Date(s.setDate(
            s.getDate() + 1
        ))
        a.push(d);
        all_weeks.push(wd);
        all_months.push(m)
    };

    for (var i = 0, len = a.length; i < len; i++) {
        all_days.push({
            Signed_Amount: 0,
            Date: a[i],
            Week: all_weeks[i],
            Month: all_months[i],
        })
    };

    window.a = a;
    window.d = d;
    window.e = e;
    window.all_days = all_days;
    window.all_months = all_months;
    bucketData(null, 0)
};

//  1) - detect which category and time series are selected currently, store in local variable
//  2) - bucket time series first to generate a time-array of summed days (or weeks / months)
//  3) - go through csv_data array and cherry pick values and put them in an intermediary array maybe?

//  The purpose of this function is to take the current user selection (category and time-division),
//  bucket the correct data from csv_data, and then add that bucketed data to finalDataDays[],
//  finalDataWeeks[], or finalDataMonths[].

function bucketData(category, replot) {
    var bucket = bin_menu.property("value");
        console.log(bin_menu)
    if (replot == 0) {category = menu.property("value")}

    //If switching bucket and categories already exist in other bucket, don't reparse everything
    if ((replot == 1) && checkDuplicates(category, bucket)) {return;}

    filled_days = [];
    for (var i = 0, len = csv_data.length; i < len; i++) {
        if (csv_data[i].Category == category) {
            filled_days.push({
                Signed_Amount: csv_data[i].Amount * csv_data[i].Multiplier,
                Date: convertDate(csv_data[i].Date),
                Category: csv_data[i].Category,
                Week: convertDate(csv_data[i].Week),
                Month: csv_data[i].Month
            })
        }
    };

    combined_unbinned_original = filled_days.concat(all_days);
    // console.log(combined_unbinned_original)
    bin_data2(combined_unbinned_original, bucket, category)
    modernDrawPlot(bucket);

    replot=0;
}

function bin_data2(combined_unbinned, bucket, category) {
    console.log(bucket)
    nestedData2 = d3.nest()
        .key(function (d) {
            return d[bucket];
        })
        .rollup(function (d) {
            return d3.sum(d, function (g) {
                return g.Signed_Amount;
            });
        })
        .entries(combined_unbinned);

    console.log(nestedData2);

    for (i in finalDatesTotal) {
        // if the correct date array has only one entry (the initial label)
        if ((finalDatesTotal[i][0] == bucket) && (finalDatesTotal[i].length < 2)) {
            for (var j = 0, len = nestedData2.length; j < len; j++) {
//                console.log('rewrote dates array');
                finalDatesTotal[i].push(Date.parse(nestedData2[j].key));
            }
        }
    }
    console.log(finalDatesTotal)
    // Sort Amount Array and Date arrays
    sorting(nestedData2, 'key');
    for (i in finalDatesTotal) {
        if (finalDatesTotal[i][0] == bucket) {
            finalDatesTotal[i].shift();
            finalDatesTotal[i].sort();
            finalDatesTotal[i].unshift(bucket);
        }
    }

    makeArray(bucket, category);
};

function makeArray(bucket, category) {
    Plot_Amount = [];

    for (var i = 0, len = nestedData2.length; i < len; i++) {
        Plot_Amount.push((nestedData2[i].values))
        Plot_Amount[i] = Math.abs(Plot_Amount[i])
    };

    Plot_Amount.slice(0, Plot_Amount.length);
    Plot_Amount.unshift(category);

    for (i in finalDataTotal) {
        if (finalDataTotal[i][0] == bucket) {
            //if first category to add, don't check for duplicates
            if (finalDataTotal[i].length == 1) {
                finalDataTotal[i].push(Plot_Amount);
            } else {
                var duplicate=false;
                for (var j = 1, len = finalDataTotal[i].length; j < len; j++) {
                    if (finalDataTotal[i][j][0] == category) {
                        duplicate=true;
                        break;
                    }
                }
                if (!duplicate) { finalDataTotal[i].push(Plot_Amount); }
            }
        }
    }
     console.log("Amounts: ", finalDataTotal);
}

function modernDrawPlot(bucket,rezoom) {
    //get relavent part of finalDataTotal[] based on current bucket selected
    var arrayToPlot = [],
        datesToPlot = ['x'],
        plottingArray = [],
        zoomdepth = change_zoom_menu.property("value");


    //Calculate relevant data and dates arrays for plotting
    for (i in finalDataTotal) {
        if (finalDataTotal[i][0] == bucket) {
            for (var j = 1, len = finalDataTotal[i].length; j < len; j++) {
                plottingArray.push(finalDataTotal[i][j]);
            }
            for (var j = 1, len =finalDatesTotal[i].length; j <len; j++) {
                datesToPlot.push(finalDatesTotal[i][j]);
            }
        }
    }
    last_month_extent = datesToPlot[datesToPlot.length-1];
//    brushOptions = [
//        [last_month_extent + day * 14 - zoomdepth, last_month_extent + day * 14];
//        [last_month_extent + day * 2 - zoomdepth, last_month_extent + day * 2];
//        [last_month_extent + day * 4 - zoomdepth, last_month_extent + day * 4];
//        [last_month_extent + day * 7 - zoomdepth, last_month_extent + day * 7];
//        [last_month_extent + day * 2 - zoomdepth, last_month_extent + day * 2];]

//We want it to enforce the special right-side brush formatting when:
//    - brush.length = 0 aka the plot is loading for the first time
//    - rezoom == 1 aka the "zoom to last X months" has been selected
//    - the current brush is in the next month as current (this has to go last in the conditions otherwise will be null pointer if page is first loading (since brush             doesn't exist yet).  This is for the condition where user rebins without changing the brush.

    var firstDate = new Date(brush[1]).getTime();
    var secondDate = new Date().getTime();

    if ((brush.length == 0) || (rezoom == 1) || (Math.abs((secondDate - firstDate) / day) < 42)) {
        if (bucket == 'Month') { brush = [last_month_extent + day * 14 - zoomdepth, last_month_extent + day * 14]
            if (zoomdepth==month*2) { brush = [last_month_extent + day * 2 - zoomdepth, last_month_extent + day * 2] }
            if (zoomdepth==month*4) { brush = [last_month_extent + day * 4 - zoomdepth, last_month_extent + day * 4] }
        }
        if (bucket == 'Week') { brush = [last_month_extent + day * 7 - zoomdepth, last_month_extent + day * 7] }
        if (bucket == 'Date') { brush = [last_month_extent + day * 2 - zoomdepth, last_month_extent + day * 2] }
        rezoom = 0;
    }

    plottingArray.push(datesToPlot);
    this.chart = c3.generate({
        data: {
            type: 'area',
            x: 'x',
            columns: plottingArray,
            xFormat: '%%m/%d/%y',
        },
        tooltip: {
            format: {
                title: function(x) {
                    if (bucket=='Month') {return monthNames[x.getMonth()] + " " + x.getFullYear()}
                    if (bucket=='Week') {return "Week of " + monthNames[x.getMonth()] + " " + convertDate(x).split('/')[1]}
                    else {return (monthNames[x.getMonth()] + " " + convertDate(x).split('/')[1] + ", " + x.getFullYear())};
                },
                value: function (value) {
                    var format = d3.format(",.2f");
                    return '$' + format(value);
                },
            }
        },
        axis: {
            x: {
                max: e,
                type: 'timeseries',
                extent: brush,
//                extent:
                tick: {
                    fit: false,
//                    culling: false,
                    format: function (x) {
                        var e = document.getElementById("bin");
                        var strUser = e.options[e.selectedIndex].value;
                        if (strUser == "Month") {
                            return monthNames[x.getMonth()] + " " + x.getFullYear()
                        }
                        if (convertDate(x).split('/')[2] < 17) {
                            return convertDate(x);
                        } else return convertDate(x).split('/')[0] + '/' + convertDate(x).split('/')[1];
                    }
                },
                                    rotate: 75,
                multiline: false,
            },
        },
        onresized: function () {
            window.innerWidth > 830 ?
                chart.internal.config.axis_x_tick_culling_max = 36 : (window.innerWidth >= 600 ? chart.internal.config.axis_x_tick_culling_max = 14 : (window.innerWidth < 500 ? chart.internal.config.axis_x_tick_culling_max = 7 : (
                    chart.internal.config.axis_x_tick_culling_max = 5)));
        },
        subchart: {
            show: true,
            size: {
                height: 40
            },
            onbrush: function (domain) {
//                console.log(domain);
                brush = domain;
            }
        },
        point: { show: false },
        legend: { position: 'inset' },
        zoom: { rescale: true },

    });
}

//function reloadChart(bucket) {
//    //    console.log("last domain of brush: ", brush);
//    var arrayToPlot = [],
//        datesToPlot = ['x'],
//        plottingArray = [];
//
//    for (i in finalDataTotal) {
//        if (finalDataTotal[i][0] == bucket) {
//            for (var j = 1, len = finalDataTotal[i].length; j < len; j++) {
//                plottingArray.push(finalDataTotal[i][j]);
//            }
//            for (var j = 1, len = finalDatesTotal[i].length; j < len; j++) {
//                datesToPlot.push(finalDatesTotal[i][j]);
//            }
//        }
//    }
//
//    plottingArray.push(datesToPlot);
//    setTimeout(function () {
//        bindto: "#chart"
//        this.chart.load({
//            columns: plottingArray
//        }, );
//    }, -1);
//}

function checkDuplicates(category,bucket) {
    for (i in finalDataTotal)
        if (finalDataTotal[i][0] == bucket) {
            for (j in finalDataTotal[i]) {
                if (finalDataTotal[i][j][0] == category) {
                    console.log("skipping: ", category, "- already exists in", bucket);
                    return true;
                }
            }
        }
}

function ClearPlot() {
    //Remove all except first category in each time bucket subdivision
    for(i in finalDataTotal) {
        for(var j=0, len=finalDataTotal[i].length-2; j<len;j++) {
            finalDataTotal[i].pop();
        }
    }
    //Reset menu option to first in dropdown list
    var element = document.getElementById('menu_choice');
    element.options[0].selected = true;

    //call replot so that c3.js can plot modified/reduced array using
    //currently selected bucket
    console.log(finalDataTotal);
    modernDrawPlot(bin_menu.property("value"));
};

function convertDate(d) {
    var parts = d.toString().split(" "),
        months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
    return months[parts[1]] + "/" + parts[2] + "/" + parts[3].slice(-2);
};

function change_category() {
    d3.transition().each(bucketData);
};

function change_bin() {
    var longest=0;

    //Find the time bucket that has the most categories added to it so far
    for (i in finalDataTotal) {
        if (finalDataTotal[i].length >= finalDataTotal[longest].length) { longest = i }
    }

    //For the length of that time bucket (# categories), re-bucket data with "1" flag to
    //manually specifiy categories instead of pulling from current selection
    for (var i=1, len=finalDataTotal[longest].length; i<len; i++) {
            bucketData(finalDataTotal[longest][i][0],1)
    }

    //Finally re-plot using current time bucket selection
    modernDrawPlot(bin_menu.property("value"));
};

function sorting(json_object, key_to_sort_by) {
    function sortByKey(a, b) {
        var x = Date.parse(a[key_to_sort_by]);
        var y = Date.parse(b[key_to_sort_by]);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }
    json_object.sort(sortByKey);
}

function change_zoom() {
    modernDrawPlot(bin_menu.property("value"),1);
};

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
    var month_number = date.getMonth(),
        year = date.getFullYear(),
        month = convertDate(new Date(year, month_number, 1))
    return month
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
