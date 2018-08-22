// Spinning wheel to display while loading for slow connections
function startSpinningWheel() {
    setTimeout(prepare, 0);
}

// When tool loads for the first time, initialize screen size and prepare the
// containers.  
function prepare() {
    $("#loader").remove();
}
