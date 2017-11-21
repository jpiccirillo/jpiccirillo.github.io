var bins = {},
    parseDate = d3.time.format("%m/%d/%Y").parse,
    formatDate = d3.time.format("%m/%y"),
    formatCount = d3.format(",.2f"),
    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


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

function convertDate(d) {
    var parts = d.toString().split(" ");
    var months = {
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

d3.queue()
    .defer(d3.csv, "transactions%20(14).csv")
    .defer(d3.csv, "NonMintTransactions.csv")
    .await(process_csvs);

function process_csvs(error, csv_data, early_csv_data) {
    csv_data.forEach(function (d) {
        d.Amount = +d.Amount
        d.Date = parseDate(d["Date"])
        if (d["Account Name"] == "CREDIT CARD") {
            d.Date = new Date(Date.parse(d.Date) - 86400000 * 2)
        }
        d.Week = getDateOfISOWeek(d.Date.getWeek(), (d.Date.getYear() + 1900).toString());
        d.Month = JFP_GetMonth(d.Date)
    });
    early_csv_data.forEach(function (d2) {
        d2.Amount = +d2.Amount
            //                d2.OriginalDescription = d2["Original Description"]
            //                d2.Amount = +d2.Amount
            //                d2.TransactionType = d2["Transaction Type"]
        d2.Date = parseDate(d2["Date"])
        d2.Week = getDateOfISOWeek(d2.Date.getWeek(), (d2.Date.getYear() + 1900).toString());
        d2.Month = JFP_GetMonth(d2.Date)
    });
    csv_data = csv_data.concat(early_csv_data)

    window.csv_data = csv_data

    for (var i = 0, len = csv_data.length; i < len; i++) {
        if (csv_data[i]["Transaction Type"] == 'debit') {
            csv_data[i].Multiplier = -1
        }
        if (csv_data[i]["Transaction Type"] == 'credit') {
            csv_data[i].Multiplier = 1
        }
        if (csv_data[i]["Original Description"].indexOf("SRVC DES:AUTO") != -1) {
            csv_data[i].Multiplier = 0
        }
        if (csv_data[i].Original == 'Credit Card Payment') {
            csv_data[i].Multiplier = 0
        }
        if (((csv_data[i].Category == 'Investing') || csv_data[i].Category == 'Transfer') && (csv_data[i].Amount > 10)) {
            csv_data[i].Multiplier = 0
        }
    };

    for (var i = 0, len = csv_data.length; i < len; i++) {
        normaldate = csv_data[i].Date
        to_miliseconds = Date.parse(normaldate);
        csv_data[i].DateMS = to_miliseconds

        var timestamp = new Date(csv_data[i].DateMS)
        csv_data[i].Date = timestamp;
    };

    var s = new Date(Math.min.apply(Math, csv_data.map(function (o) {
        return o.DateMS;
    })));

    var e = new Date(Math.max.apply(Math, csv_data.map(function (o) {
        return o.DateMS;
    })));

    var a = [];
    var all_weeks = [];
    var all_months = [];

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

    var all_days = [];
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
    selectCatagory()
};

var menu = d3.select("#menu_choice")
    .on("change", change_category);

var menu_comparison = d3.select("#comparison_choice")
    .on("change", change_comparison_category);

var bin_menu = d3.select("#bin")
    .on("change", change_bin);

var change_zoom_menu = d3.select("#change_zoom")
    .on("change", change_zoom);

d3.select(window)
    .on("keydown", function () {
        altKey = d3.event.altKey;
    })
    .on("keyup", function () {
        altKey = false;
    });

var altKey;
var category_count = 0;
var comparison_category_count = 0;
var rebin_count = 0;
var zoom_count = 0;

function change_category() {
    category_count = category_count + 1
    console.log("Categories have been changed: ", category_count, "times")
    d3.transition()
        .each(selectCatagory);
};

function change_comparison_category() {
    comparison_category_count = comparison_category_count + 1
    console.log("Comparison categories have been changed: ", comparison_category_count, "times")
    d3.transition()
        .each(selectComparisonCatagory);
};

function change_bin() {
    rebin_count = rebin_count + 1
    console.log("Bins have been changed: ", rebin_count, "times")
    bin_data(combined_unbinned_original)
    d3.transition()
        .each(selectComparisonCatagory);
};

function change_zoom() {
    zoom_count = zoom_count + 1
    console.log("Zoom has been changed: ", zoom_count, "times")
    bin_data(combined_unbinned_original);
    d3.transition()
        .each(selectComparisonCatagory);
};

var altKey;

//            The general idea is, when a new category is chosen from the selector (generates a new choice, runs selectCatagory again, then runs replot), selectCatagory needs to create a new combined_unbinned which is specific to the choice (give it a dynamic name based on the choice selected), then feed that to nestedData and create a new nestedData array with a name that is specific to the most recent choice selected. This will then be fed into replot, which will create one new array (Plot_Amount), with the choice appended, do the unshift/slice stuff to prepare it for c3 to plot, then load it into the plot.  The big problem here is creating dynamic names for all the elements of the parsing/plotting process 
//            
////       Arrays that will need dynamic names so far that I can see: 
//            combined_unbinned_(whatever was chosen)
//            nestedData_(whatever was chosen)
//            Plot_Amount_(whatever was chosen)
// Process: 
//      User selects new choice from dropdown menu
//       - triggers "change" FUNCTION
//           - change FUNCTION starts selectCatagory FUNCTION
//              - selectCatagory FUNCTION runs through the csv_data and cherrypicks the entries belonging to category = choice that user has chosen
//              - creates array named "combined_unbinned_(whatever was chosen)", has all tx's with category = choice + all days for range of dataset
//              - triggers "nestedData" FUNCTION
//                          - nestedData FUNCTION sums by whatever time range user wants
//                          - generates "nestedData_(whatever was chosen)", has category = choice data binned data by bin 
//                          - nestedData calls drawplot FUNCTION if first time plotting, calls replot FUNCTION if 2nd or later time plotting 
//               - change FUNCTION then calls replot FUNCTION, feeds off array named nestedData_(whatever was chosen) and variable choice 
//                   - Plot_Amount_(whatever was chosen) is created from nestedData_(whatever was chosen) using push method
//                   - Plot_Amount_(whatever was chosen) is modified to have first element be variable choice 
//                   - chart.load with Plot_Amount

var choicesarray = [];
window.choicesarray = choicesarray
console.log(choicesarray);


function selectComparisonCatagory() {
    //            var choicesarray = [choice];
    var t = 1 //set t = 1 if want new datasets
    filled_days = [];
    //CONSTRUCT ARRAY OF DATE AND AMOUNT OBJECT
    var comparison_choice = menu_comparison.property("value");
    window.comparison_choice = comparison_choice
    window["combined_unbinned" + comparison_choice] = [];
    console.log("Comparison Choice: ", comparison_choice)
    for (var i = 0, len = csv_data.length; i < len; i++) {
        if (csv_data[i].Category == comparison_choice) {
            filled_days.push({
                Signed_Amount: csv_data[i].Amount * csv_data[i].Multiplier,
                Date: convertDate(csv_data[i].Date),
                Category: csv_data[i].Category,
                Week: convertDate(csv_data[i].Week),
                Month: csv_data[i].Month
            })
        }
    }
    window["combined_unbinned" + comparison_choice] = filled_days.concat(all_days);
    if (comparison_choice != choice) {
        choicesarray.push(comparison_choice)
    }
    //            console.log(window["combined_unbinned" + comparison_choice])
    console.log("total array of choices: ", choicesarray)
    bin_data(window["combined_unbinned" + comparison_choice], t)
};

function selectCatagory() {
    //    var choicesarray = [];
    var t = 2 //set t = 2 if overwrite plot 
    filled_days = [];
    //CONSTRUCT ARRAY OF DATE AND AMOUNT OBJECT
    var choice = menu.property("value");
    window.choice = choice
    console.log("Choice: ", choice)
    for (var i = 0, len = csv_data.length; i < len; i++) {
        if (csv_data[i].Category == choice) {
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
    choicesarray.push(choice)
    window.choicesarray = choicesarray
        //    console.log(choicesarray)
    bin_data(combined_unbinned_original, t)
}

function bin_data(combined_unbinned, t) {
    var sel = bin_menu.property("value");
    nestedData = d3.nest()
        .key(function (d) {
            return d[sel];
        })
        .rollup(function (d) {
            return d3.sum(d, function (g) {
                return g.Signed_Amount;
            });
        }).entries(combined_unbinned);

    for (var i = 0, len = nestedData.length; i < len; i++) {
        nestedData[i].Date = Date.parse(nestedData[i].key)
    }
    //    window.nestedData = nestedData

    if (t == 1) {
        replot(nestedData)
        var t = 0 //set t back to zero
    } else {
        drawplot(nestedData)
        var t = 0 //set t back to zero
    }
};

function drawplot(nestedData) {
    console.log(nestedData);
    var choice = menu.property("value"),
        sel2 = change_zoom_menu.property("value"),
        last_month_extent = Math.max.apply(Math, nestedData.map(function (o) {
            return o.Date;
        })),
        Plot_Date = [],
        Plot_Amount = [];

    for (var i = 0, len = nestedData.length; i < len; i++) {
        Plot_Date.push(nestedData[i].Date)
        Plot_Amount.push((nestedData[i].values))
        Plot_Amount[i] = Math.abs(Plot_Amount[i])
    };

    Plot_Amount.slice(0, Plot_Amount.length);
    Plot_Amount.unshift(choice);
    Plot_Date.slice(0, Plot_Date.length);
    Plot_Date.unshift('x');

    var chart = c3.generate({
        data: {
            type: 'area',
            x: 'x',
            columns: [
            Plot_Amount,
            Plot_Date
        ],
            xFormat: '%%m/%d/%y',
        },
        tooltip: {
            format: {
                value: function (value) {
                    var format = d3.format(".2f");
                    return '$' + format(value);
                },
            }
        },
        axis: {
            x: {
                max: e,
                type: 'timeseries',
                extent: [last_month_extent - [sel2], last_month_extent + ([sel2] / 2592000000 * 86400000)],
                tick: {
                    fit: false,
                    //                                            format: Plot_Date 'data1' ? '%m/%d' : '%m/%d/%y';
                    format: function (x) {
                        var e = document.getElementById("bin");
                        var strUser = e.options[e.selectedIndex].value;
                        //                        console.log(monthNames[x.getMonth()] + " " + x.getFullYear());
                        if (strUser == "Month") {
                            return monthNames[x.getMonth()] + " " + x.getFullYear()
                        }
                        if (convertDate(x).split('/')[2] < 17) {
                            return convertDate(x);
                        } else return convertDate(x).split('/')[0] + '/' + convertDate(x).split('/')[1];
                    }
                },
                //                    rotate: 75,
                multiline: false,
                //                culling: {
                //                    max: window.innerWidth > 830 ? 36 : window.innerWidth > 700 ? 10 : window.innerWidth > 500 ? 7 : 5
                //                }
            },
        },

        subchart: {
            show: true,
            size: {
                height: 40
            }
        },
        point: {
            show: false
        },
        legend: {
            position: 'inset'
        },
        //        onresized: function () {
        //            window.innerWidth > 830 ?
        //                chart.internal.config.axis_x_tick_culling_max = 36 : (window.innerWidth > 700 ? chart.internal.config.axis_x_tick_culling_max = 10 : (window.innerWidth > 500 ? chart.internal.config.axis_x_tick_culling_max = 7 : (
        //                    chart.internal.config.axis_x_tick_culling_max = 2)));
        //        },
        zoom: {
            //            enabled: true,
            rescale: true
        },

    });
    window.chart = chart
};

function replot(nestedData) {
    var comparison_choice = menu_comparison.property("value")
    var sel2 = change_zoom_menu.property("value")
    var last_month_extent = Math.max.apply(Math, nestedData.map(function (o) {
        return o.Date;
    }));

    var Plot_Amount = [];
    var Plot_Date = [];

    for (var i = 0, len = nestedData.length; i < len; i++) {
        Plot_Date.push(nestedData[i].Date)
        Plot_Amount.push(nestedData[i].values)
        Plot_Amount[i] = Math.abs(Plot_Amount[i])
    };

    Plot_Amount = Plot_Amount.slice(0, Plot_Amount.length);
    Plot_Date = Plot_Date.slice(0, Plot_Date.length);

    // Add the name of the column to the front of the array.
    Plot_Amount.unshift(comparison_choice);
    Plot_Date.unshift('x');

    //            console.log(Plot_Amount)
    setTimeout(function () {
        bindto: "#chart"
        chart.load({
            columns: [
                        Plot_Amount,
                        Plot_Date
        ],
        });
    }, 1);
};

function ClearPlot() {
    len = choicesarray.length
    len = +len
    if (len > 1) {
        chart.unload({
            ids: choicesarray.slice(1, choicesarray.length)
        })
    };
    choicesarray = choicesarray[0];
    choicesarray = choicesarray.split()
    console.log("after clearing, choices array = ", choicesarray)
    window.choicesarray = choicesarray
};