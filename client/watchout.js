// start slingin' some d3 here.

//// CREATES GAME BOARD 

var score = 0; 
var collisions = 0; 
var highscore = 0; 

var bodySelection = d3.select('body');
 
var svgSelection = bodySelection.append('svg')
       .attr('width', 500)
       .attr('height', 500)
       .style('border', '1px solid black');  

///// PLACES ENEMIES ON THE BOARD

var Coordinate = function (x, y, id) {
  this.x = x;
  this.y = y; 
  this.id = id;
};

var generatePositions = function (length) {
  var randomPositionArray = [];
  for (var i = 0; i < length; i++) {
    var x = Math.max( (Math.random() * (500 - 50)), 50); // 20 is to account for the radius. 
    var y = Math.max( (Math.random() * (500 - 50)), 50); // 20 is to account for the radius. 
    randomPositionArray[i] = new Coordinate(x, y, i);
  }
  return randomPositionArray;
};

var initialEnemyPosition = generatePositions(15);

var imagePlacement = svgSelection.selectAll('image')
  .data(initialEnemyPosition, function (d) { return d.id; })
  .enter()
  .append('image')
  .attr('x', function (d) { return d.x; })
  .attr('y', function (d) { return d.y; })
  //.attr('class', 'enemies')
  .classed('enemies', true)
  .attr('xlink:href', 'shuriken.png')
  .attr('height', 40)
  .text(function(d, i) { return i; })
  .attr('width', 40);


///// PLACE PLAYER ON THE BOARD

var drag = d3.behavior.drag()  
  .on('dragstart', function() { player.style('fill', 'red'); })
  .on('drag', function() { player.attr('cx', function () { return d3.event.x; }).attr('cy', d3.event.y); })
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


var moveEnemies = function () {

  collissionDetection();

  var newEnemyPosition = generatePositions(15); 

  svgSelection.selectAll('image')
	.data(newEnemyPosition)
	.transition().duration(500)
	.attr('x', function (d) { return d.x; })
  .attr('y', function (d) { return d.y; });

  collissionDetection();

};

var collissionDetection = function () {
  var enemies = svgSelection.selectAll('.enemies');
  var player = svgSelection.select('circle');
  var enemiesLength = enemies.length; 

  var playerPositionX = player.attr('cx');
  var playerPositionY = player.attr('cy');
  var playerPosition = new Coordinate (playerPositionX, playerPositionY); 

  var distance = function (obj1, obj2) {
    var x = (obj2.x - obj1.x) * (obj2.x - obj1.x); 
    var y = (obj2.y - obj1.y) * (obj2.y - obj1.y); 
    return Math.sqrt(x + y); 
  }; 

  enemies[0].forEach(function(enemy) {
    var enemyPositionX = enemy.getAttribute('x');
    var enemyPositionY = enemy.getAttribute('y');
    var enemyPosition = new Coordinate ((enemyPositionX + 20), (enemyPositionY + 20) );  

    if (distance(playerPosition, enemyPosition) <= 35) {
      //console.log('COLLISION!');
      if (score > highscore) {
        d3.select('.highscore > span').text(score);
        highscore = score; 
      }
      score = 0; 
      collisions++; 
      d3.select('.collisions > span').text(collisions);
    }
    //console.log(enemy.attr('x')); 
  }); 
  /*
    var currentEnemy = svgSelection.select('.target');
    //console.log(currentEnemy);

    var enemyPositionX = currentEnemy.attr('x');
    var enemyPositionY = currentEnemy.attr('y');
    var enemyPosition = new Coordinate (enemyPositionX, enemyPositionY);  

    var nextEnemy = svgSelection.select('.enemies');
    nextEnemy.classed('target', true); 
    nextEnemy.classed('enemies', false);  


    if (distance(playerPosition, enemyPosition) <= 20) {
      console.log('COLLISION!'); 
    }
  }
  */
};


var incrementScore = function () {
  score++;
  d3.select('.current > span').text(score);
};

setInterval(incrementScore, 50);

setInterval(collissionDetection, 100); 

setInterval(moveEnemies, 1000);


