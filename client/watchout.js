// start slingin' some d3 here.

/*
gameOptions =
  height: 450
  width: 700
  nEnemies: 30
  padding: 20
*/



/*	

.attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 2.5);

*/
//// CREATES GAME BOARD 

var bodySelection = d3.select('body');
 
var svgSelection = bodySelection.append('svg')
       .attr('width', 500)
       .attr('height', 500)
       .style('border', '1px solid black');  

///// PLACES ENEMIES ON THE BOARD

var Coordinate = function (x, y) {
  this.x = x;
  this.y = y; 
};

var generatePositions = function (length) {
  var randomPositionArray = [];
  for (var i = 0; i < length; i++) {
    var x = Math.max( (Math.random() * (500 - 50)), 50); // 20 is to account for the radius. 
    var y = Math.max( (Math.random() * (500 - 50)), 50); // 20 is to account for the radius. 
    randomPositionArray[i] = new Coordinate(x, y);
  }
  return randomPositionArray;
};

var initialEnemyPosition = generatePositions(15);

var imagePlacement = svgSelection.selectAll('image')
  .data(initialEnemyPosition)
  .enter()
  .append('image')
  .attr('x', function (d) { return d.x; })
  .attr('y', function (d) { return d.y; })
  .attr('xlink:href', 'shuriken.png')
  .attr('height', 40)
  .attr('width', 40);


///// PLACE PLAYER ON THE BOARD

var drag = d3.behavior.drag()  
  .on('dragstart', function() { player.style('fill', 'red'); })
  .on('drag', function() { player.attr('cx', d3.event.x).attr('cy', d3.event.y); })
  .on('dragend', function() { player.style('fill', 'black'); });


var player = svgSelection.selectAll('circle')
  .data([250])
  .enter()
  .append('circle')
  .attr('cx', function (d) { return d; })
  .attr('cy', function (d) { return d; })
  //.attr('r', 0)
  //.transition().duration(500)
  .attr('r', 15)
  .call(drag)
  .style('fill', 'blue' ); 
  
  //.on('click', testFunction); 


var testFunction = function () {
  console.log('Player node has been clicked on!'); 
};

var testFunction2 = function () {
  console.log('Player node has been dragged on!'); 
};

//var dragPlayer = d3.selectAll('circle').call(d3.behavior.drag().on('start', testFunction2)); 

var playerMove = svgSelection.select('circle').on('click', function(event) {
  this.call(d3.behavior.drag()); 
  testFunction();
  console.log(this);
  console.log(d3.event);
  var container = d3.selectAll('svg');  
  //console.log(container);
  // var mouseX = d3.mouse(d3.select('svg'))[0];
  // var mouseY = d3.mouse(svgSelection)[1];
  //console.log(d3.mouse(d3.selectAll('svg'))); 

}); 

//var playerDrag = svgSelection.select('circle').on('click'); 

var dragged = function (d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this)
  .attr('cx', d.x = d3.event.x)
  .attr('cy', d.y = d3.event.y);
  console.log('We dragged something!?'); 
};

//var playerDrag = d3.behavior.drag().on('drag', testFunction2);
//.on('start', testFunction2);



//var playerDrag = svgSelection.select('circle').drag(); 


var moveEnemies = function () {

  var newEnemyPosition = generatePositions(15); 

  svgSelection.selectAll('image')
	.data(newEnemyPosition)
	.transition().duration(500)
	.attr('x', function (d) { return d.x; })
  .attr('y', function (d) { return d.y; });

};

setInterval(moveEnemies, 1500);


