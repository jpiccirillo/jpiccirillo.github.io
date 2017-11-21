d3.json("sample.json", function (data) {
    var modData = [];
    console.log(modData);

    data.results.forEach(function (d, i) {
        var item = ["param-" + d.param];
        d.val.forEach(function (j) {
            item.push(j);

        });
        modData.push(item);
    });

    var chart = c3.generate({
        data: {
            x: 'date',
            xFormat: '%Y-%m-%d %H:%M:%S',


            columns: modData,


            type: 'area-spline'
        }
    });

    setTimeout(function () {
        chart.resize();
    }, 0);
});