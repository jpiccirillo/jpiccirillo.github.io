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
            $("#samplesize").val(ui.value-1);
            // $("#delta").val("#mu1").val()-;
            $(ui.value).val($('#samplesize').val());
            prepare()
            $(".console").text("Erasing console")
        }
    });
    $(".ui-slider-range-min").css("background-color", "lightgrey");
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

$(function() {
    power = $("#power").val();
    $("#slider-vertical2").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 1,
        value: .600,
        step: .001
    });
    // $("#slider-vertical2").slider("disable");
});

$("#samplesize").change(function() {
    value = parseInt($("#samplesize").val())+1;
    $("#slider-vertical1").slider("value", value)
});

$("#power").change(function() {
    $("#slider-vertical2").slider("value", $(this).val())
});

function sample() {
    //code to sample goes here
}

function validate(item) {
    if (item=="mu") {
        //mu0/mu1 Validation
        var mu0 = $("#mu0").val(), mu1 = $("#mu1").val();
        if (!$.isNumeric(mu0)) {
            mu0 = 100;
            $("#mu0").val(mu0) }
        if (!$.isNumeric(mu1)) {
            mu1 = 115;
            $("#mu1").val(mu1) }
    }
    //Sigma Validation
    if (item=="sigma") {
        var sigma = $("#stdev").val()
        if ((sigma<1) || !$.isNumeric(sigma)) { sigma=1; }
        $("#stdev").val(sigma)
    }
    //SampleSize Validation
    if (item == "samplesize") {
        var n = $("#samplesize").val()
        if (n > 100) { n=100; }
        else if (n < 1) { n=1 }
        else if (!$.isNumeric(n)) { n = 25; }
        $("#samplesize").val(n)
    }
    //Alpha Error Validation
    if (item=="alpha") {
        var p = $("#alpha").val()
        if ((p<0.001)||!$.isNumeric(p)||(p>0.999)) {
            if (p < 0.001) { p=0.001 }
            else if (p > 0.999) { p=0.999 }
            else { p=0.05 };
        }
        $("#alpha").val(parseFloat(p).toFixed(3))
        normalcdf();
    }
    //Delta Validation
    if (item == "delta") {
        var delta = $("#delta").val()
        if (!$.isNumeric(delta)) { //if delta is non-numeric, calculate it
            delta = ($("#mu1").val()-$("#mu0").val())/$("#stdev").val() }
        //Set and return delta in both conditions
        $("#delta").val(parseFloat(delta).toFixed(2));
        return delta;
    }
    //Power Validation
    if (item=="power") {
        var power = $("#power").val()
        if ((power>1)&&(power<=100)){ power/=100 }
        else if ((power<0.001)||(power>100)||(!$.isNumeric(power))) { power = 0.8 }
        $("#power").val(parseFloat(power).toFixed(3))
        $("#effectsize").val((1 - power).toFixed(3))
    }
}
