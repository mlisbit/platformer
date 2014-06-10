function TileRenderer() {
	this.tileHeight = 30;
    this.tileWidth = 30;
}

TileRenderer.prototype.constructor = TileRenderer

TileRenderer.prototype.constructMap = function(file) {
	//console.log(file)
    //console.log(game.walls)
    var self = this;
    $.get(file,function(data){
        var rows = data.split('\n');
        var y = 0;
        
        
        for (var i = 0 ; i < rows.length ; i++) {
            var cols = rows[i].split(',');
            var x = 0; //the x position of the tiles
            
            for (var c = 0 ; c < cols.length ; c++) {
                console.log(x, y)
                if (cols[c] === "01") {
                    game.walls.push(new Wall({h: self.tileHeight, w: self.tileWidth, x: x, y: y}));
                }
                x = x + self.tileWidth;
            }
            y = y + self.tileHeight;
        }
        
    });
};

TileRenderer.prototype.getView = function() {
	
};
