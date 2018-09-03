var tree = {
    ">=4METs": {
        "none/mild": {
            "no": {
                "1or2": {
                    "class": "alpha",
                    "day30": 52,
                    "day90": 20
                },
                "3or4": {
                    "class": "beta",
                    "day30": 80,
                    "day90": 10
                }
            },
            "yes": {
                "1or2": {
                    "class": "beta",
                    "day30": 80,
                    "day90": 10
                },
                "3or4": {
                    "class": "gamma",
                    "day30": 20,
                    "day90": 49
                }
            }
        },
        "mod/severe": {
            "no": {
                "1or2": {
                    "class": "beta",
                    "day30": 80,
                    "day90": 10
                },
                "3or4": {
                    "class": "gamma",
                    "day30": 20,
                    "day90": 49
                }
            },
            "yes": {
                "1or2": {
                    "class": "gamma",
                    "day30": 20,
                    "day90": 49
                },
                "3or4": {
                    "class": "delta",
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
                    "day30": 80,
                    "day90": 10
                },
                "3or4": {
                    "class": "gamma",
                    "day30": 20,
                    "day90": 49
                }
            },
            "yes": {
                "1or2": {
                    "class": "gamma",
                    "day30": 20,
                    "day90": 49
                },
                "3or4": {
                    "class": "delta",
                    "day30": 81,
                    "day90": 30
                }
            }
        },
        "mod/severe": {
            "no": {
                "1or2": {
                    "class": "gamma",
                    "day30": 20,
                    "day90": 49
                },
                "3or4": {
                    "class": "delta",
                    "day30": 81,
                    "day90": 30
                }
            },
            "yes": {
                "1or2": {
                    "class": "gamma",
                    "day30": 20,
                    "day90": 49
                },
                "3or4": {
                    "class": "delta",
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
        plotSurvival();
    }
}

function plotSurvival() {
    var data = ["survival", 10, 4, 12, 17, 4, 5, 6, 7, 8, 9]
    lowerbound = data.map(function(each) { return each*=.5})
    lowerbound[0] = "lowerbound"
    upperbound = data.map(function(each) { return each*.7})
    upperbound = upperbound.map(function(each, i) {return each+lowerbound[i]})
    upperbound[0] = "upperbound"
    var chart = c3.generate({
        data: {
            colors: {
                lowerbound: 'transparent',
            },
            columns: [
                lowerbound,
                upperbound,
                data
            ],
            type: 'bar',
            types: {
                survival: 'line'
            },
            groups: [
                ['lowerbound', 'upperbound']
            ],
            order: null
        },
        bar: {
            width: {
                ratio: 1,
            }
        },
    });
}
