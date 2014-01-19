var Bullet = function(opts) {
	var me = this,
		speedTime = 400,
		speedDistance = 800,
		dimensions = Game.getDimensions();

	me.mainW = dimensions.width;
	me.mainH = dimensions.height;

	me.speed = speedDistance / speedTime;

	me.superclass.call(me, opts);	
};
Sys.extend(Bullet, AnimationElement);

Bullet.prototype.moveOut = function() {
	var me = this,
		settings = me.settings,
		y = settings.y,
		x = settings.x,
		newcoords = me.getNewCoords(x, y, settings.rotate),
		prevX = x,
		prevY = y,
		newX = newcoords[0],
		newY = newcoords[1],
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

				me.remove();
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

	return me;
};

Bullet.prototype.rotate = function(cx, cy, x, y, a) {
    var cos = Math.cos,
        sin = Math.sin,
        nx = (x - cx) * cos(a) - (y - cy) * sin(a)   + cx,
        ny = (x - cx) * sin(a) + (y - cy) * cos(a)   + cy;

    return [nx, ny];
};

Bullet.prototype.getNewCoords = function(x, y) {
	var me = this,
		xC = me.mainW/2,
		yC = me.mainH/2,
		vector = [x + (xC - x)*3, y + (yC - y)*3];

	return vector;
};

Bullet.prototype.shotDone = function() {
	this.remove();
};