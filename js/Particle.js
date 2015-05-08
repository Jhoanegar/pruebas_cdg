var Particle = function ( material ) {
	THREE.Sprite.call( this, material );
	this.edgeBehavior = WRAP;
	this.mass = 1.0;
	this.maxSpeed = 10;
	this.pos = new THREE.Vector3();
	this.velocity = new THREE.Vector3();


};

Particle.prototype = Object.create( THREE.Sprite.prototype );
Particle.prototype.constructor = THREE.Sprite;

Particle.prototype.update = function () {
	this.position.add( this.velocity );
}

Particle.prototype.bounce = function () {

	if ( this.position.x > window.innerWidth ) {
		this.position.x = window.innerWidth;
		this.velocity.x *= -1;
	}
	else if ( this.position.x < 0 ) {
		this.position.x = 0;
		this.velocity.x *= -1;
	}

	if ( this.position.y > window.innerHeight ) {
		this.position.y = window.innerHeight;
		this.velocity.y *= -1;
	}
	else if ( this.position.y < 0 ) {
		this.position.y = 0;
		this.velocity.y *= -1;
	}

}

Particle.prototype.wrap = function () {

	if ( this.position.x > window.innerWidth ) this.position.x = 0;
	if ( this.position.x < 0 ) this.position.x = window.innerWidth;
	if ( this.position.y > window.innerHeight ) this.position.y = 0;
	if ( this.position.y < 0 ) this.position.y = window.innerHeight;

}
