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
        value: .6,
        step: .1,
        slide: function(event, ui) {
            console.log("slider 2: " + ui.value)
            $("#power").val(ui.value);
            $(ui.value).val($('#power').val());
            $(".console").text("")
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
    // console.log(e.target.id)
    var samplesize = $("#samplesize").val(),
        power = $("#power").val()

    if (samplesize > 100) {
        $("#samplesize").val("100")
        $(".console").text("Sample size cannot be greater than 100.")
    }
    if (power > 1) {
        $("#power").val("1.0")
        $(".console").text("Power cannot be greater than 1.0.")
    }
}
