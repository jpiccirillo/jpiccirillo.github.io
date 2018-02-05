jQuery.event.special.touchstart = {
  setup: function( _, ns, handle ){
    if ( ns.includes("noPreventDefault") ) {
      this.addEventListener("touchstart", handle, { passive: false });
    } else {
      this.addEventListener("touchstart", handle, { passive: true });
    }
  }
};

$(function() {
    $("#slider-vertical1").slider({
        orientation: "vertical",
        range: "min",
        min: 1,
        max: 101,
        value: parseInt($("#samplesize").val())+1,
        step: 1,
        create: function(event, ui) {
            setSliderTicks(event.target);
        },

        slide: function(event, ui) {
            // console.log("slider 1: " + ui.value)
            // console.log($("#slider-vertical1").slider("value"))
            if ($("#slider-vertical1").slider("value") < 3) {
                $("#samplesize").val(1);
            } else {
                $("#samplesize").val(ui.value-1);
                $(ui.value).val($('#samplesize').val());
                prepare()
                $(".console").text("Erasing console")
            }
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
        // slide: function(event, ui) {
        //
        //     console.log("slider 2: " + ui.value)
        //     $("#power").val(ui.value.toFixed(3));
        //     $(ui.value).val($('#power').val());
        //     $("#effectsize").val((1 - $("#power").val()).toFixed(3))
        //     $(".console").text("Erasing console")
        // }
    });
    $("#slider-vertical2").slider("disable");
});

$("#samplesize").change(function() {
    value = parseInt($("#samplesize").val())+1;
    $("#slider-vertical1").slider("value", value)
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
        power = $("#power").val(),
        zero = 0;
    if (samplesize > 100) {
        $("#samplesize").val("100")
        $(".console").text("Sample size cannot be greater than 100.")
    } else {
        $(".console").text("Valid values")
    }
    if (power < 1) {
        $("#power").val(parseFloat(power).toFixed(3))
        $("#effectsize").val((1 - power).toFixed(3))
    } else {
        one = 1;
        $("#power").val(one.toFixed(3))
        $("#effectsize").val(zero.toFixed(3))
        $(".console").text("Power cannot be greater than 1.0.")
    }

    if (!$.isNumeric(samplesize)) {
        $("#samplesize").val("100")
        $(".console").text("Sample size must be numeric.")
    }
    if (!$.isNumeric(power)) {
        num = .25;
        $("#power").val(num.toFixed(3))
        $(".console").text("Power must be numeric.")
    }
    prepare()
}
