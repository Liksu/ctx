function Point(options) {
	function rnd(min, max, moving, can_be_float) {
		if (can_be_float === undefined) can_be_float = false;
		var result;
		do {
			result = Math.random() * (max - min + 1);
			if (!can_be_float) result = Math.floor(result);
			result += min;
		} while (moving && result == 0);
		return result;
	}

	if (!options) options = {};
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
		this.value = value === undefined || value === null ? rnd(this.min, this.max, this.value_can_be_zero, this.value_can_be_float) : value;
		return this;
	};
	
	this.set_step = function(step, force) {
		if (!force && this.fixed) return;
		this.step = step === undefined || step === null ? rnd(-1, 1, this.step_can_be_zero, this.step_can_be_float) : step;
		return this;
	};
	
	this.init = function() {
		this.set_step();
		this.set_value();
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