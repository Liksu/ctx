function Bubble(radius, fill) {
	Circle.apply(this, arguments);
	
	this.draw = function(ctx, scene) {
		console.log('hey', this.super.draw);
		//this.super.draw(ctx, scene);
	}

}
//utils.inherit(Bubble, Circle);
/*
		this.gradient = ctx.createRadialGradient(
			this.center.x.value - this.radius() / 2,
			this.center.y.value - this.radius() / 2,
			this.radius() / 16,
			this.center.x.value - this.radius() / 8,
			this.center.y.value - this.radius() / 8,
			this.radius()
		);
		this.gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
		this.gradient.addColorStop(1, this.color.hex());
			
*/