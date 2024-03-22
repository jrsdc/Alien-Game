//Variables
var isGameRunning = false, canPlayerShot = true, isPlayerDead = false, isPlayerHit = false;
var health = 3, level = 1, score = 0, shotLevel = "", playerFireSpeed = 8;

// Movement Key's Control
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

//Spaceships
var fires = [];
var spaceShips = [];

//Audios --- set up
var audios = {
	BACKGROUND: new Audio("./asset/sounds/Background.mp3"),
	BOMB: new Audio("./asset/sounds/Bomb.wav"),
	ARROW: new Audio("./asset/sounds/Arrow.mp3"),
	EXPLOSION: new Audio("./asset/sounds/Explosion.wav"),
	SHAPCESHIP_DESTROY: new Audio("./asset/sounds/SpaceShipDestroy.mp3"),
	PLAYER_HIT: new Audio("./asset/sounds/PlayerHit.mp3"),
	PLAYER_DEAD: new Audio("./asset/sounds/PlayerDead.mp3"),
	LEVEL_WIN: new Audio("./asset/sounds/LevelWin.wav"),
	GAME_WIN: new Audio("./asset/sounds/GameWin.mp3"),
	GAME_LOSE: new Audio("./asset/sounds/GameOver.mp3")
}

function playAudio(audio, volume = 1, isLoop = false) {
	audio.load();
	audio.volume = volume;
	audio.loop = isLoop;
	audio.play();
}
//End Audios


//Player Movement ----
function updatePlayer() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (!isPlayerHit && !isPlayerDead) {
		if (downPressed) {
			var newTop = positionTop + 1;

			var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
			if (element.classList.contains('sky') == false) {
				player.style.top = newTop + 'px';
			}

			if (leftPressed == false) {
				if (rightPressed == false) {
					player.className = 'character walk down ' + shotLevel;
				}
			}
		}
		if (upPressed) {
			var newTop = positionTop - 1;

			var element = document.elementFromPoint(player.offsetLeft, newTop);
			if (element.classList.contains('sky') == false) {
				player.style.top = newTop + 'px';
			}

			if (leftPressed == false) {
				if (rightPressed == false) {
					player.className = 'character walk up ' + shotLevel;
				}
			}
		}
		if (leftPressed) {
			var newLeft = positionLeft - 1;

			var element = document.elementFromPoint(newLeft, player.offsetTop);
			if (element.classList.contains('sky') == false) {
				player.style.left = newLeft + 'px';
			}


			player.className = 'character walk left ' + shotLevel;
		}
		if (rightPressed) {
			var newLeft = positionLeft + 1;

			var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
			if (element && element.classList.contains('sky') == false) {
				player.style.left = newLeft + 'px';
			}

			player.className = 'character walk right ' + shotLevel;
		}
	}
	else {
		if (isPlayerHit) {
			player.className = 'character hit ' + lastPressed;
		}
		if (isPlayerDead) {
			player.className = 'character dead ' + lastPressed;
		}
	}

}

function keydown(event) {
	if (isGameRunning) {
		if (!isPlayerHit && !isPlayerDead) {

			if (event.keyCode == 37 || event.keyCode == 65) {
				leftPressed = true;
			}
			if (event.keyCode == 39 || event.keyCode == 68) {
				rightPressed = true;
			}
			if (event.keyCode == 38 || event.keyCode == 87) {
				upPressed = true;
			}
			if (event.keyCode == 40 || event.keyCode == 83) {
				downPressed = true;
			}

			//Changing Skin and Hair Style
			var player = document.getElementById("player");
			if (event.keyCode == 49) {
				player.children[0].id = "head0";
				player.children[1].id = "body0";
			}
			if (event.keyCode == 50) {
				player.children[0].id = "head1";
				player.children[1].id = "body1";
			}
			if (event.keyCode == 51) {
				player.children[0].id = "head2";
				player.children[1].id = "body3";
			}
			if (event.keyCode == 52) {
				player.children[0].id = "head3";
				player.children[1].id = "body4";
			}
			if (event.keyCode == 53) {
				player.children[0].id = "head4";
				player.children[1].id = "body2";
			}
			if (event.keyCode == 54) {
				shotLevel = "";
			}
			if (event.keyCode == 55) {
				shotLevel = "fire";
			}
			if (event.keyCode == 32) {
				if (canPlayerShot && shotLevel == "fire") {
					playAudio(audios.ARROW, 0.6);
					upPressed = true;
					canPlayerShot = false;
					setTimeout(() => {
						fires.push(new Object2d("arrow", { width: 32, height: 10 }, { x: (player.offsetLeft + (player.offsetWidth / 2) - 16), y: player.offsetTop }, { x: 0, y: -playerFireSpeed }, true))
						setTimeout(() => {
							canPlayerShot = true;
						}, 500);
					}, 100);
				}
			}
		}
	}
}

