(function() {
	var first_scene = new Scene(document.getElementById('scene1'), {fill_screen: true});
	/*
	var n;
	n = 32; while (n--) first_scene.add_figure(new Circle(null, true));
	n = 12; while (n--) first_scene.add_figure(new SpinStar(42));
	n = 8; while (n--) first_scene.add_figure(new Box(32, 64), null, false);
	*/
	
	/*
	var tri = new Triangle(42);
	first_scene.add_figure(tri);
	tri.position.x.value = 100;
	tri.position.y.value = 100;
	*/
	
	//first_scene.add_figure(new Circle(100, true));
	var n = 32; while (n--) first_scene.add_figure(new Bubble(32, true));
	
	first_scene.el.addEventListener('click', function() { first_scene.toggleAnimation() });
	
	//var second_scene = new Scene(document.getElementById('scene2'));
	//var n = 16;
	//while (n--) second_scene.add_figure(new Circle(12, !!Math.round(Math.random())));
	document.getElementById('scene2').style.display = 'none';
	
	// for debug
	window.first = first_scene;
	//window.second = second_scene;
})();