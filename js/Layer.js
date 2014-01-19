var Layer = function(canvas) {
	var me = this,
		body = document.body,
		pushButton = document.getElementById("pushButton");

	me.elements = [];
	me.canvas = canvas;
	me.context = canvas.getContext("2d");
	me.bufferImages = {};
	me.canShot = true;

	if (!canvas.touchstartInited) {
		if ('ontouchstart' in document.documentElement) {
			canvas.addEventListener("touchstart", function(e){
				me.fire("touched", e);
			}, false);
		}
		else {
			canvas.addEventListener("click", function(e){
				me.fire("touched", e);
			}, false);
		}
		canvas.touchstartInited = true;
	}

	if (!body.keydownInited) {
		body.addEventListener("keydown", function(e){
			if (e.keyCode == 32) {
				me.fireShot();
		    }		
		}, false);
		body.keydownInited = true;
	}

	if (!pushButton.clickInited) {
		pushButton.addEventListener("click", function(e){
			me.fireShot();	    	
		}, false);
		pushButton.clickInited = true;
	}
};
Sys.extend(Layer, Element);

Layer.prototype.fireShot = function() {
	var me = this;

	if (me.canShot) {
		me.fire("shot");
		me.canShot = false;
		clearTimeout(me.shotPauseId);
		me.shotPauseId = setTimeout(function(){
			me.canShot = true;
		}, 400);
	}
};

Layer.prototype.add = function(animationElement) {
	var me = this,
		settings = animationElement.settings;

	animationElement.parent = me;

	me.updateBuffer(settings);

	me.elements.push(animationElement);

	me.elements.sort(function(a, b){
		if (a.settings.depth < b.settings.depth) {
			return -1;
		}
		if (a.settings.depth > b.settings.depth) {
			return 1;
		}
		return 0;
	});

	if (!me.renderingStarted) {
		me.doRendering();
		me.renderingStarted = true;
	}	
};

Layer.prototype.updateBuffer = function(settings) {
	var me = this,
		canvas = me.bufferImages[settings.img] || document.createElement("canvas"),
		context = canvas.getContext("2d"),
		img = Game.imgManager.getImage(settings.img);

	canvas.width = settings.width;
	canvas.height = settings.height;

	context.save();
	context.translate(settings.width/2, settings.height/2);
	context.rotate(settings.rotate);
	
	context.drawImage(img, -settings.width/2, -settings.height/2, settings.width, settings.height);

	context.restore();

	me.bufferImages[settings.img] = canvas;

	return canvas;
};

Layer.prototype.doRendering = function() {
	var me = this;

	window.requestAnimFrame(function(){
		me.renderElements();
	});
};

Layer.prototype.renderElements = function() {
	var me = this,
		img,
		settings,
		context = me.context;

	context.clearRect(0, 0, me.canvas.width, me.canvas.height);

	for (var i = 0; i < me.elements.length; i++) {
		settings = me.elements[i].settings;

		context.drawImage(me.updateBuffer(settings), settings.x, settings.y, settings.width, settings.height);

		if (settings.hitTest) {
			me.elements[i].doHit();
		}
	}

	me.doRendering();
};