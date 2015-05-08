function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function formBottle() {
	for (var i = 0; i < frame.children.length; i++) {
		frame.children[i].attracted = true;
	};

	bottleFormed = true;
	onBottleFormed();
}

function createCircle(params) {
	radius = params.radius;
	segments = params.segments || 128;
	startRadius = params.startRadius || 0;
	endRadius = params.endRadius || Math.PI * 2;
	color = params.color || 0x000000;
	var material = new THREE.MeshBasicMaterial({
		color: color
	});
	var circleGeometry = new THREE.CircleGeometry(radius, segments, startRadius, endRadius);				
	return new THREE.Mesh( circleGeometry, material );
}