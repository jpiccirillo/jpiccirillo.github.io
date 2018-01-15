$(function() {
    $("#slider-vertical1").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 10,
        step: 5,

        slide: function(event, ui) {
            console.log(ui.value)
        }
    });
    $(".ui-slider-range-min").css("background-color", "lightblue");
});

$(function() {
    $("#slider-vertical2").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 20,
        step: 5,
        slide: function(event, ui) {
            console.log(ui.value)
        }
    });
});
