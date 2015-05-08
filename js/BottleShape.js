var bottleShape = function () {
	var californiaPts = [];

	californiaPts.push( (new THREE.Vector2 (-84, -59))  );
	californiaPts.push( (new THREE.Vector2 (-77, -75))  );
	californiaPts.push( (new THREE.Vector2 (-61, -85))  );
	californiaPts.push( (new THREE.Vector2 (-44, -98))  );
	californiaPts.push( (new THREE.Vector2 (-43, -126))  );
	californiaPts.push( (new THREE.Vector2 (-44, -170))  );
	californiaPts.push( (new THREE.Vector2 (-44, -190))  );
	californiaPts.push( (new THREE.Vector2 (1, -190))  );
	californiaPts.push( (new THREE.Vector2 (8, -124))  );
	californiaPts.push( (new THREE.Vector2 (23, -114))  );
	californiaPts.push( (new THREE.Vector2 (50, -102))  );
	californiaPts.push( (new THREE.Vector2 (78, -94))  );
	californiaPts.push( (new THREE.Vector2 (89, -84))  );
	californiaPts.push( (new THREE.Vector2 (94, -33))  );
	californiaPts.push( (new THREE.Vector2 (95, 0))  );
	californiaPts.push( (new THREE.Vector2 (90, 53))  );
	californiaPts.push( (new THREE.Vector2 (87, 106))  );
	californiaPts.push( (new THREE.Vector2 (85, 130))  );
	californiaPts.push( (new THREE.Vector2 (77, 137))  );
	californiaPts.push( (new THREE.Vector2 (58, 143))  );
	californiaPts.push( (new THREE.Vector2 (23, 156))  );
	californiaPts.push( (new THREE.Vector2 (-24, 158))  );
	californiaPts.push( (new THREE.Vector2 (-60, 136))  );
	californiaPts.push( (new THREE.Vector2 (-69, 111))  );
	californiaPts.push( (new THREE.Vector2 (-79, 4))  );
	californiaPts.push( (new THREE.Vector2 (-84, -25))  );

	var shape = new THREE.Shape( californiaPts );
	var geometry = new THREE.ShapeGeometry( shape );

	return geometry;
}();