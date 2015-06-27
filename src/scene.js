function Scene(el, options) {
	/* values */
	
	if (!options) options = {};
	this.el = el;
	
	this.width = el.offsetWidth;
	this.height = el.offsetHeight;
	
	var scenes = [
		  {tag: 'canvas', name: 'stable',  id: 'stable',  clear_each_frame: false, bgColor: options.bgColor || '#FFF'}
		, {tag: 'canvas', name: 'effects', id: 'effects', clear_each_frame: true,  bgColor: null}
		, {tag: 'canvas', name: 'figures', id: 'figures', clear_each_frame: true,  bgColor: null}
	];
	
	this.queue = [];
	var work = true;
	
	/* methods */
	
	// get animation function
	// requestAnim shim layer by Paul Irish
	this.requestAnimFrame =
		(function(){
			return window.requestAnimationFrame
				|| window.webkitRequestAnimationFrame
				|| window.mozRequestAnimationFrame
				|| window.oRequestAnimationFrame
				|| window.msRequestAnimationFrame
				|| function(callback, element){
					window.setTimeout(callback, 1000 / 60);
				};
		})().bind(window);
	
	this.clear_scene = function(name) {
		if (name === undefined) {
			for (name in this.scene) this.clear_scene(name);
		}
		
		this.scene[name].ctx.save();
		this.scene[name].ctx.setTransform(1, 0, 0, 1, 0, 0);
		
		if (this.scene[name].bgColor) {
			this.scene[name].ctx.fillStyle = this.scene[name].bgColor;
			this.scene[name].ctx.fillRect(0, 0, this.width, this.height);
		} else {
			this.scene[name].ctx.clearRect(0, 0, this.width, this.height);
		}
		
		this.scene[name].ctx.restore();
	}.bind(this);	

	this.add_figure = function(figure, draw_method, type) {
		if (figure === undefined || typeof figure != 'object') return 0;
		if (type === undefined) type = true;
		if (typeof type === 'boolean') type = type ? 'figures' : 'stable';
		
		var position = this.queue.push({worker: figure, method: draw_method !== undefined ? draw_method : 'draw', type: type}) - 1;
		// this.queue[position].link = this.draw_queues[type].push(position);
		
		if (figure.init && typeof figure.init == 'function') figure.init(this.scene[type].ctx, this);
		return position
	}.bind(this);

	this.remove_figure = function(position) {
		// this.draw_queues[ this.queue[position].type ].splice( this.queue[position].link );
		return this.queue.splice(position).length;
	}.bind(this);
	
	// animation
	var frame_number = 0;
	this.frame = function() {
		if (work) this.requestAnimFrame( this.frame );
		else return 0;
		//console.log('frame N' + ++frame_number);
		
		for (var name in this.scene) if (this.scene[name].clear_each_frame) this.clear_scene(name);
		
		var n = this.queue.length;
		while (n--) {
			var task = this.queue[n];
			//console.log('worker', task.worker);
			if (task.worker.move && typeof task.worker.move == 'function') task.worker.move();
			if (task.method) task.worker[task.method](this.scene[task.type].ctx, this);
		}
		
		this.check_collision();
	}.bind(this);
	
	this.pauseAnimation = function() { work = false }.bind(this);
	this.resumeAnimation = function() { work = true; this.frame() }.bind(this);
	this.toggleAnimation = function() { work ? this.pauseAnimation() : this.resumeAnimation()}.bind(this);
	
	// collision
	this.check_collision = function() {
		return 0;
		this.queue.forEach(function(figure, index) {
			this.queue.slice(index + 1).forEach(function (partner, pindex) {
				//if (figure.check_collision && typeof figure.check_collision == 'function') figure.check_collision(partner);
				//intersection
			}.bind(this));
		}.bind(this));
	}.bind(this);
	
	/* constructor */
	
	this.id = el.id || String(Math.random()).substr(2, 9);
	el.style.position = 'relative';
	this.scene = {};
	for (var i in scenes) {
		var id = [this.id, scenes[i].id].join('_');
		var canvas = document.createElement(scenes[i].tag);
		canvas.setAttribute('id', id);
		canvas.setAttribute('name', scenes[i].name);
		canvas.style.position = 'absolute';
		canvas.style.top = '0px';
		canvas.style.left = '0px';
		
		canvas.width = this.width;
		canvas.height = this.height;
		el.appendChild(canvas);
		
		this.scene[scenes[i].name] = scenes[i];
		this.scene[scenes[i].name].canvas = document.getElementById(id);
		this.scene[scenes[i].name].ctx = this.scene[scenes[i].name].canvas.getContext('2d');
	}
	
	this.frame();	
}