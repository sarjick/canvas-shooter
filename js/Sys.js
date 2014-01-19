var Sys = {};

Sys.extend = function(ChildClass, ParentClass) {
    ChildClass.prototype = new ParentClass();
    ChildClass.prototype.superclass = ParentClass;
    ChildClass.prototype.constructor = ChildClass;
};

Sys.merge = function(obj1, obj2) {
	for (var i in obj2) {
		obj1[i] = obj2[i];
	}

	return obj1;
};

Sys.ajax = function(path, method, callback) {
	var ajax = new XMLHttpRequest();

	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4){
			if(typeof callback == 'function') {
				callback(ajax.responseText);
			}
		}
	};

	ajax.open(method, path, true);
	ajax.send(null);

	return ajax;
};

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
})();