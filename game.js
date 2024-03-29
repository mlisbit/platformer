function Game(canvas) {
    var self = this;
    
    this.ctx = canvas.getContext("2d");
    this.width = 900;
    this.height = 600;
    
    this.keyPressed = {};
    this.canvasObject = $('#canvas');
    
    //$('#canvas').style.width = 900
    this.canvasObject.on('keydown keyup', function(e) {
        var keyName = Game.keys[e.which]
        
        if (keyName) {
            self.keyPressed[keyName] = e.type === 'keydown';
            e.preventDefault();
        }
    });
    
    $('#canvas').width = 180;
}

Game.keys = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
}

Game.prototype.start = function() {
    var self = this;
    var fps = 60;
    var interval = 1000/fps;
    
    setInterval(function() {
        self.update();
        self.draw();
    }, interval);
}

Game.prototype.update = function() {
    this.entities.forEach(function(entity) {
        if (entity instanceof Array) {
            entity.forEach(function(entity) {
                entity.update()
            });
        } else {
            if (entity.update) {entity.update()}
        }
    });
    
    
    //console.log(game.player.x/20)
}

Game.prototype.draw = function() {
    var self = this;
    this.entities.forEach(function(entity) {
        if (entity instanceof Array) {
            entity.forEach(function(entity) {
                entity.draw(self.ctx)
            });
        } else {
            if (entity.draw) {entity.draw(self.ctx)};
        }
    })
}

document.addEventListener('hitgameborder', function (e) {}, false);

document.addEventListener('hitthresholdborder', function (e) {
    //game.walls.length = 0;
	console.log(game.map.offx)
	game.map.offx += 1
    //game.map.constructMap({offy: 0})
	game.map.shiftMap({shiftx: 1 })
	game.player.x = game.width - game.player.threshold*game.map.tileWidth;
}, false);