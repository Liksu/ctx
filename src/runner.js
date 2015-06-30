(function() {
	var n;
	var first_scene = new Scene(document.getElementById('main50'));
	n = 7; while (n--) first_scene.add_figure(new Circle(null, true));
	n = 4; while (n--) first_scene.add_figure(new SpinStar(utils.rnd(32, 64)));
	first_scene.el.addEventListener('click', function() { first_scene.toggleAnimation() });
	
	/*
	var tri = new Triangle(42);
	first_scene.add_figure(tri);
	tri.position.x.value = 100;
	tri.position.y.value = 100;
	*/
	
	/*
	var second_scene = new Scene(document.getElementById('test'));
	n = 16; while (n--) second_scene.add_figure(new Circle(12, !!Math.round(Math.random())));
	*/

	var bubbles = new Scene(document.getElementById('bubbles50'));
	n = 21; while (n--) bubbles.add_figure(new Bubble(utils.rnd(32, 64), true));
	bubbles.el.addEventListener('click', function() { bubbles.toggleAnimation() });
	
	// for debug
	window.main = first_scene;
	//window.test = second_scene;
	window.bubbles = bubbles;
})();