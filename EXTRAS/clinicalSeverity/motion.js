// Plotting confidence intervals as stacked bar chart idea
// inspired from: https://jsfiddle.net/uphokkax/31/
// Custom tooltip code from http://jsfiddle.net/7kYJu/186/
colors = {
    0: { "opaque": [218, 247, 166], "alpha": [218, 247, 166, .25]},
    1: { "opaque": [255, 195, 0], "alpha": [255, 245, 217]},
    2: { "opaque": [255, 87, 51], "alpha": [255, 87, 51, 0.25]},
    3: { "opaque": [199, 0, 57], "alpha": [199, 0, 57, 0.25]  }
}

var tree = {
    ">=4METs": {
        "none/mild": {
            "no": {
                "1or2": {
                    "class": "alpha",
                    "number": 0,
                    "day30": 52,
                    "day90": 20
                },
                "3or4": {
                    "class": "beta",
                    "number": 1,
                    "day30": 80,
                    "day90": 10
                }
            },
            "yes": {
                "1or2": {
                    "class": "beta",
                    "number": 1,
                    "day30": 80,
                    "day90": 10
                },
                "3or4": {
                    "class": "gamma",
                    "number": 2,
                    "day30": 20,
                    "day90": 49
                }
            }
        },
        "mod/severe": {
            "no": {
                "1or2": {
                    "class": "beta",
                    "number": 1,
                    "day30": 80,
                    "day90": 10
                },
                "3or4": {
                    "class": "gamma",
                    "number": 2,
                    "day30": 20,
                    "day90": 49
                }
            },
            "yes": {
                "1or2": {
                    "class": "gamma",
                    "number": 2,
                    "day30": 20,
                    "day90": 49
                },
                "3or4": {
                    "class": "delta",
                    "number": 3,
                    "day30": 81,
                    "day90": 30
                }
            }
        }
    },
    "<4METs": {
        "none/mild": {
            "no": {
                "1or2": {
                    "class": "beta",
                    "number": 1,
                    "day30": 80,
                    "day90": 10
                },
                "3or4": {
                    "class": "gamma",
                    "number": 2,
                    "day30": 20,
                    "day90": 49
                }
            },
            "yes": {
                "1or2": {
                    "class": "gamma",
                    "number": 2,
                    "day30": 20,
                    "day90": 49
                },
                "3or4": {
                    "class": "delta",
                    "number": 3,
                    "day30": 81,
                    "day90": 30
                }
            }
        },
        "mod/severe": {
            "no": {
                "1or2": {
                    "class": "gamma",
                    "number": 2,
                    "day30": 20,
                    "day90": 49
                },
                "3or4": {
                    "class": "delta",
                    "number": 3,
                    "day30": 81,
                    "day90": 30
                }
            },
            "yes": {
                "1or2": {
                    "class": "gamma",
                    "number": 2,
                    "day30": 20,
                    "day90": 49
                },
                "3or4": {
                    "class": "delta",
                    "number": 3,
                    "day30": 81,
                    "day90": 30
                }
            }
        }
    }
}

function startSpinningWheel() {
    setTimeout(prepare, 0);
}

// When tool loads for the first time, initialize screen size and prepare the
// containers.
function prepare() {
    $("#loader").remove();
    $('select[class="input"]').change(function() {
        if ($(this).val() != "2") {
            checkIfComplete()
        }
    })
}

function checkIfComplete() {
    // arr for input array
    var arr = [];
    $('.input').each(function(i, input) {
        //quit if a dropdown not filled out
        if (!$(input).val()) { return false;  }
        //else add into result array
        else { arr.push($(input).val()); }
    });
    console.log(arr)
    if (arr.length == 4) {
        //index into var tree to see what resulting severity is
        severity = tree[arr[0]][arr[1]][arr[2]][arr[3]];
        //Set title section to 1st letter (upper), rest left alone
        console.log(severity)
        $(".severity span").text(severity.class[0].toUpperCase()+severity.class.slice(1))
        $("#day30 span").text(severity.day30 + "%")
        $("#day90 span").text(severity.day90 + "%")
        plotSurvival(severity.number);
    }
}

