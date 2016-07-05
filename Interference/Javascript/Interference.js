


window.addEventListener("DOMContentLoaded", init);

function init() {
	var stage = new createjs.Stage("white dots");
	
	for (var i = 0; i < 54; i++) {
	var circle = new createjs.Shape();
	circle.graphics.beginStroke("black").beginRadialGradientFill(["#FFF", "#000"], [0,1], -10, 0, 45, 0, 0, 55).drawCircle(0, 0, 50);
	circle.x = 100;
	circle.y = 100;
	stage.addChild(circle);
	}