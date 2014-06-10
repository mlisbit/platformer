function Wall(opts) {
    Entity.call(this);
    this.height = opts.h;
    this.width = opts.w;
    
    this.y = opts.y;
	this.x = opts.x;
    
    this.isKillable = false;
    this.color = "#99CCFF"
}


Wall.prototype = Object.create(Entity.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.update = function() {
	Entity.prototype.update.apply(this);
};
