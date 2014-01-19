var Hero = function(opts) {
	var me = this,
		speedTime = 500,
		speedDistance = 800,
		dimensions = Game.getDimensions();

	me.mainW = dimensions.width;
	me.mainH = dimensions.height;

	me.speed = speedDistance / speedTime;

	me.superclass.call(me, opts);

	me.moveTo(me.settings.x, me.settings.y);	
};
Sys.extend(Hero, AnimationElement);

Hero.prototype.moveTo = function(x, y) {
	var me = this,
		settings = me.settings,
		prevX = settings.x - settings.width/2,
		prevY = settings.y - settings.height/2,
		newX = x - settings.width/2,
		newY = y - settings.height/2,
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
		},
		angle = me.getAngle(newX, newY),
		deltaX = me.mainW/2 - x - me.settings.width/2,
		deltaY = me.mainH/2 - y - me.settings.height/2;

	if (deltaX * deltaX + deltaY * deltaY > 250 * 250) {
		settings.rotate = angle;

		window.requestAnimFrame(function(){
			animate();
		});
	}
};

Hero.prototype.getAngle = function(x, y) {
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
