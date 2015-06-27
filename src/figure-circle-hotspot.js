function Bubble(radius, fill) {
	Circle.apply(this, arguments);
}
utils.inherit(Bubble, Circle);

Bubble.prototype.draw = function(ctx, scene) {
	//console.log('Bubble draw');
	//console.log(this.center, this.radius);
	var gradient = ctx.createRadialGradient(
		this.center.y.value - this.radius.value / 2,
		this.center.x.value - this.radius.value / 2,
		this.radius.value / 16,
		this.center.x.value - this.radius.value / 8,
		this.center.y.value - this.radius.value / 8,
		this.radius.value
	);
	gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
	gradient.addColorStop(1, this.color.hex());

	this.fill = gradient;
	Bubble.super.draw.call(this, ctx, scene);
};
