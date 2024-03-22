class Object2d {
	constructor(classes = "", size = { width: 0, height: 0 }, position = { x: 0, y: 0 }, speed = { x, y }, isActive = true) {
		this.size = size;
		this.speed = speed;
		this.classes = classes;
		this.position = position;
		this.isActive = isActive;
		this.isReadyForRemove = false;
		this.elem = this.#createElem();
	}
	/*
		Create Element
	*/
	#createElem() {
		let elem = document.createElement('div');
		//Setting up position
		elem.style.left = `${this.position.x}px`;
		elem.style.top = `${this.position.y}px`;
		//Setting up size
		elem.style.width = `${this.size.width}px`;
		elem.style.height = `${this.size.height}px`;
		elem.classList += this.classes;
		//adding to scene Game (Body)
		document.body.appendChild(elem);
		return elem;
	}
	/*
		Update
	*/
	update() {
		if (this.isActive) {
			this.position.x += this.speed.x;
			this.position.y += this.speed.y;
			this.elem.style.left = `${this.position.x}px`;
			this.elem.style.top = `${this.position.y}px`;
		}
	}
	/*
		Remove Object
	*/
	remove(delay = 0) {
		if (this.elem.style.display !== "none" && this.isReadyForRemove === false) {
			this.isReadyForRemove = true;
			setTimeout(() => {
				if (document.body.contains(this.elem)) {
					this.elem.style.display = "none";
					document.body.removeChild(this.elem);
				}
				this.isActive = false;
			}, delay);
		}
	}
	/*
		Check Collision
	*/
	collision(x, y, width, height) {
		if ((this.position.x >= x && this.position.x <= (x + width)) || ((this.position.x + this.size.width) >= x && (this.position.x + this.size.width) <= (x + width))) {
			if ((this.position.y >= y && this.position.y <= (y + height)) || ((this.position.y + this.size.height) >= y && (this.position.y + this.size.height) <= (y + height))) {
				return true;
			}
		}
		return false;
	}
	collisionWithObject(other) {
		return this.collision(other.position.x, other.position.y, other.size.width, other.size.height);
	}
}