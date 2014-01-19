var AnimationElement = function(opts) {
	var me = this;

	me.settings = Sys.merge({
		y: 0,
		x: 0,
		width: 0,
		height: 0,
		rotate: 0,
		depth: 0,
		options: {
			fade: [],
			scale: [],
			translate: []
		}
	}, opts);

	return me;
};
Sys.extend(AnimationElement, Element);

AnimationElement.prototype.remove = function() {
	var me = this;

	if (me.parent) {
		for (var i = 0; i < me.parent.elements.length; i++) {
			if (me.parent.elements[i] === me) {
				me.parent.elements.splice(i, 1);
				break;
			}
		}
	}
};

AnimationElement.prototype.doHit = function() {
	var me = this,
		item = me.settings.hitTest.item,
		x = me.settings.x + me.settings.width/2,
		y = me.settings.y + me.settings.height/2,
		itemX = item.settings.x + item.settings.width/2,
		itemY = item.settings.y + item.settings.height/2,
		distance = (me.settings.width + item.settings.width)/2,
		deltaX = x - itemX,
		deltaY = y - itemY;

	if (deltaX * deltaX + deltaY * deltaY < distance * distance * 0.8) {
		me.settings.hitTest.func();
	}
};

AnimationElement.prototype.shotDone = function() {
	
};