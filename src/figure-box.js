function Box(min, max) {
	this.init = function(ctx, scene) {
		this.width = utils.rnd(min, max);
		this.height = utils.rnd(min, max);
		this.x = utils.rnd(scene.width / 10, scene.width - this.width - scene.width / 10);
		this.y = utils.rnd(scene.height / 10, scene.height - this.height - scene.height / 10);
		
		this.color = new utils.RGB(true);
		this.scene = scene;
		
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = '#FFFFBB';
		ctx.fill();
		ctx.closePath();
	};
}