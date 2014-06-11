function TileRenderer(opts) {
	this.tileHeight = 30;
    this.tileWidth = 30;
    this.fileName = "";
    
    this.offx = 0; //determined by block size
    this.offy = 0;
	
	this.shiftx = 0; //determined by pixel size.
	this.shifty = 0;
    
    $.extend(this, opts);
}

TileRenderer.prototype.constructor = TileRenderer

TileRenderer.prototype.constructMap = function(opts) {
    //game.walls.length = 0
    $.extend(this, opts);
    var self = this;
    //console.log(this.fileName)
    $.get(this.fileName,function(data){
        var rows = data.split('\n');
        var y = 0;
        
        for (var i = self.offy ; i < ((self.offy+game.height)/self.tileHeight) ; i++) {
            //console.log(i);
            var cols = rows[i].split(',');
            var x = 0; //the x position of the tiles
            for (var c = self.offx ; c < ((self.offx+game.width)/self.tileWidth) ; c++) {
                //console.log(x, y)
                if (cols[c] === "01") {
                    game.walls.push(new Wall({h: self.tileHeight, w: self.tileWidth, x: x, y: y}));
                }
                x = x + self.tileWidth;
            }
            y = y + self.tileHeight;
        }
        
    });
};

TileRenderer.prototype.shiftMap = function(opts) {
	$.extend(this, opts);
	console.log('shift it!')
};

TileRenderer.prototype.getView = function() {
	
};
