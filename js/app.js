var Enemy = function() {
	// Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xRange = [-150, 600];
    this.possibleY = [60, 140, 220];
    this.speedRange = [150, 600];

    this.sprite = 'images/enemy-bug.png';

    this.reset();
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    var startPos = this.xRange[0];

    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getRandomY = function() {
    return this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
};

Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};
//Creates player.
var Player = function() {
    this.xRange = [-2, 402];
    this.yRange = [-20, 380];
    this.sprite = 'images/char-cat-girl.png';
    this.reset();
};

Player.prototype.update = function() {
    this.checkCollisions();
};
//Checks to see where the player is, and if the player is caught or is in the water, reset.
Player.prototype.checkCollisions = function() {
    if (this.y == -20) {
        // Player is on water, reset.
        this.reset();
    } else if (this.y >= 60 && this.y <= 220) {
        var self = this;
        // Player is on road rows, check collisions.
        // Loop through each bug.
        allEnemies.forEach(function(enemy) {
            // Is the bug on the same row as the player?
            if (enemy.y == self.y) {
                // Is the bug on the player?
                if (enemy.x >= self.x - 30 && enemy.x <= self.x + 30) {
                    self.reset();
                }
            }
        });
    }
};
//Starting position.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};
// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Controls players potition.
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
    }
};
// This listens for key presses and sends the keys to your
//  Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Instantiating entities.
var Edward = new Enemy();
var Sam = new Enemy();
var Katie = new Enemy();
var allEnemies = [Edward, Sam, Katie];

var player = new Player();