function SpinStar(size) {
	/* function drawStar from http://stackoverflow.com/a/25840319
	 * with little changes
	 */
	function drawStar(ctx, spikes, outerRadius, innerRadius, stroke_width, color) {
		var rot = Math.PI / 2 * 3;
		var cx = outerRadius;
		var cy = outerRadius;
		outerRadius -= stroke_width * 2;
		
		var x = cx;
		var y = cy;
		var step = Math.PI / spikes;

		ctx.strokeSyle = "#000";
		ctx.beginPath();
		ctx.moveTo(cx, cy - outerRadius)
		for (i = 0; i < spikes; i++) {
			x = cx + Math.cos(rot) * outerRadius;
			y = cy + Math.sin(rot) * outerRadius;
			ctx.lineTo(x, y)
			rot += step

			x = cx + Math.cos(rot) * innerRadius;
			y = cy + Math.sin(rot) * innerRadius;
			ctx.lineTo(x, y)
			rot += step
		}
		ctx.lineTo(cx, cy - outerRadius)
		ctx.closePath();
		
		ctx.lineWidth = stroke_width;
		ctx.strokeStyle = color.hex();
		ctx.stroke();
		ctx.fillStyle = color.val();
		ctx.fill();
	}

	var canvas = utils.add_canvas(size, size, 'spin_star' + String(Math.random()).substr(1, 4));
	canvas.setAttribute('name', 'spin_star');
	
	this.color = new utils.RGB(true);
	var stroke = utils.rnd(1, 3);
	drawStar(canvas.getContext('2d'), utils.rnd(5, 8), size / 2, utils.rnd(size / 7, size / 3), stroke, this.color);
	
	this.degrees = 0;
	this.init = function(ctx, scene) {
		this.position = new utils.Coordinate(scene.width, scene.height, size / 2 - stroke * 2);
	};
	
	this.draw = function(ctx, scene) {
		this.position.move();
		ctx.save();
		ctx.translate(this.position.x.value, this.position.y.value);
		ctx.rotate((Math.PI/180) * this.degrees++);
		ctx.drawImage(canvas, -size / 2, -size / 2);
		ctx.restore();
	};
}