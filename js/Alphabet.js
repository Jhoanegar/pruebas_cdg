var alphabetTextures = alphabet_texture=[];

var alphabet =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ã‘","O","P","Q","R","S","T","U","W","Y","X","Z"];

for(var i=0;i<alphabet.length;i++) {
	var bitmap = document.createElement('canvas');

	var g = bitmap.getContext('2d');

	bitmap.width = 256;
	bitmap.height = 256;
	g.save();

	g.font = 'Bold 180px Helvetica';


	g.fillStyle = 'black';
	g.textAlign = 'center';
	g.clearRect(0,0,256,256);
	g.translate(bitmap.width / 2, bitmap.height / 2);
	g.scale(-1, 1);
	g.fillText(alphabet[i], 0, 50);

	var texture=new THREE.Texture(bitmap,THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping);
	// texture.magFilter = THREE.LinearFilter;
	// texture.minFilter = THREE.LinearMipMapLinearFilter ;
	//texture.generateMipmaps=false;
	texture.needsUpdate = true;
	alphabet_texture.push(texture);

	g.restore();

}