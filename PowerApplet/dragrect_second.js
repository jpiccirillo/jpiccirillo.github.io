$(function() {
    $("#slider-vertical1").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: parseInt($("#samplesize").val()),
        step: 1,
        create: function(event, ui) {
            setSliderTicks(event.target);
        },

        slide: function(event, ui) {
            if (ui.value<1) { return false; }
            mu1 = internalmu1
            $("#samplesize").val(ui.value);
            n = ui.value;
            $(ui.value).val($('#samplesize').val());
            plot();
        }
    });
    $(".ui-slider-range-min").css("background-color", "lightgrey");
});

$(function() {
    power = $("#power").val();
    $("#slider-vertical2").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 1,
        value: .600,
        step: .001,

        slide: function(event, ui) {
            if (testPower(internalmu1) <= .05 || ui.value<0) {
                $(".console").text("To increase power, change another parameter.");
                return false
            }

            mu1 = internalmu1
            needCalcPower = 1;
            power = ui.value
            temp = calcSampleSize();

            if (temp>100 || temp<1 || power < alpha) {
                $(".console").text("Smallest sample size is 1.");
                console.log("TestSampleSize: ", temp, "Power: ", power, "->SHOULD BE LOCKED")
                return false;
            }
            console.log(testPower(internalmu1))
            n = temp;
            $("#power").val(ui.value);
            $("#samplesize").val(Math.round(n));
            $("#slider-vertical1").slider("value", n)
            plot();
        }
    })
});

function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n) && !isNaN(+n); }

function setSliderTicks(el) {
    var $slider = $(el);
    $slider.find('.ui-slider-tick-mark').remove();
    for (var i = 1; i < 20; i++) {
        if (i * 5 % 25 == 0) { //major ticks at 25,50,75 (% to find integrs divisible by 25)
            $('<span class="ui-slider-tick-mark_large"></span>').css('bottom', (i * 5 - 2) + '%').appendTo(".shell");
        } else {
            $('<span class="ui-slider-tick-mark"></span>').css('bottom', (i * 5 - 1) + '%').appendTo(".shell");
        }
    }
}

function validate(item) {
    if (item=="mu0") { mu0 = parseInt($("#mu0").val())
        if (!isNumeric(mu0)) { mu0 = 100; $("#mu0").val(mu0) }
    }
    else if (item=="mu1") { mu1 = parseInt($("#mu1").val());
        if (!isNumeric(mu1)) { calcMu(); } // if mu invalid, calculate from delta
        else { calcDelta();}
    }
    //Sigma Validation
    else if (item=="sigma") { std = $("#stdev").val()
        // if std invalid, calculate from delta/mu0/mu1
        if (std<1) { std=1; $("#stdev").val(std) }
        if (!isNumeric(std)) { calcStd(); }
        else {calcDelta();}
    }
    //SampleSize Validation
    else if (item=="samplesize") { n = parseInt($("#samplesize").val())
        if (n > 100) { n=100; }
        else if (n < 1) { n=1 }
        else if (!isNumeric(n)) { n = 25; }
        $("#samplesize").val(n)
        $("#slider-vertical1").slider("value", n)
    }
    //Alpha Error Validation
    else if (item=="alpha") { alpha = $("#alpha").val()
        if ((alpha<0.001)||!isNumeric(alpha)||(alpha>0.999)) {
            if (alpha < 0.001) { alpha=0.001 }
            else if (alpha > 0.999) { alpha=0.999 }
            else { alpha=0.05 };
        }
        $("#alpha").val(parseFloat(alpha).toFixed(3))
    }
    //Delta validation
    else if (item=="delta") { delta = $("#delta").val()
        if (!isNumeric(delta)) {calcDelta();} //If delta is non-numeric, calculate it
        else { calcMu();} // Else it's valid and calculate mu1 based on it
    }
    //Power Validation
    else if (item=="power") { power = parseFloat($("#power").val())
        if ((power>1)&&(power<=100)){ power/=100 }
        else if ((power<0.001)||(power>100)||(!isNumeric(power))) { power = 0.8 }
        needCalcPower = 0;
        $("#power").val(power.toFixed(3))
        $("#effectsize").val((1 - power).toFixed(3))
        $("#slider-vertical2").slider("value", power)
    }

    if (item=="mu1"||item=="delta") { internalmu1 = mu1; }
    else {mu1 = internalmu1;}
    if (item!="power" && item!="sigma") { needCalcPower = 1;}
    plot();
}
