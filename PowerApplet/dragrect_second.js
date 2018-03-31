$(function() {
    $("#slider-vertical1").slider({
        orientation: "vertical",
        range: "min",
        min: 1,
        max: 101,
        value: parseInt($("#samplesize").val()),
        step: 1,
        create: function(event, ui) {
            setSliderTicks(event.target);
        },

        slide: function(event, ui) {
            if (ui.value<2) {return}
            mu1 = internalmu1
            $("#samplesize").val(ui.value-1);
            n = ui.value-1;
            $(ui.value).val($('#samplesize').val());
            plot();
            calc = 1;
            $(".console").text("Erasing console")
        }
    });
    $(".ui-slider-range-min").css("background-color", "lightgrey");
});

$(function() {
    power = $("#power").val();
    $("#slider-vertical2").slider({
        orientation: "vertical",
        range: "min",
        min: 0.125,
        max: 1,
        value: .600,
        step: .001,

        slide: function(event, ui) {
            if (ui.value<.125) {return}
            mu1 = internalmu1
            power = $("#power").val();
            $("#power").val(ui.value)
            console.log(power)
            n = calcSampleSize();
            calc = 0;
            $("#samplesize").val(parseInt(n));
            $("#slider-vertical1").slider("value", n)
            plot();
        }
    })
});

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
        if (!$.isNumeric(mu0)) { mu0 = 100; $("#mu0").val(mu0) }
    }

    if (item=="mu1") { mu1 = parseInt($("#mu1").val());
        if (!$.isNumeric(mu1)) { mu1 = 115; $("#mu1").val(mu1) }
        $("#mu1").val(mu1)
        internalmu1 = mu1;
    }
    //Sigma Validation
    if (item=="sigma") { std = parseInt($("#stdev").val())
        if ((std<1) || !$.isNumeric(std)) { std=1; }
        $("#stdev").val(std)
    }
    //SampleSize Validation
    if (item=="samplesize") { n = parseInt($("#samplesize").val())
        console.log("got into sample size")
        if (n > 100) { n=100; }
        else if (n < 1) { n=1 }
        else if (!$.isNumeric(n)) { n = 25; }
        $("#samplesize").val(n)
    }
    //Alpha Error Validation
    if (item=="alpha") { alpha = parseFloat($("#alpha").val())
        if ((alpha<0.001)||!$.isNumeric(alpha)||(alpha>0.999)) {
            if (alpha < 0.001) { alpha=0.001 }
            else if (alpha > 0.999) { alpha=0.999 }
            else { alpha=0.05 };
        }
        $("#alpha").val(alpha.toFixed(3))
        // return;
    }

    if (item == "delta") { delta = parseInt($("#delta").val())
        if (!$.isNumeric(delta)) { //if delta is non-numeric, calculate it
            delta = ($("#mu1").val()-$("#mu0").val())/$("#stdev").val() }
        //Set and return delta in both conditions
        $("#delta").val(parseFloat(delta).toFixed(2));
    }

    //Power Validation
    if (item=="power") { power = parseFloat($("#power").val())
        if ((power>1)&&(power<=100)){ power/=100 }
        else if ((power<0.001)||(power>100)||(!$.isNumeric(power))) { power = 0.8 }
        $("#power").val(parseFloat(power).toFixed(3))
        $("#effectsize").val((1 - power).toFixed(3))
    }

    if (item!="mu1") { mu1 = internalmu1; }
    plot();
}
