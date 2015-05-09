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