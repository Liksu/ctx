var utils = {};

utils.rnd = function(min, max, moving, can_be_float) {
	if (arguments.length == 1 && min instanceof Array) {
		return min[ Math.floor(Math.random() * min.length) ]
	}
	
	if (can_be_float === undefined) can_be_float = false;
	var result;
	do {
		result = Math.random() * (max - min + (Math.trunc(min) === min && Math.trunc(max) === max));
		if (!can_be_float) result = Math.floor(result);
		result += min;
	} while (moving && result == 0);
	return result;
};

utils.add_canvas = function(width, height, id) {
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', id || 'canvas' + String(Math.random()).substr(1, 7));
	canvas.width = width;
	canvas.height = height;
	canvas.style.visibility = 'hidden';
	document.body.appendChild(canvas);
	
	return canvas;
};

utils.get_style = function(el) {
	if (el.currentStyle) return el.currentStyle;
	if (window.getComputedStyle) return document.defaultView.getComputedStyle(el, null);
	return null;
}

/* Point */

function Point(options) {
	if (!options) options = {};
	if (typeof options === 'number') options = {value: options, fixed: true};
	
	this.value = options.value || 0;
	this.step = options.step || 1;
	this.max = options.max || 255;
	this.min = options.min || 0;
	this.fixed = !!options.fixed;
	
	this.value_can_be_zero  = options.value_can_be_zero  !== undefined ? options.value_can_be_zero  : options.can_be_zero  !== undefined ? options.can_be_zero  : true;
	this.value_can_be_float = options.value_can_be_float !== undefined ? options.value_can_be_float : options.can_be_float !== undefined ? options.can_be_float : false;
	this.step_can_be_zero  = options.step_can_be_zero  !== undefined ? options.step_can_be_zero  : options.can_be_zero  !== undefined ? options.can_be_zero  : true;
	this.step_can_be_float = options.step_can_be_float !== undefined ? options.step_can_be_float : options.can_be_float !== undefined ? options.can_be_float : false;
	
	this.set_value = function(value, force) {
		if (!force && this.fixed) return;
		this.value = value === undefined || value === null ? utils.rnd(this.min, this.max, this.value_can_be_zero, this.value_can_be_float) : value;
		return this;
	};
	
	this.set_step = function(step, force) {
		if (!force && this.fixed) return;
		this.step = step === undefined || step === null ? utils.rnd(-1, 1, this.step_can_be_zero, this.step_can_be_float) : step;
		return this;
	};
	
	this.init = function() {
		this.set_step();
		this.set_value(options.value, true);
		return this;
	};
	
	this.check_bound = function() {
		if (this.value < this.min) { this.value = this.min; this.step = -this.step }
		if (this.value > this.max) { this.value = this.max; this.step = -this.step }
		return this;
	}.bind(this);
	
	this.move = function() {
		if (!this.fixed) {
			this.value += this.step;
			this.check_bound();
		}
		return this;
	}.bind(this);
};

/* Coordinates */

utils.create_XPoint = function(width, options) {
	var settings = typeof width == 'object' ? width : {min: 0, max: width};
	if (options && typeof options === 'object') {
		for (var key in options) settings[key] = options[key];
	}

	var x = new Point(settings);
	return x.init();
};

utils.create_YPoint = function(height, options) {
	var settings = typeof height == 'object' ? height : {min: 0, max: height};
	if (options && typeof options === 'object') {
		for (var key in options) settings[key] = options[key];
	}

	var y = new Point(settings);
	return y.init();
};

utils.Coordinate = function(width, height, padding) {
	padding = Number(padding) || 0;
	this.x = utils.create_XPoint(typeof width == 'object' ? width : {min: 0 + padding, max: width  - padding}, {step_can_be_float: true, step_can_be_zero: false});
	this.y = utils.create_YPoint(typeof height == 'object' ? height : {min: 0 + padding, max: height - padding}, {step_can_be_float: true, step_can_be_zero: false});
	this.move = function() {
		this.x.move();
		this.y.move();
	}
};

utils.distance = function(a, b) {
	return Math.sqrt(Math.pow(b.x.value - a.x.value, 2) + Math.pow(b.y.value - a.y.value, 2))
};

