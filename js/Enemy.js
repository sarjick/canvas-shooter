var Enemy = function(opts) {
	var me = this,
		speedTime = 400,
		speedDistance = 800,
		dimensions = Game.getDimensions();

	me.mainW = dimensions.width;
	me.mainH = dimensions.height;
	me.shots = 5;
	me.infoField = document.getElementById("hitsCount");
	me.infoField.innerHTML = me.shots;

	me.speed = speedDistance / speedTime;

	me.superclass.call(me, opts);	
};
Sys.extend(Enemy, AnimationElement);

Enemy.prototype.moveTo = function(x, y, onComplete) {
	var me = this,
		settings = me.settings,
		prevX = settings.x,
		prevY = settings.y,
		newX = x,
		newY = y,
		tempX = prevX,
		tempY = prevY,
		distance = Math.sqrt(Math.abs(prevX*prevX + prevY*prevY - newX*newX - newY*newY)),
		time = Math.floor(distance / me.speed),
		startTime = (new Date()).getTime(),
		animate = function() {
			var currentTime = (new Date()).getTime() - startTime;

			if (currentTime > time) {
				settings.x = newX;
				settings.y = newY;

				if (typeof onComplete === "function") {
					onComplete();
				}
			}
			else {
				tempX = prevX + (newX - prevX)*currentTime/time;
				tempY = prevY + (newY - prevY)*currentTime/time;

				settings.x = tempX;
				settings.y = tempY;

				window.requestAnimFrame(function(){
					animate();
				});
			}
		};

	window.requestAnimFrame(function(){
		animate();
	});
};

Enemy.prototype.getAngle = function(x, y) {
	var me = this,
		angle = 0;

	if (x > me.mainW/2) {
		angle = Math.atan((y - me.mainH/2) / (x - me.mainW/2));
	}
	else {
		angle = Math.PI - Math.atan((y - me.mainH/2) / (me.mainW/2 - x));
	}

	return angle;
};

Enemy.prototype.initMotion = function() {
	var me = this,
		radius = 150,
		xC = me.mainW/2,
		yC = me.mainH/2,
		xRand = xC + 2*radius*Math.random() - radius - me.settings.width/2,
		yRand = yC + 2*radius*Math.random() - radius - me.settings.height/2;

	me.moveTo(xRand, yRand, setTimeout(function(){
		if (!Game.overed) {
			me.initMotion();
		}
		else {
			me.killed();
		}

		me.canMove = true;
	}, 500 + Math.random()*500));
};

Enemy.prototype.shotDone = function() {
	var me = this,
		w = 2*me.settings.width;

	if (me.shots === 1) {
		Game.over();
	}

	me.infoField.innerHTML = --me.shots;
};

Enemy.prototype.killed = function() {
	this.settings.img = "enemyKilled";
};