function keyup(event) {
	if (isGameRunning) {
		var player = document.getElementById('player');

		if (event.keyCode == 37 || event.keyCode == 65) {
			leftPressed = false;
			lastPressed = 'left';
		}
		if (event.keyCode == 39 || event.keyCode == 68) {
			rightPressed = false;
			lastPressed = 'right';
		}
		if (event.keyCode == 38 || event.keyCode == 87) {
			upPressed = false;
			lastPressed = 'up';
		}
		if (event.keyCode == 40 || event.keyCode == 83) {
			downPressed = false;
			lastPressed = 'down';
		}
		if (event.keyCode == 32) {
			upPressed = false;
			lastPressed = "up"
		}
		if (!isPlayerHit && !isPlayerDead) {
			player.className = 'character stand ' + lastPressed + " " + shotLevel;
		}
		else {
			if (isPlayerHit) {
				player.className = 'character hit ' + lastPressed;
			}
			if (isPlayerDead) {
				player.className = 'character dead ' + lastPressed;
			}
		}
	}
}
//End ----

//Start Event ----
function start() {
	playAudio(audios.BACKGROUND, true);
	document.body.removeChild(document.querySelector(".start"));
	document.body.innerHTML += '<div class="center"><h1>Controls Setting</h1> Run ---- WASD And Arrows <br> Shot ---- Space Key <br> Skin Change ---- 1,2,3,4,5 Keys <br> Weapon Change ---- 6,7 Keys</div>';
	document.querySelector(".center").style.fontSize = "24px";
	setTimeout(() => {
		//Timer ------ 3-2-1-Go
		document.querySelector(".center").style.fontSize = "50px";
		document.querySelector(".center").innerHTML = "3";
		setTimeout(() => {
			document.querySelector(".center").innerHTML = "2";
		}, 1000);
		setTimeout(() => {
			document.querySelector(".center").innerHTML = "1";
		}, 2000);
		setTimeout(() => {
			document.querySelector(".center").innerHTML = "Go";
		}, 3000);
		setTimeout(() => {
			document.body.removeChild(document.querySelector(".center"));
			init(); // Start Game ----- 
		}, 3500);
	}, 5000);
}

// Update Health
function setUpHealth() {
	let healthElement = document.querySelector(".health");
	healthElement.innerHTML = '';
	for (var i = 0; i < health; i++) {
		healthElement.innerHTML += '<li></li>';
	}
}

