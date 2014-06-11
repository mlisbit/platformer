var canvas = document.querySelector('#canvas');
var game = new Game(canvas);
game.map = new TileRenderer({fileName: 'map.csv'});

game.entities = [
    new Background(),
    game.player = new Player(),
    game.walls = []
];

//game.walls.push(new Wall({h: 30, w: 30, x: 20, y: game.height-30}));
//game.walls.push(new Wall({h: 60, w: 300, x: 50, y: game.height-60}));
//game.walls.push(new Wall({h: 30, w: 300, x: 190, y: game.height-160}));
//game.walls.push(new Wall({h: 330, w: 30, x: 590, y: game.height-330}));

game.map.constructMap({offx: 0, offy: 0})
game.start();
canvas.focus();
canvas.width = game.width;
canvas.height = game.height;

function Background() {}

Background.prototype.draw = function(ctx) {
    ctx.fillStyle = "#151515";
    ctx.fillRect(0,0,game.width, game.height); 
	
	ctx.beginPath();
	ctx.moveTo(game.width - game.player.threshold*game.map.tileWidth,0);
	ctx.lineTo(game.width - game.player.threshold*game.map.tileWidth,game.height);
	ctx.strokeStyle = '#fff';
	ctx.stroke()
}