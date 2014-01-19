var ImagesManager = function(onload) {
	var me = this,
		imagesData = [
			{
				"name" : "hero",
				"src" : "images/hero.png"
			},
			{
				"name" : "bullet",
				"src" : "images/bullet.png"
			},
			{
				"name" : "enemy",
				"src" : "images/enemy.png"
			},
			{
				"name" : "enemyKilled",
				"src" : "images/enemyKilled.png"
			}
		],
		checkImagesLoaded = function() {
			if (me.images.length === imagesData.length) {
				if (typeof onload === 'function') {
					onload();
				}
			}
		};

	me.images = [];

	for (var i = 0; i < imagesData.length; i++) {
		var img = new Image();
		img.src = imagesData[i].src;
		img.name = 	imagesData[i].name;

		img.onload = function() {
			var img = this;

			me.images.push({
				name : img.name,
				img : img
			});
			checkImagesLoaded();
		};
	}
};

ImagesManager.prototype.getImage = function(imgName) {
	var me = this,
		img;

	for (var i = 0; i < me.images.length; i++) {
		if (me.images[i].name === imgName) {
			img = me.images[i].img;
			break;
		}
	}

	return img;
};