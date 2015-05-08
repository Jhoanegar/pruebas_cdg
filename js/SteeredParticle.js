var SteeredParticle = function ( material ) {

	Particle.call( this, material );

	this.maxForce = 1;
	this.steeringForce = new THREE.Vector3();
	this.arrivalThreshold = 100;
	this.wanderAngle = 0;
	this.wanderDistance = 10;
	this.wanderRadius = 5;
	this.wanderRange = 1;
	this.pathIndex = 0;
	this.pathThreshold = 20;
	this.avoidDistance = 300;
	this.avoidBuffer = 20;
	this.inSightDist = 200;
	this.tooCloseDist = 60;
	this.desiredVelocity = new THREE.Vector3();
	this.attracted=false;


};

SteeredParticle.prototype = Object.create( Particle.prototype );
SteeredParticle.prototype.constructor = Particle;

SteeredParticle.prototype.update = function () {
	this.velocity.add(this.steeringForce);
	this.velocity.multiplyScalar( this.maxSpeed );
	Particle.prototype.update.apply( this )
}

SteeredParticle.prototype.seek = function ( target ) {
	this.steeringForce.subVectors( target, this.position );
	this.steeringForce.multiplyScalar( this.maxForce );
}
