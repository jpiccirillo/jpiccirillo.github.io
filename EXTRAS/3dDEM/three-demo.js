// Width and height of the browser window
var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;

// Width and height of the surface we're going to create
var WORLD_WIDTH = 2000;
var WORLD_HEIGHT = 1900;

// Where our lights and cameras will go
var scene = new THREE.Scene();

// Keeps track of time
var clock = new THREE.Clock();

// How we will see the scene
var camera = new THREE.PerspectiveCamera(75, WINDOW_WIDTH / WINDOW_HEIGHT, 1, 5000);

// Position the camera slightly above and in front of the scene
camera.position.set(0, -199, 75);
camera.up = new THREE.Vector3(0,0,1);

// Look at the center of the scene
camera.lookAt(scene.position);

// Think of the renderer as the engine that drives the scene
var renderer = new THREE.WebGLRenderer({antialias: true});

// Set the pixel ratio of the screen (for high DPI screens)
// This line is actually really important. Otherwise you'll have lots of weird bugs and a generally bad time.
renderer.setPixelRatio(window.devicePixelRatio);

// Set the background of the scene to a orange/red
renderer.setClearColor(0xffd4a6);

// Set renderer to the size of the window
renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

// Append the renderer to the DOM
document.body.appendChild(renderer.domElement);

// Apply VR stereo rendering to renderer
var effect = new THREE.VREffect(renderer);
effect.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

// Create a VR manager helper to enter and exit VR mode
var manager = new WebVRManager(renderer, effect);

// Render loop
// This should go at the bottom of the script.
function render() {

    // We'll add more up here later

    // Call the render function again
    requestAnimationFrame( render );

    // Update the scene through the manager.
    manager.render(scene, camera);
}

render();

// Detect mobile devices in the user agent
var is_mobile= /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Conditionally load VR or Fly controls, based on whether we're on a mobile device
if (is_mobile) {
    var controls = new THREE.VRControls(camera);
} else {
    // WASD-style movement controls
    var controls = new THREE.FlyControls(camera);

    // Disable automatic forward movement
    controls.autoForward = false;

    // Click and drag to look around with the mouse
    controls.dragToLook = true;

    // Movement and roll speeds, adjust these and see what happens!
    controls.movementSpeed = 20;
    controls.rollSpeed = Math.PI / 12;
}
