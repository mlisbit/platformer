function Player () {
	Entity.call(this)

	this.hp = 100;

	this.width = 20;
	this.height = 30;

	this.y = 50;
	this.x = 20;
    
    this.jumpspeed = 0.2;

    this.isJumping = true;
    this.isMaxJump = false;
}

/*
    http://www.wildbunny.co.uk/blog/2011/12/11/how-to-make-a-2d-platform-game-part-1/
*/

Player.prototype = Object.create(Entity.prototype)
Player.prototype.constructor = Player

Player.prototype.handleCollision = function() {
    for (var i = 0 ; i < game.walls.length ; i ++) {
        
        var dir = this.colCheck(this, game.walls[i]);
 
        if (dir === "l" || dir === "r") {
            this.xVelocity = 0;
        } else if (dir === "b") {
            this.isMaxJump = false;
            this.jumpspeed = 0.2;
            this.isJumping = false;
            this.yVelocity = 0;
            this.color = "#fff"
        } else if (dir === "t") {
            this.color = "#FE2E2E"
            
            if (this.yVelocity <= 0) {
                this.yVelocity *= -1;
            }
        } else {
            this.isJumping = true;
        }
        
        if (dir) {return dir}
    } 
    return false;
}

Player.prototype.colCheck = function(shapeA, shapeB) {
    /*
    http://www.somethinghitme.com/2013/01/09/creating-a-canvas-platformer-tutorial-part-one/
    */
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
    var vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
    var hWidths = (shapeA.width / 2) + (shapeB.width / 2);
    var hHeights = (shapeA.height / 2) + (shapeB.height / 2);
    var colDir = null;
 
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         
        var oX = hWidths - Math.abs(vX);             
        var oY = hHeights - Math.abs(vY);   
        
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}


Player.prototype.update = function() {
    var speed = 7;
    var gravity = 0.4; //higher the faster you jump/fall
    var friction = 0.65;
    var maxjump = 1;
    
    if (game.keyPressed.up) {
        
        if (!this.isJumping) {
            this.isJumping = true;
            this.yVelocity = -speed*this.jumpspeed;
        } else {
            if (this.jumpspeed <= maxjump && !this.isMaxJump) {
                this.jumpspeed += 0.2;
                this.yVelocity = -speed*this.jumpspeed;
            } else {
                this.isMaxJump = true;
            }
        }
    }
    if (game.keyPressed.left) {
        this.x--;
        if (this.handleCollision() != 'l') {
            this.xVelocity = -speed;
        }
    }
    
    if (game.keyPressed.right) {
        this.x++;
        if (this.handleCollision() != 'r') {
            this.xVelocity = speed;
        }
    }

    /* prevent double jump if max height not reached */
    if (!game.keyPressed.up) {
        this.isMaxJump = true;
    }

    this.xVelocity *= friction;
    this.yVelocity += gravity;
    
    this.x += this.xVelocity;
    this.y += this.yVelocity; 
    
    /* if the player hits the wall, handle it - returns direction too. */
    this.handleCollision();
    
    /* check if the player hit the border of the canvas */
    if(this.y >= game.height-this.height){
        this.y = game.height-this.height;
        var hitGameBorder = new CustomEvent('hitgameborder', { 'side': 'bottom' });
        if (this.isJumping) {document.dispatchEvent(hitGameBorder);}
        this.isJumping = false;
        this.isMaxJump = false;
        this.jumpspeed = 0.2;
    }
    
    
	Entity.prototype.update.apply(this);
};
