const logo = document.getElementById('logo');
let state = 3;
let x = 0;
let y = 0;
let dxFlag = false;
let cooldown = 50;
let dxCooldown = cooldown;
let dyCooldown = cooldown;
let dyFlag = false;
let dx = 1;
let dy = 1;

function runDvdEffect() {
	moveLogo();
}

function runStaticSvg(version) {
	const video = document.getElementById('background');
	if (version === 1) {
		video.src = 'waves.mp4';
	} else if (version === 2) {
		video.src = 'embers.mp4';
	} else if (version === 3) {
		video.src = 'shore2.mp4';
	} else if (version === 4) {
		video.src = 'snowyroad.mp4';
	} else if (version === 5) {
		video.src = 'trees.mp4';
	} else {
		video.src = 'default.mp4'; // Add other versions as needed
	}
	video.autoplay = true;
	video.loop = true;
	video.muted = true;
}

function moveLogo() {
	x += dx;
	y += dy;

	if (x + logo.clientWidth >= window.innerWidth || x <= 0) {
		dx *= -1;
		dxFlag = true;
	}
	if (y + logo.clientHeight >= window.innerHeight || y <= 0) {
		dy *= -1;
		dyFlag = true;
	}

	if (dxFlag) {
		if (dyFlag) {
			logo.classList.add('flipped');
			setTimeout(() => {
				logo.classList.remove('flipped');
			}, 1000);
		}
	}
	if (dxCooldown > 0) {
		dxCooldown--;
	} else {
		dxFlag = false;
		dxCooldown = cooldown;
	}
	if (dyCooldown > 0) {
		if (dyFlag) {
			logo.classList.toggle('flipped');
		}
		dyCooldown--;
	} else {
		dyFlag = false;
		dyCooldown = cooldown;
	}

	logo.style.transform = `translate(${x}px, ${y}px)`;
	requestAnimationFrame(moveLogo);
}
let animationFrameId;
let intervalId;

function cancelEffects() {
	if (animationFrameId) {
		cancelAnimationFrame(animationFrameId);
	}
	if (intervalId) {
		clearInterval(intervalId);
	}
}

function moveLogo() {
	x += dx;
	y += dy;

	if (x + logo.clientWidth >= window.innerWidth || x <= 0) {
		dx *= -1;
		dxFlag = true;
	}
	if (y + logo.clientHeight >= window.innerHeight || y <= 0) {
		dy *= -1;
		dyFlag = true;
	}

	if (dxFlag) {
		if (dyFlag) {
			logo.classList.add('flipped');
			setTimeout(() => {
				logo.classList.remove('flipped');
			}, 1000);
		}
	}
	if (dxCooldown > 0) {
		dxCooldown--;
	} else {
		dxFlag = false;
		dxCooldown = cooldown;
	}
	if (dyCooldown > 0) {
		if (dyFlag) {
			logo.classList.toggle('flipped');
		}
		dyCooldown--;
	} else {
		dyFlag = false;
		dyCooldown = cooldown;
	}

	logo.style.transform = `translate(${x}px, ${y}px)`;
	animationFrameId = requestAnimationFrame(moveLogo);
}

intervalId = setInterval(() => {
	state = (state % 4) + 1;
	runStaticSvg(state);
}, 20000); // 600000 ms = 10 minutes
