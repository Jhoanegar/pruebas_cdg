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
	// var projector = new THREE.Projector();
	var dir = new THREE.Vector3();
	var mouseVector = new THREE.Vector3();
	var raycaster = new THREE.Raycaster();

	document.body.style.margin = "0"
	document.body.style.overflow = "hidden"
	var sceneOrtho = new THREE.Scene();
	var renderer = new THREE.WebGLRenderer( {
		antialias: true
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
		TWEEN.update();
		raf( animate );
		update();
		render();
	}

	var dummy = new THREE.Vector3();
	var mouseVector = new THREE.Vector3( 1 );
	var ballSprite;
	var spritesAttracted = 0;
	var bottleFormed = false
	var attractionLength = Math.min(width * .4, height * .4);
	console.log("attracted", attractionLength);
	function update() {
		for ( var i = 0; i < frame.children.length; i++ ) {
			ballSprite = frame.children[i];
			if ( !ballSprite.attracted){
				dummy.subVectors( mouseVector.set( mouseX, mouseY, 1 ), ballSprite.position );

			 if(dummy.length() >  attractionLength) 	continue;
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

		// Detects if one of the menu circles is being hovered
		if (bottleFormed) {
			mouseVector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, - 1 ); // z = - 1 important!
		    mouseVector.unproject( cameraOrtho );
		    dir.set( 0, 0, - 1 ).transformDirection( cameraOrtho.matrixWorld );
		    raycaster.set( mouseVector, dir );
		    var intersects = raycaster.intersectObjects( menuCircles );
		    if (intersects.length > 0) {
		    	// console.log(intersects[0].object.perfumeId);
		    	showPerfumes(intersects[0].object);
		    }
		}
	}

	var circles = [];
	function onBottleFormed() {
		console.log("BottleFormed");
		// window.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		showMenu();
	}

	var menuCircles = [];
	function showMenu() {
		var border = 40;
		var material = new THREE.MeshBasicMaterial({
			color: 0x000
		});
		var origRadius = Math.min(height/2 - 50, width/2 - 50);

		
		var params = {
			radius: origRadius,
			segments: 128,
			startRadius: 0,
			endRadius: Math.PI * 2,
			color: 0x000000
		};

		var circle = createCircle(params);
		circle.scale.set(0.1,0.1,0.1);
		sceneOrtho.add( circle );
		
		params.color = 0xffffff;
		console.log(origRadius);
		var innerCircleRadius = params.radius - border;
		params.radius = innerCircleRadius;
		var childCircle = createCircle(params);
		childCircle.scale.set(0.1,0.1,0.1);
		circle.add(childCircle);

		circles.push(circle);
		circles.push(childCircle);

		var factor = 0.03;
		params.radius = origRadius * factor;
		params.color = 0x000000;
		var degrees = [0, 45, 135, 180, 225, 315];
		var newCircle;
		for (var i = 0; i < 6; i++) {
			newCircle = createCircle(params);
			newCircle.position.y = origRadius * (1 - factor + factor/2 ) ;
			coords = rotateCoords(newCircle.position.x, newCircle.position.y, degrees[i]);
			newCircle.position.x = coords.x;
			newCircle.position.y = coords.y;
			newCircle.scale.set(0.01,0.01,0.01);
			newCircle.hasHover = false;
			newCircle.perfumeInfo = {};
			newCircle.perfumeInfo.id = i;
			newCircle.perfumeInfo.radius = params.radius;
			newCircle.parent = circle;
			addPerfumes(newCircle);
			menuCircles.push(newCircle);
			circle.add(newCircle);
		}

		var scale = ( (origRadius - border/ 5) ) / (origRadius - border);

		var showCircles = new TWEEN.Tween({scale: 0.01})
			.to({scale: 1}, 2000)
			.easing(TWEEN.Easing.Exponential.InOut)
			.onUpdate(function() {
				var scale = this.scale;
				childCircle.scale.set(scale,scale,scale);
				circle.scale.set(scale,scale,scale);
			})
			.onComplete(function() {
				resizeInnerCircle.start();
				changeColor.start()
			});

		var resizeInnerCircle = new TWEEN.Tween({scale: 1})
			.to({scale: scale}, 2000)
			.easing(TWEEN.Easing.Exponential.InOut)
			.onUpdate(function() {
				var scale = this.scale;
				childCircle.scale.set(scale,scale,scale);
			})
			.onComplete(function() {
				new TWEEN.Tween({scale: 0.01})
					.to({scale: 1}, 1000)
					.easing(TWEEN.Easing.Exponential.InOut)
					.onUpdate(function() {
						var scale = this.scale;
						for (var i = 0; i < menuCircles.length; i++) {
							menuCircles[i].scale.set(scale,scale,scale);
						}
					}).start();
			});

		var changeColor = new TWEEN.Tween({color: 0})
			.to({color: .752}, 2000)
			.easing(TWEEN.Easing.Exponential.InOut)
			.onUpdate(function() {
				circle.material.color = new THREE.Color(this.color, this.color, this.color);
			});


		showCircles.start();
		
		
	}


	function addPerfumes(circle) {
		var perfumeWidth = 37;
		var perfumeHeight = 70;
		var numberOfPerfumes = [0,0,0,0,5,1];
		var margin = 5;
		var separation = 10;
		var marginX;
		var marginY;
		var originX; 
		var originY; 
		var directionX;
		var directionY;
		var perfumes = numberOfPerfumes[circle.perfumeInfo.id];
		var rectShape = new THREE.Shape();
		var rectWidth;
		var rectHeight;

		if (perfumes == 0 || circle.perfumeInfo.id != 5)
			return;

		switch(circle.perfumeInfo.id) {

		case 5:
			marginX = 20;
			marginY = 20;
			directionX = 1;
			directionY = -1;
			rectWidth = (perfumeWidth * perfumes) + ((perfumes - 1) * separation) + (marginX * 2);
			rectHeight = perfumeHeight + marginY * 2;
			var differenceX = circle.position.x + rectWidth - width * 0.5;
			var differenceY = circle.position.y + rectHeight - height * 0.5;
			originX = marginX;
			originY = -marginY;
			if ( differenceX > 0 ) {
				console.error("Out of bounds for " + (differenceX) + " in x");
				originX = -differenceX;
				
			}
			if ( differenceY > 0) {
				console.error("Out of bounds for " + (differenceY) + " in y");
			}
			rectWidth *= directionX;
			rectHeight *= directionY;
			// From top-left to bottom-right
			rectShape.moveTo( originX, originY );
			rectShape.lineTo( rectWidth, originY );
			rectShape.lineTo( rectWidth, rectHeight );
			rectShape.lineTo( originX, rectHeight );
			rectShape.lineTo( originX, originY );

			var rectGeom = new THREE.ShapeGeometry( rectShape );
			var rectMesh = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x00aeff } ) ) ;	
			circle.add( rectMesh );
			console.log(rectMesh.material)
			rectMesh.scale.set(0.01,0.01,0.01);
			break;
		}

		var innerRect;
		for (var i = 0; i < perfumes; i++) {
			innerRect = circle.children[0];
			var perfumeImg = new THREE.Shape();
			perfumeImg.moveTo( originX, originY );
			rectShape.lineTo( perfumeWidth * directionX, originY );
			rectShape.lineTo( perfumeWidth * directionX, perfumeHeight * directionY );
			rectShape.lineTo( originX, perfumeHeight * directionY );
			rectShape.lineTo( originX, originY );
			var geometry = new THREE.ShapeGeometry( rectShape );
			var perfumeTexture = new THREE.ImageUtils.loadTexture( 'img/' + circle.perfumeInfo.id + '_' + i + '.png' );
			var rectMesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: perfumeTexture } ) ) ;	
			innerRect.add(rectMesh);
		};
		
	}

	function showPerfumes(object) {
		var circle = object.children[0];
		if (!circle || circle.hasHover == true)
			return;
		circle.hasHover = true;

		new TWEEN.Tween({scale: 0.01})
			.to({scale: 1}, 1000)
			.easing(TWEEN.Easing.Exponential.InOut)
			.onUpdate(function() {
				var scale = this.scale;
				circle.scale.set(scale, scale, scale);
			}).start();

	}

	document.body.appendChild( renderer.domElement )
	animate();
// }

// initialize();

// // var myFrame;
// var bottleFormed = false;