var Game = {};

Game.init = function() {
	var me = this,
		gameLayer = new Layer(document.getElementById("gameLayer")),
		startX = 50,
		startY = 50,
		hero,
		enemy,
		dimensions = Game.getDimensions();

	me.width = dimensions.width;
	me.height = dimensions.height;

	hero = new Hero({
		img: "hero",
		y: startX,
		x: startY,
		width: 100,
		height: 100
	});
	enemy = new Enemy({
		img: "enemy",
		y: 260,
		x: 360,
		width: 80,
		height: 80,
		depth: 1
	});

	document.querySelector(".endSplash").style.display = "none";

	Game.overed = false;

	gameLayer.add(hero);
	gameLayer.add(enemy);

	hero.on("touched", function(e) {
		if (e.targetTouches) {
			hero.moveTo(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
		}
		else {
			hero.moveTo(e.clientX, e.clientY);
		}
	});
	hero.on("shot", function(e) {
		var me = hero,
			bullet = new Bullet({
				img: "bullet",
				y: me.settings.y,
				x: me.settings.x,
				startX : startX,
				startY : startY,
				rotate: me.settings.rotate,
				width: 100,
				height: 100,
				hitTest: {
					item: enemy,
					func: function() {
						bullet.shotDone();
						enemy.shotDone();
					}
				}
			});

		gameLayer.add(bullet.moveOut());
	});

	enemy.initMotion();

	me.over = function() {
		document.querySelector(".endSplash").style.display = "block";
		Game.overed = true;	

		hero.unsubscribe("touched");
		hero.unsubscribe("shot");

		hero.remove();
		enemy.remove();
	};
};

Game.imgManager = new ImagesManager(function(){
	Game.init();
});

Game.getDimensions = function() {
	return {
		width: 800,
		height: 600
	};
};

document.querySelector(".endSplash .button").addEventListener("click", function(e){
	Game.init();		
}, false);