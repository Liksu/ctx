function Bubble(radius, fill) {
	Circle.apply(this, arguments);
	this.stroke = false;
}
utils.inherit(Bubble, Circle);

Bubble.prototype.init = function(ctx, scene) {
	Bubble.super.init.call(this, ctx, scene);
	
	this.center.x.set_step(utils.rnd(0.05, 0.25, true, true));
	this.center.y.set_step(utils.rnd(-0.25, 0.25, true, true));
	
	var palette = [
		[170, 239, 159, 1],
		[222, 91, 66, 0.54],
		[200, 91, 235, 0.94],
		[213, 6, 178, 0.23],
		[5, 214, 29, 0.8],
		[161, 130, 196, 0.13],
		[29, 249, 64, 0.83],
		[253, 59, 137, 0.86]
	];
	
	this.color = new utils.fixed_RGB(utils.rnd(palette));
};

Bubble.prototype.draw = function(ctx, scene) {
	var gradient = ctx.createRadialGradient(
		this.center.x.value, this.center.y.value, this.radius.value,
		this.center.x.value, this.center.y.value, 0
	);
	gradient.addColorStop(0, this.color.val(30));
	gradient.addColorStop(0.2, this.color.val(8));

	this.fill = gradient;
	Bubble.super.draw.call(this, ctx, scene);
	
	ctx.beginPath();
	ctx.ellipse(
		this.center.x.value - this.radius.value * 8 / 16,
		this.center.y.value - this.radius.value * 8 / 16,
		this.radius.value / 22,
		this.radius.value / 8,
		7,
		0, 2 * Math.PI);
	ctx.closePath();
	ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
	ctx.fill();
};

Bubble.prototype.get_data = function() {
	return false
};