function plotSurvival(stage) {
    window.stage = stage;
    window.data = {
        0: [
            ["Survival", 0.975, 0.943, 0.943, 0.9, 0.9],
            ["lowerbound", 0.941, 0.888, 0.888, 0.803, 0.803],
            ["upperbound", 1, 0.998, 0.998, 0.9974, 0.9974],
            ["difference", 0.059, 0.11, 0.11, 0.1944, 0.1944],
            {max: 1, min: .75}
        ],
        1: [
            ["Survival", 0.958, 0.9, 0.814, 0.786, 0.75],
            ["lowerbound", 0.931, 0.856, 0.747, 0.711, 0.651],
            ["upperbound", 0.85, 0.943, 0.881, 0.861, 0.849],
            ["difference", 0.05399, 0.087, 0.134, 0.15, 0.198],
            {max: 1, min: .5}
        ],
        2: [
            ["Survival", 0.868, 0.724, 0.642, 0.602, 0.602],
            ["lowerbound", 0.818, 0.655, 0.562, 0.508, 0.508],
            ["upperbound", 0.917, 0.793, 0.721, 0.696, 0.696],
            ["difference", 0.0990, 0.138, 0.159, 0.188, 0.188],
            {max: 1, min: .25}
        ],
        3: [
            ["Survival", 0.781, 0.643, 0.475, 0.362, 0.362],
            ["lowerbound", 0.684, 0.52, 0.326, 0.183, 0.183],
            ["upperbound", 0.877, 0.766, 0.624, 0.54, 0.54],
            ["difference", 0.193, 0.246, 0.298, 0.357, 0.357],
            {max: 1, min: 0}
        ]
    }

    // var data = ["Survival", 10, 4, 12, 17, 4, 5, 6, 7, 8, 9]
    // lowerbound = data.map(function(each, i) { return (i == 0) ? "lowerbound" : each*=.5})
    // upperbound = data.map(function(each, i) { return (i == 0) ? "upperbound" : (lowerbound[i] + each*.5)})
    // console.log(lowerbound, upperbound)
    var chart = c3.generate({
        size: {
          height: 125
        },
        padding: {
          left: 30,
          bottom: -20,
        },
        data: {
            columns: [
                data[stage][0],
                data[stage][1],
                data[stage][3]
            ],
            type: 'area-spline',
            types: {
                Survival: 'spline'
            },
            groups: [
                ['lowerbound', 'difference']
            ],
            order: null
        },
        color: {
            pattern: ['rgba(' + colors[stage].opaque + ')', 'rgb(0,0,0,0)', 'rgba(' + colors[stage].alpha + ')']
        },
        bar: {
            width: {
                ratio: 1.2,
            }
        },
        tooltip: {
                contents: tooltip_contents
        },
        axis: {
            x: {
                label: 'Years',
                padding: {
                    left: .2,
                    right: 0.05,
                },
                tick: {
                  culling: false,
                  outer: false,
                  format: function(d) { return d + 1; }
                },
            },
            y: {
              label: 'Survival',
              padding: {top: 0, bottom: 0},
              tick: {
                  count: 8,
                  format: function(d) {return d.toFixed(2)}
              },
              max: data[stage][4].max,
              min: data[stage][4].min,
            }
        },
        legend: { hide: true },
    });
}

function tooltip_contents(d, defaultTitleFormat, defaultValueFormat, color) {
    console.log(stage)
    console.log(data)
    var $$ = this,
        config = $$.config,
        nameFormat = function(name) { return name; },
        text, i, title, value, name, bgcolor;

    d.forEach(function(val, i) {
        console.log(val)
        if (val.name === 'lowerbound') { return; }
        if (!text) {
            title = (val.x+1>1) ? val.x+1 + " years" : val.x+1 + " year";
            text = "<table class='" + $$.CLASS.tooltip + "'><tr id='title'><th colspan='2'>" + title + "</th></tr>";
        }
        if (val.name === 'difference') {
            name = "Confidence"
            low = data[stage][1][val.x+1].toFixed(3)
            high = data[stage][2][val.x+1].toFixed(3)
            value = low + " - " + high
        } else {
            name = nameFormat(val.name);
            value = val.value.toFixed(3);
        }

        text += "<tr class='" + $$.CLASS.tooltipName + "-" + val.id + "'>";
        text += "<td class='name'><span style='background-color:" + color(val.id) + "'></span>" + name + "</td>";
        text += "<td class='value'>" + value + "</td>";
        text += "</tr>";
    })
    return text + "</table>";
}
