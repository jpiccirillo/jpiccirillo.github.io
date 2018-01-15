$(function() {
    $("#slider-vertical1").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 10,
        slide: function(event, ui) {
            console.log("slider 1: " + ui.value)
            $("#samplesize").val(ui.value);
            $(ui.value).val($('#samplesize').val());
            $(".console").text("Erasing console")
        }
    });
    $(".ui-slider-range-min").css("background-color", "pink");
});

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
        num=1;
        $("#power").val(num.toFixed(3))
        $(".console").text("Power must be numeric.")
    }
    if (power > 1) {
        num=1;
        $("#power").val(num.toFixed(3))
        $(".console").text("Power cannot be greater than 1.0.")
    }
    // else {
    //     $(".console").text("No values to display")
    // }
}
