(function() {
	var n;

	var first_scene = new Scene(document.getElementById('main'));
	n = 32; while (n--) first_scene.add_figure(new Circle(null, true));
	n = 12; while (n--) first_scene.add_figure(new SpinStar(42));
	n = 8; while (n--) first_scene.add_figure(new Box(32, 64), null, false);
	first_scene.el.addEventListener('click', function() { first_scene.toggleAnimation() });
	
	
	/*
	var tri = new Triangle(42);
	first_scene.add_figure(tri);
	tri.position.x.value = 100;
	tri.position.y.value = 100;
	*/
	
	
	var second_scene = new Scene(document.getElementById('test'));
	n = 16; while (n--) second_scene.add_figure(new Circle(12, !!Math.round(Math.random())));

	var bubbles = new Scene(document.getElementById('bubbles'), {fill_screen: true});
	n = 32; while (n--) bubbles.add_figure(new Bubble(32, true));
	
	// for debug
	window.main = first_scene;
	window.test = second_scene;
	window.bubbles = bubbles;
})();