utils.to_polar = function(point, base) {
	if (!base) base = {x: {value: 0}, y: {value: 0}};
	var result = {};
	result.r = utils.distance(point, base);
	
	var dx = point.x.value - base.x.value;
	var dy = point.y.value - base.y.value;
	result.phi = Math.atan2(dy, dx);
	
	return result;
};

utils.to_decart = function(polar) {
	var result = {};
	result.x = Math.round(polar.r * Math.cos(polar.phi));
	result.y = Math.round(polar.r * Math.sin(polar.phi));
	return result;
};

utils.rotate_point = function(point, base, degree) {
	if (typeof degree !== 'number') degree = 1;
	
	var polar = utils.to_polar(point, base);
	polar.phi = ( polar.phi * 180/Math.PI + degree ) * Math.PI/180;
	var new_coordinates = utils.to_decart(polar);
	new_coordinates.x += base.x.value;
	new_coordinates.y += base.y.value;
	
	point.x.value = new_coordinates.x;
	point.y.value = new_coordinates.y;
	
	return new_coordinates;
};

utils.collide = function(point_a, point_b, mass_a, mass_b) {
	var dXa = point_a.x.step,
	    dYa = point_a.y.step,
	    dXb = point_b.x.step,
	    dYb = point_b.y.step,
	    ma  = mass_a || 1,
	    mb  = mass_b || 1;
	
	point_a.x.step = (2 * mb * dXb + (ma - mb) * dXa) / (ma + mb);
	point_a.y.step = (2 * mb * dYb + (ma - mb) * dYa) / (ma + mb);
	
	point_b.x.step = (2 * ma * dXa + (mb - ma) * dXb) / (ma + mb);
	point_b.y.step = (2 * ma * dYa + (mb - ma) * dYb) / (ma + mb);
};

/* Colors */

utils.ColorPoint = function() {
	this.color = new Point().init();
	this.move = this.color.move;
	this.val = function() {
		return this.color.value
	}
	this.hex = function() {
		return (this.color.value < 16 ? '0' : '') + this.color.value.toString(16);
	};
};

utils.fixed_RGB = function(r, g, b, alpha) {
	if (arguments.length == 1 && r instanceof Array) {
		alpha = r[3];
		b = r[2];
		g = r[1];
		r = r[0];
	}
	
	if (typeof alpha !== 'number') alpha = 1;
	else if (alpha > 1) alpha = alpha / 100;
	
	function hex(n) { 
		return (n < 16 ? '0' : '') + n.toString(16);
	}
	
	this.move = function() { return true };
	
	this.val = function(over_alpha) {
		return 'rgba(' + [r, g, b,
			typeof over_alpha === 'number'
				? (over_alpha > 1 ? over_alpha / 100 : over_alpha)
				: alpha
			].join(', ') + ')';
	};
	
	this.hex = function() {
		return '#' + hex(r) + hex(g) + hex(b)
	}
};
	
utils.RGB = function(alpha) {
	this.r = new utils.ColorPoint();
	this.g = new utils.ColorPoint();
	this.b = new utils.ColorPoint();
	if (alpha) this.alpha = alpha !== true ? alpha : (new Point({min: 0, max: 100})).init();
	
	this.move = function() {
		this.r.move();
		this.g.move();
		this.b.move();
		if (alpha === true) this.alpha.move();
	}
	
	this.val = alpha || alpha === 0
		? function(over_alpha) {
			return 'rgba(' + [
				  this.r.val()
				, this.g.val()
				, this.b.val()
				, typeof over_alpha === 'number'
					? (over_alpha > 1 ? over_alpha / 100 : over_alpha)
					: (alpha === true ? this.alpha.value / 100 : alpha)
				].join(', ') + ')';
		}
		: function() {
			return 'rgb(' + [
				  this.r.val()
				, this.g.val()
				, this.b.val()
				].join(', ') + ')';
		}
	;
	
	this.hex = function() {
		return '#'
			+ this.r.hex()
			+ this.g.hex()
			+ this.b.hex()
	}
};

/* stuff */

utils.inherit = function (Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;

    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.super = Parent.prototype;
};
