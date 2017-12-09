var dates = ['x'],
    distance = ['Distance walked'],
    columns = new Array();

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
            columns = jsonData.columns;
        })
        .done(function() {
            makePlot();
        });
}

function makeArrays() {
    // console.log(columns);

    for (var i = 0, len = columns.date.length; i < len; i++) {
        if (columns.distance[i] != 0) {
            dates.push(columns.date[i]);
            distance.push(parseFloat(columns.distance[i]));
        }
        // console.log(columns.date[i])
    }
    console.log(dates);
    console.log(distance);

}

function makePlot() {
    makeArrays();
    var chart = c3.generate({
        data: {
            type: 'area',
            x: 'x',
            columns: [
                distance,
                dates
            ],
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m/%d/%y',
                    culling: false,
                    count:10
                }
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
    });

}

makeURL();
loadCSV();

// makeArrays();
