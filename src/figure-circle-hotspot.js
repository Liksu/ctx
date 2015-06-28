function Bubble(radius, fill) {
	Circle.apply(this, arguments);
	this.stroke = false;
}
utils.inherit(Bubble, Circle);

Bubble.prototype.draw = function(ctx, scene) {
	var gradient = ctx.createRadialGradient(
		this.center.x.value, this.center.y.value, this.radius.value,
		this.center.x.value, this.center.y.value, 0
	);
	gradient.addColorStop(0, this.color.val(30));
	gradient.addColorStop(0.2, this.color.val(0));

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
