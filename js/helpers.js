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
	var material = new THREE.MeshBasicMaterial({
		color: params.color,
		antialiasing: true
	});
	var circleGeometry = new THREE.CircleGeometry(params.radius, params.segments, params.startRadius, params.endRadius);				
	return new THREE.Mesh( circleGeometry, material );
}

function rotateCoords(x, y, deg) {
	var theta = (deg * Math.PI) / 180;
	var x_1 = Math.cos(theta) * x + (-Math.sin(theta) * y);
	var y_1 = Math.sin(theta) * x + Math.cos(theta) * y;
	return {x: x_1, y: y_1};
}