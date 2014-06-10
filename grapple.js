function Grapple() {
	Entity.call(this)
}


Grapple.prototype = Object.create(Entity.prototype)
Grapple.prototype.constructor = Grapple

Grapple.prototype.update = function() {
    
	Entity.prototype.update.apply(this);
};