function createLevel() {
	if (level === 1) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
	}
	else if (level === 2) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 2, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
	}
	else if (level === 3) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 50 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 2, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 50 + 100 } }, true));
		spaceShips[1].setBombInterval(Math.random() * 1000 + 3000);
	}
	else if (level === 4) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 5, y: 8 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[1].setBombInterval(Math.random() * 1000 + 2000);
	}
	else if (level === 5) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[1].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 5, y: 8 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[2].setBombInterval(Math.random() * 1000 + 2000);
	}
	else if (level === 6) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[1].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 6, y: 10 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[2].setBombInterval(Math.random() * 1000 + 1000);
	}
	else if (level === 7) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[1].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 6, y: 10 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[2].setBombInterval(Math.random() * 1000 + 1000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 4, y: 10 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[3].setBombInterval(Math.random() * 1000 + 2000);
	}
	else if (level === 8) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[1].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 4, y: 10 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[2].setBombInterval(Math.random() * 1000 + 1000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 7, y: 10 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[3].setBombInterval(Math.random() * 1000 + 1000);
	}
	else if (level === 9) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[1].setBombInterval(Math.random() * 1000 + 2000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 5, y: 10 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[2].setBombInterval(Math.random() * 1000 + 1000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 7, y: 10 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 20, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[3].setBombInterval(Math.random() * 1000 + 1000);
	}
	else if (level === 10) {
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[0].setBombInterval(Math.random() * 1000 + 3000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[1].setBombInterval(Math.random() * 1000 + 2000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 0, y: 5 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 5, min: 3, max: 5, isRandom: true } }, { min: window.innerHeight - 200, max: window.innerHeight - 50 }, { x: { min: 0, max: 0 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[2].setBombInterval(Math.random() * 1000 + 2000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 8, y: 10 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[3].setBombInterval(Math.random() * 1000 + 1000);
		spaceShips.push(new SpaceShip("alien", { width: 86, height: 93.8 }, { x: Math.random() * (window.innerWidth - 100), y: (Math.random() * 100 - 200) }, { x: 4, y: 10 }, { x: { value: 0, min: 0, max: 0, isRandom: false }, y: { value: 6, min: 4, max: 6, isRandom: true } }, { min: window.innerHeight - 100, max: window.innerHeight - 50 }, { x: { min: 0, max: window.innerWidth - 100 }, y: { min: -100, max: Math.random() * 100 + 50 } }, true));
		spaceShips[4].setBombInterval(Math.random() * 1000 + 1000);
	}
}

function init() {
	setUpHealth();

	document.body.innerHTML += `<div class="level">Level: ${level}</div>`
	document.body.innerHTML += `<div class="score">Score: ${score}</div>`

	isGameRunning = true;

	//Create level 01
	createLevel();

	//Adding Events ----
	document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);

	//Set up the game loop ---------
	const loop = () => {
		if (document.hidden) {
			audios.BACKGROUND.pause();
		}
		else {
			audios.BACKGROUND.play();
		}
		if (isGameRunning && !document.hidden) { // If Game Running then Do this

			//Update -----
			updatePlayer();
			fires.map(fire => { fire.update() });
			spaceShips.map(spaceShip => { spaceShip.update(); });

			//Check Collision ----
			var player = document.getElementById("player");
			spaceShips.map((spaceShip, i) => {
				if (spaceShip.health <= 0 && spaceShip.bombs.length === 0) {
					spaceShips.splice(i, 1);
				}
				//Check Collision of Each Bomb with Player and Player's Fire 
				spaceShip.bombs.map((bomb, j) => {
					if (!isPlayerDead && !isPlayerHit && bomb.bomb.collision(player.offsetLeft, player.offsetTop, player.clientWidth, player.clientHeight)) {
						health--;
						if (health > 0) {
							playAudio(audios.PLAYER_HIT);
							isPlayerHit = true;
						}
						else {
							playAudio(audios.PLAYER_DEAD);
							isPlayerDead = true;
							setTimeout(() => {
								isGameRunning = false;
								let HighestScore = window.localStorage.getItem("HighestScore");
								if (score > HighestScore || HighestScore === null) {
									window.localStorage.setItem("HighestScore", score);
									HighestScore = score;
								}
								playAudio(audios.GAME_LOSE);
								document.body.innerHTML += `<div class="center"> <h2> Game Over! </h2> <h5>Highest Score: ${HighestScore}</h5></div>`;
								setTimeout(() => {
									window.location.reload();
								}, 10000);
							}, 3000);
						}
						spaceShip.removeBomb(i, 500);
						setTimeout(() => {
							isPlayerHit = false;
						}, 500);
					}
					fires.map((fire, k) => {
						if (fire.collisionWithObject(bomb.bomb)) {
							fire.remove();
							fires.splice(k, 1);
							spaceShip.removeBomb(j, 500);
						}
						if (fire.position.y < -100) {
							fire.remove();
							fires.splice(k, 1);
						}
					});
				});
				//Check Collision of Each Fire with Spaceships ----
				fires.map((fire, k) => {
					if (fire.collisionWithObject(spaceShip)) {
						fire.remove();
						fires.splice(k, 1);
						spaceShip.health--;
						if (spaceShip.health <= 0) {
							score += 50;
							spaceShip.remove();
						}
					}
				});
			});

			// WIn Codition ---- 
			if (spaceShips.length === 0 && health > 0) {
				fires.map((fire, i) => {
					fire.remove();
					fires.splice(i, 1);
				});
				let firesDiv = document.querySelectorAll(".arrow");
				for (var i = 0; i < firesDiv.length; i++) {
					document.body.removeChild(firesDiv[i])
				};

				isGameRunning = false;
				isPlayerHit = false;
				isPlayerDead = false;
				upPressed = false;
				downPressed = false;
				leftPressed = false;
				rightPressed = false;
				lastPressed = false;
				let player = document.getElementById("player");
				player.className = "character stand down";
				if (level < 10) {
					playAudio(audios.LEVEL_WIN);
					document.body.innerHTML += '<div class="center">Level Win!</div>';
					setTimeout(() => {
						//Setting Up New Level ----- 
						//Update Location ---
						document.body.removeChild(document.querySelector(".center"));
						let player = document.getElementById("player");
						player.style.top = "88vh";
						player.style.left = "200px";
						//Update Variables ---
						level++;
						score += 100;
						health = 3;
						shotLevel = "";
						lastPressed = ""
						isGameRunning = true;
						canPlayerShot = true;
						//Creating Next Level ----
						createLevel();
					}, 10000);
				}
				else {
					let HighestScore = window.localStorage.getItem("HighestScore");
					if (score > HighestScore || HighestScore === null) {
						window.localStorage.setItem("HighestScore", score);
						HighestScore = score;
					}
					playAudio(audios.GAME_WIN);
					document.body.innerHTML += `<div class="center"> <h2> Game Win! </h2> <h5>Highest Score: ${HighestScore}</h5></div>`;
					setTimeout(() => {
						window.location.reload();
					}, 10000);
				}
			}

			//UPDATE HEALTH LEVEL SCORE ---
			setUpHealth();
			document.querySelector(".level").innerText = "Level: " + level;
			document.querySelector(".score").innerText = "Score: " + score;
		};
		window.requestAnimationFrame(() => {
			loop();
		});
	}
	loop();
}