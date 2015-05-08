// var THREE = require( 'three' )
// var domready = require( 'domready' )
// var raf = require( 'raf' )
// var SteeredParticle = require( './SteeredParticle' )( THREE )
// var bottleShape = require( './BottleShape' )( THREE )
// var alphabetTextures = require( './Alphabet' )( THREE )

var WRAP = "wrap";
var BOUNCE = "bounce";
 // function initialize() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	var mouseX=-1000000,mouseY=-100000;
	var totalParticles=500;

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


	window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener( 'mousemove', onDocumentMouseMove, false );

	//var ballTexture = THREE.ImageUtils.loadTexture( './static/images/redball.png' );

	// suggested- alignment: THREE.SpriteAlignment.center  for targeting-style icon
	//			  alignment: THREE.SpriteAlignment.topLeft for cursor-pointer style icon
	var ballMaterial = new THREE.SpriteMaterial(
		{
			map: alphabetTextures[Math.floor(Math.random()*alphabetTextures.length)],
			depthWrite: false,
			depthTest: false
		}
	);

	// Its children are the actual particles shown in screen.
	var frame = new THREE.Object3D();
	frame.position.set( -(window.innerWidth * 0.5), (window.innerHeight * 0.5), 1 );
	frame.scale.set( 1, -1, 1 );
	sceneOrtho.add( frame );

	var ballSprite, ballMaterial, size;
	for ( var i = 0; i < totalParticles; i++ ) {
		ballMaterial = new THREE.SpriteMaterial( {
			map: alphabetTextures[Math.floor(Math.random()*alphabetTextures.length)],
			depthWrite: false,
			depthTest: false
		} );
		ballSprite = new SteeredParticle( ballMaterial );
		size = Math.random() * 60 + 5;
		ballSprite.scale.set( size, size, 1 );
		ballSprite.material.rotation=2 * Math.PI * Math.random();
		ballSprite.mass = 66 - size;//Math.random()*3.5+0.5;
		ballSprite.maxForce = (Math.random() * 0.05 + 0.05) / (66 - size);//size;//+(Math.random()*5+5);
		ballSprite.maxSpeed = (Math.random() * 0.05 + 0.90);//size+(Math.random()*10+10);
		ballSprite.position.set( Math.random() * window.innerWidth, Math.random() * window.innerHeight, 1 );
		frame.add( ballSprite );
	}
	// Vectors of the particles to form the bottle relative to (0,0) 
	var pointsShapeBottle=THREE.GeometryUtils.randomPointsInGeometry(bottleShape,totalParticles);
	onWindowResize();

	function animate() {
		raf( animate );
		update();
		render();
		TWEEN.update();
	}

	var dummy = new THREE.Vector3();
	var mouseVector = new THREE.Vector3( 1 );
	var ballSprite;
	var spritesAttracted = 0;
	var bottleFormed = false
	function update() {
		for ( var i = 0; i < frame.children.length; i++ ) {
			ballSprite = frame.children[i];
			if ( !ballSprite.attracted){
				dummy.subVectors( mouseVector.set( mouseX, mouseY, 1 ), ballSprite.position );

			 if(dummy.length() > 200 ) 	continue;
			}

			if (!ballSprite.attracted) {
				ballSprite.attracted = true;
				spritesAttracted++;
				if (spritesAttracted == pointsShapeBottle.length) {
					bottleFormed = true;
					onBottleFormed();
				}
			}

			if (bottleFormed) {
				mouseX = (width / 2) + randomIntFromInterval(-5, 5);
				mouseY = (height / 2)  + randomIntFromInterval(-5, 5);
			}
			var a = pointsShapeBottle[i];
			ballSprite.seek( dummy.set( a.x + mouseX, a.y + mouseY, 1 ) );
			ballSprite.update();

		}
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
		frame.position.set( -(window.innerWidth * 0.5), (window.innerHeight * 0.5), 1 );
	}

	function onDocumentMouseMove( event ) {
		mouseX = event.clientX;
		mouseY = event.clientY;

	}

	var circles = [];
	function onBottleFormed() {
		// myFrame = frame
		console.log("BottleFormed")
		// console.log(frame.children[0].position);
		// console.log(pointsShapeBottle[0].position);
		window.removeEventListener( 'mousemove', onDocumentMouseMove, false );

		var material = new THREE.MeshBasicMaterial({
			color: 0x000
		});

		

		var radius = Math.min(height/2 - 20, width/2 - 20);
		var segments = 128;
		var startRadius = 0;
		var endRadius = Math.PI * 2;

		var circleGeometry = new THREE.CircleGeometry(radius, segments, startRadius, endRadius);				
		var circle = new THREE.Mesh( circleGeometry, material );
		// circle.position.z = 0;
		sceneOrtho.add( circle );
		
		// children
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		var circleGeometry = new THREE.CircleGeometry(radius - 20, segments, startRadius, endRadius);
		var childCircle = new THREE.Mesh(circleGeometry, material );
		// childCircle.position.x = 3;
		circle.add(childCircle);

		circles.push(circle);
		circles.push(childCircle);

		// new TWEEN.Tween({radius: startRadius})
		// 	.to({radius: endRadius})
		// 	.easing(THREE.Easing.Linear.NONE)
		// 	.onUpdate(function() {
		// 		var circle;
		// 		for (var i = 0; i < circles.length; i++) {
		// 			circle = circles[i];
		// 			sceneOrtho.remove(circle);
		// 		};
		// 		circles = [];
				
		// 	})
		// 	.start();

	}

	document.body.appendChild( renderer.domElement )
	animate();
// }

// initialize();

// // var myFrame;
// var bottleFormed = false;