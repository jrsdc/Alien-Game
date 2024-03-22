class SpaceShip extends Object2d {
	constructor(classes = "", size = { width: 0, height: 0 }, position = { x: 0, y: 0 }, speed = { x, y }, bombSpeed = { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 0, min: 0, max: 0, isRandom: false } }, bombExplosionHeight = { min: 0, max: 0 }, limit = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }, isActive = true) {
		super(classes, size, position, speed, isActive);
		this.health = 3;
		this.bombs = [];
		this.limit = limit;
		this.bombSpeed = bombSpeed;
		this.bombExplosionHeight = bombExplosionHeight;
	}
	setBombInterval(delay = 0) {
		var interval = setInterval(() => {
			if (isGameRunning && !document.hidden && this.health > 0) {
				let distance = document.getElementById("player").offsetLeft - this.position.x;
				distance *= -1;
				if (distance > 800) {
					playAudio(audios.BOMB, 0.5);
				}
				else {
					playAudio(audios.BOMB, 0.8);
				}
				var speedX = (this.bombSpeed.x.isRandom) ? Math.random() * (this.bombSpeed.x.max - this.bombSpeed.x.min) + this.bombSpeed.x.min : this.bombSpeed.x.value;
				var speedY = (this.bombSpeed.y.isRandom) ? Math.random() * (this.bombSpeed.y.max - this.bombSpeed.y.min) + this.bombSpeed.y.min : this.bombSpeed.y.value;
				this.bombs.push({ bomb: new Object2d("bomb", { width: 31, height: 10 }, { x: (this.position.x + (this.size.width / 2) - 15.5), y: (this.position.y + this.size.height) }, { x: speedX, y: speedY }, true), explosionHeight: ((Math.random() * (this.bombExplosionHeight.max - this.bombExplosionHeight.min) + this.bombExplosionHeight.min)) });
			}
			else {
				if (this.health <= 0) {
					clearInterval(interval);
				}
			}
		}, delay);
	}
	removeBomb(idx, delay) {
		if (this.bombs[idx]) {
			let distance = document.getElementById("player").offsetLeft - this.bombs[idx].bomb.position.x;
			distance *= -1;
			if (distance > 200) {
				playAudio(audios.EXPLOSION, 0.5);
			}
			else {
				playAudio(audios.EXPLOSION, 0.8);
			}
			this.bombs[idx].bomb.speed.y = 0;
			this.bombs[idx].bomb.remove(delay);
			this.bombs[idx].bomb.elem.className = "explosion";
			this.bombs[idx].bomb.size = { width: 128, height: 160 };
			this.bombs[idx].bomb.elem.style.width = `${this.bombs[idx].bomb.size.width}px`;
			this.bombs[idx].bomb.elem.style.height = `${this.bombs[idx].bomb.size.height}px`;
		}
	}
	remove() {
		super.remove();
		playAudio(audios.SHAPCESHIP_DESTROY, 0.6);
	}
	update() {
		super.update();
		this.bombs.map((bomb, i) => {
			bomb.bomb.update({ up: { value: 0, canRemove: false }, down: { value: window.innerHeight, canRemove: true } }, 0);
			if (!bomb.bomb.isReadyForRemove && bomb.bomb.position.y > bomb.explosionHeight) {
				this.removeBomb(i, Math.random() * 1000 + 1000);
				score++;
			}
		});

		if (this.position.x < this.limit.x.min || this.position.x > this.limit.x.max) {
			this.speed.x *= -1;
		}

		//Removing  -----
		this.bombs = this.bombs.filter(bomb => bomb.bomb.isActive === true);

		if (this.position.y > this.limit.y.max && this.speed.y != 0) {
			this.speed.y = 0;
		}
	}
}