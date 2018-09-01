// Spinning wheel to display while loading for slow connections
var tree = {
    ">=4METs": {
        "none/mild": {
            "no": {
                "1or2": "alpha",
                "3or4": "beta"
            },
            "yes": {
                "1or2": "beta",
                "3or4": "gamma"
            }
        },
        "mod/severe": {
            "no": {
                "1or2": "beta",
                "3or4": "gamma"
            },
            "yes": {
                "1or2": "gamma",
                "3or4": "delta"
            }
        }
    },
    "<4METs": {
        "none/mild": {
            "no": {
                "1or2": "beta",
                "3or4": "gamma"
            },
            "yes": {
                "1or2": "gamma",
                "3or4": "delta"
            }
        },
        "mod/severe": {
            "no": {
                "1or2": "gamma",
                "3or4": "delta"
            },
            "yes": {
                "1or2": "gamma",
                "3or4": "delta"
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
        var severity = tree[arr[0]][arr[1]][arr[2]][arr[3]];
        //Append into title section with first letter upper, rest left alone
        $(".severity span").text(severity[0].toUpperCase()+severity.slice(1))
    }
}
