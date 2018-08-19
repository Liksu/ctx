var bubbles = new Scene(document.getElementById('bubbles100'));
bubbles.el.addEventListener('click', function(e) {
	const cheat = 1 + e.ctrlKey + e.altKey;
    do {
        clicked = bubbles.queue.findIndex(({worker: bubble}) => {
            const click = {x: {value: e.clientX}, y: {value: e.clientY}};
            return utils.distance(bubble.center, click) < bubble.radius.value * cheat;
        });
        if (clicked > -1) {
            bubbles.remove_figure(clicked);
            hits++;
        }
    } while (clicked > -1);

    if (!bubbles.queue.length) {
    	finish();
        ctx = bubbles.scene.figures.ctx;
        width = window.innerWidth;
        height = window.innerHeight;
        ctx.font = `200px verdana`;
        ctx.fillStyle = 'yellow';
        text = 'УРА!\u263a';
        textWidth = ctx.measureText(text).width;
        ctx.textBaseline = 'bottom';
        ctx.fillText(text, (width - textWidth) / 2, height / 2);
        ctx.font = `70px verdana`;
        text = nn(hits);
        textWidth = ctx.measureText(text).width;
        ctx.textBaseline = 'top';
        ctx.fillText(text, (width - textWidth) / 2, height / 2);
    }
});

function nn(n) {
    const m = n % 10;
    if ((n > 10 && n < 20) || !m || m > 4) return `сбито ${n} пузырей`;
    if (m === 1) return `сбит ${n} пузырь`;
    return `сбито ${n} пузыря`;
}

finish = function() {
    bubbles.pauseAnimation();
    bubbles.clear_scene('figures');
    n = bubbles.queue.length;
    if (n > 0) while (--n) bubbles.remove_figure(n);
    clearInterval(timerId);
};

game = function(max) {
	n = Math.floor(max / 2); while (n--) bubbles.add_figure(new Bubble(utils.rnd(32, maxRadius), true, speed));
	timerId = setInterval(() => {
		if (bubbles.queue.length < max) bubbles.add_figure(new Bubble(utils.rnd(32, maxRadius), true, speed));
	}, timeout);
	hits = 0;

	window.bubbles = bubbles;
};

game(max);

document.addEventListener('keyup', e => {
	if (!(e.code === 'Space')) return;

    finish();
	bubbles.resumeAnimation();
    game(max);
});

window.addEventListener('resize', () => bubbles.resize());