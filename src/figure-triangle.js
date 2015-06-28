function Triangle(size, stable) {
	if (stable === undefined) stable = true;
	
	this.init = function(ctx, scene) {
		this.color = new utils.RGB(true);
		this.position = new utils.Coordinate(scene.width, scene.height, size);
		this.pivot = new utils.Coordinate(size, size);
		this.a = new utils.Coordinate(
			{value: 0, fixed: stable},
			{value: 0, fixed: stable}
		);
		this.b = new utils.Coordinate(
			{value: size, fixed: true},
			{max: size, fixed: stable}
		);
		this.c = new utils.Coordinate(
			{max: size, fixed: stable},
			{value: size, fixed: true}
		);
		this.degrees = 0;
		
		console.log('size', size);
		console.log('A', this.a);
		console.log('B', this.b);
		console.log('C', this.c);
	};
	
	this.draw = function(ctx, scene) {
		//this.position.move();
		this.color.move();
		
		var tmp_x = this.a.x.value, tmp_y = this.a.y.value;

		utils.rotate_point(this.a, this.pivot, 1);
		utils.rotate_point(this.b, this.pivot, 1);
		utils.rotate_point(this.c, this.pivot, 1);
		
		console.log('Ax =', this.a.x.value, '(', tmp_x, ')', 'Ay =', this.a.y.value, '(', tmp_y, ')');
	
		ctx.beginPath();
		ctx.moveTo(this.position.x.value + this.a.x.value, this.position.y.value + this.a.y.value);
		ctx.lineTo(this.position.x.value + this.b.x.value, this.position.y.value + this.b.y.value);
		ctx.lineTo(this.position.x.value + this.c.x.value, this.position.y.value + this.c.y.value);
		//ctx.lineTo(this.position.x.value + this.a.x.value, this.position.y.value + this.a.y.value);
		ctx.closePath();
		ctx.strokeStyle = this.color.hex();
		ctx.fillStyle = this.color.val();
		ctx.fill();
		ctx.stroke();
		
		// for debug
		ctx.fillStyle = "#FFF";
		ctx.font = "16px Arial";
		ctx.fillText("A", this.position.x.value + this.a.x.value, this.position.y.value + this.a.y.value);
		ctx.fillText("B", this.position.x.value + this.b.x.value, this.position.y.value + this.b.y.value);
		ctx.fillText("C", this.position.x.value + this.c.x.value, this.position.y.value + this.c.y.value);
		ctx.fillText("p", this.position.x.value + this.pivot.x.value, this.position.y.value + this.pivot.y.value);
		ctx.rect(this.position.x.value, this.position.y.value, size, size);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.position.x.value + this.pivot.x.value, this.position.y.value + this.pivot.y.value, 2, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
		
		scene.scene.stable.ctx.beginPath();
		scene.scene.stable.ctx.fillStyle = "#FFF";
		scene.scene.stable.ctx.arc(this.position.x.value + this.a.x.value, this.position.y.value + this.a.y.value, 2, 0, 2 * Math.PI);
		scene.scene.stable.ctx.closePath();
		scene.scene.stable.ctx.fill();
		
		scene.scene.stable.ctx.beginPath();
		scene.scene.stable.ctx.fillStyle = "#F00";
		scene.scene.stable.ctx.arc(this.position.x.value + this.b.x.value, this.position.y.value + this.b.y.value, 2, 0, 2 * Math.PI);
		scene.scene.stable.ctx.closePath();
		scene.scene.stable.ctx.fill();
		
		scene.scene.stable.ctx.beginPath();
		scene.scene.stable.ctx.fillStyle = "#0F0";
		scene.scene.stable.ctx.arc(this.position.x.value + this.c.x.value, this.position.y.value + this.c.y.value, 2, 0, 2 * Math.PI);
		scene.scene.stable.ctx.closePath();
		scene.scene.stable.ctx.fill();
		
	};
}
