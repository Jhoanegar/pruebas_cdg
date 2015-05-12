// var THREE = require( 'three' )
// var domready = require( 'domready' )
// var raf = require( 'raf' )
// var SteeredParticle = require( './SteeredParticle' )( THREE )
// var bottleShape = require( './BottleShape' )( THREE )
// var alphabetTextures = require( './Alphabet' )( THREE )


var width = window.innerWidth;
var height = window.innerHeight;
var mouseX=-1000000,mouseY=-100000;

document.body.style.margin = "0"
document.body.style.overflow = "hidden"
var sceneOrtho = new THREE.Scene();
var renderer = new THREE.WebGLRenderer( {
	antialias: false
} )
renderer.sortObjects = false;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( 0xffffff )
renderer.setSize( width, height )
var cameraOrtho = new THREE.OrthographicCamera( -width / 2, width / 2, height / 2, -height / 2, 1, 10 );
cameraOrtho.position.z = 10;
var material = new THREE.MeshBasicMaterial({
	color: 0x0000ff
});

var radius = 100;
var segments = 32;

var circleGeometry = new THREE.CircleGeometry( radius, segments );				
var circle = new THREE.Mesh( circleGeometry, material );
		sceneOrtho.add( circle );

var geometry = new THREE.BoxGeometry( 10, 10, 10 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.z = 1
	sceneOrtho.add( cube );



window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'mousemove', onDocumentMouseMove, false );


onWindowResize();

function animate() {
	// raf( animate );
	// requestAnimationFrame(animate);
	update();
	render();
}

function update() {
}
function render() {
	renderer.render( sceneOrtho, cameraOrtho );

}

function onWindowResize() {

	var width = window.innerWidth;
	var height = window.innerHeight;


	cameraOrtho.left = -width / 2;
	cameraOrtho.right = width / 2;
	cameraOrtho.top = height / 2;
	cameraOrtho.bottom = -height / 2;
	cameraOrtho.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX;
	mouseY = event.clientY;
}

function onBottleFormed() {
	var material = new THREE.MeshBasicMaterial({
		color: 0x0000ff
	});

	
	
	var radius = Math.min(height/2 - 20, width/2 - 20);
	var segments = 256;

	var circleGeometry = new THREE.CircleGeometry( radius, segments, 0, Math.PI );				
	var circle = new THREE.Mesh( circleGeometry, material );
	sceneOrtho.add( circle );
}

document.body.appendChild( renderer.domElement )
// animate();
render();
