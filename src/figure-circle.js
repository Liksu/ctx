function Circle(radius, fill) {
	if (radius === undefined || radius === null) this.radius = new Point({min: 4, max: 42, step: 0.1, fixed: true}).set_value(null, true);
	else if (!(radius instanceof Point)) this.radius = new Point({value: radius, fixed: true}).init();

	this.fill = fill;
	this.stroke = true;
	//console.log(radius, this.radius, this.fill);	
}

Circle.prototype.init = function(ctx, scene) {
	this.center = new utils.Coordinate(scene.width, scene.height);
	this.color = new utils.RGB(true);
	this.scene = scene;
};

Circle.prototype.move = function() {
	if (!this.center && !this.color) return;

	this.radius.move();
	this.center.move();
	this.color.move();
	
	this.center.x.min = this.radius.value;
	this.center.x.max = this.scene.width - this.radius.value;
	this.center.y.min = this.radius.value;
	this.center.y.max = this.scene.height - this.radius.value;
};

Circle.prototype.draw = function(ctx) {
	//console.log('circle draw', this, this.center, this.color, ctx);
	if (!this.center && !this.color) return;

	ctx.beginPath();
	ctx.arc(this.center.x.value, this.center.y.value, this.radius.value, 0, 2 * Math.PI);
	ctx.closePath();
	if (this.stroke) {
		ctx.strokeStyle = this.stroke === true ? this.color.hex() : this.stroke;
		ctx.stroke();
	}
	if (this.fill) {
		ctx.fillStyle = this.fill === true ? this.color.val() : this.fill;
		ctx.fill();
	}
};

Circle.prototype.get_data = function() {
	//console.log('Circle get_data');
	return {
		type: 'circle',
		center: this.center,
		radius: this.radius,
		mass: Math.PI * Math.pow(this.radius.value, 2)
	}
};

/*
Circle.prototype.check_collision = function(figure) {
	figure.
};
*/
