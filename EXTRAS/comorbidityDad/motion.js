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
    var data = ["Survival", 10, 4, 12, 17, 4, 5, 6, 7, 8, 9]
    lowerbound = data.map(function(each, i) { return (i == 0) ? "lowerbound" : each*=.5})
    upperbound = data.map(function(each, i) { return (i == 0) ? "upperbound" : (lowerbound[i] + each*.5)})
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
                data,
                lowerbound,
                upperbound,
            ],
            type: 'bar',
            types: {
                Survival: 'line'
            },
            groups: [
                ['lowerbound', 'upperbound']
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
                label: 'Months since Treatment',
                padding: {
                    left: 0,
                    right: 0.05,
                },
                tick: {
                  culling: false,
                  outer: false,
                },
            },
            y: {
              label: 'Survival (%)',
              tick: {
                  count: 10,
                  format: function(d) {return parseInt(d).toFixed(0)}
              },
            }
        },
        legend: {
            hide: true
            //or hide: 'data1'
            //or hide: ['data1', 'data2']
        },
    });
}

function tooltip_contents(d, defaultTitleFormat, defaultValueFormat, color) {
    var $$ = this,
        config = $$.config,
        nameFormat = function(name) { return name; },
        text, i, title, value, name, bgcolor;

    for (i = 0; i < d.length; i++) {
        if (d[i].name === 'lowerbound') { continue; }
        if (!text) {
            // console.log(defaultTitleFormat(title))
            title = d[i].x + " months"
            text = "<table class='" + $$.CLASS.tooltip + "'><tr id='title'><th colspan='2'>" + title + "</th></tr>";
        }
        if (d[i].name === 'upperbound') {
            name = "Confidence"
            low = lowerbound[d[i].x+1].toFixed(0)
            high = (lowerbound[d[i].x+1]+upperbound[d[i].x+1]).toFixed(0)
            value = low + " - " + high + "%"
        } else {
            name = nameFormat(d[i].name);
            value = defaultValueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index) + "%";
        }

        text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
        text += "<td class='name'><span style='background-color:" + color(d[i].id) + "'></span>" + name + "</td>";
        text += "<td class='value'>" + value + "</td>";
        text += "</tr>";
    }
    return text + "</table>";
}
