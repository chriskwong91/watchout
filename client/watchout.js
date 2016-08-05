// start slingin' some d3 here.
//update scores
var svg = d3.select('body').append('svg').attr('width', 1100).attr('height', 750);
d3.select('.highscore > span').text('highhellow');
d3.select('.current > span').text('currenthellow');
d3.select('.collisions > span').text('collisionhellow');
var nEnemies = 30;
var enemies = [];

// var imgs = svg.selectAll('image').data([0]);
// var newBall = {add: function() {
//   this.enter()
//   .append('svg:image')
//   .attr('xlink:href', 'pokeball.png')
//   .attr('width', 30)
//   .attr('height', 30);
// }
//   };

// imgs.enter()
//   .append('svg:image')
//   .attr('xlink:href', 'pokeball.png')
//   .attr('width', 30)
//   .attr('height', 30);


// add enemies to the page
for (var i = 0; i < nEnemies; i++) {
  enemies[i] = enter()
  .append('svg:image')
  .attr('xlink:href', 'pokeball.png')
  .attr('width', 30)
  .attr('height', 30)
  .attr('x', Math.random() * 500)
  .attr('y', Math.random() * 500);
  // enemies.push({ id: i,
  //                 x: Math.random() * 100,
  //                 y: Math.random() * 100});
}

svg.selectAll('image').data([i]);
var enemiesdata = d3.selectAll('image').data(enemies);

enemiesdata.append('svg').attr('class', 'enemy').attr('cx', i.x).attr('cy', i.y);

//interval to move each enemy to random position on the page, use transition