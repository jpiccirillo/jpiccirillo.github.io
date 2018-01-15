$(function() {
    $("#slider-vertical1").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 10,
        create: function(event, ui) {
            setSliderTicks(event.target);
        },

        slide: function(event, ui) {
            console.log("slider 1: " + ui.value)
            $("#samplesize").val(ui.value);
            $(ui.value).val($('#samplesize').val());
            $(".console").text("Erasing console")
        }
    });
    $(".ui-slider-range-min").css("background-color", "pink");
});

function setSliderTicks(el) {
    var $slider = $(el);
    var max = $slider.slider("option", "max");
    var min = $slider.slider("option", "min");
    var spacing = 100 / (max - min);

    $slider.find('.ui-slider-tick-mark').remove();
    for (var i = 1; i < 100; i += 5) {
        if (i != 96) { //create all ticks but the last one
            if ((i == 21) || (i==46) || (i==71)) {
                $('<span class="ui-slider-tick-mark_large"></span>').css('bottom', (i + 1) + '%').appendTo(".shell");
            } else {
                $('<span class="ui-slider-tick-mark"></span>').css('bottom', (i + 2) + '%').appendTo(".shell");
            }
        }
        // for (var i = 0; i < 100; i++) {
        //     $('<span class="ui-slider-tick-mark_large"></span>').css('top', (i) + '%').appendTo(".shell");
        // }
    }
}

$(function() {
    $("#slider-vertical2").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 1,
        value: .600,
        step: .001,
        slide: function(event, ui) {
            console.log("slider 2: " + ui.value)
            $("#power").val(ui.value.toFixed(3));
            $(ui.value).val($('#power').val());
            $(".console").text("Erasing console")
        }
    });
});

$("#samplesize").change(function() {
    $("#slider-vertical1").slider("value", $(this).val())
});

$("#power").change(function() {
    $("#slider-vertical2").slider("value", $(this).val())
});

function sample() {
    console.log("Code to sample goes here:")
    var random = Math.floor(Math.random() * (30 - 10 + 1) + 10);
    var random2 = Math.floor(Math.random() * (30 - 10 + 1) + 10);
    $("#mu0").val(random)
    $("#mu1").val(random2)
}

function validate(e) {
    var samplesize = $("#samplesize").val(),
        power = $("#power").val()

    if (samplesize > 100) {
        $("#samplesize").val("100")
        $(".console").text("Sample size cannot be greater than 100.")
    } else {
        $(".console").text("Valid values")
    }
    if (!$.isNumeric(samplesize)) {
        $("#samplesize").val("100")
        $(".console").text("Sample size must be numeric.")
    }
    if (!$.isNumeric(power)) {
        num = 1;
        $("#power").val(num.toFixed(3))
        $(".console").text("Power must be numeric.")
    }
    if (power > 1) {
        num = 1;
        $("#power").val(num.toFixed(3))
        $(".console").text("Power cannot be greater than 1.0.")
    }
    // else {
    //     $(".console").text("No values to display")
    // }
}
