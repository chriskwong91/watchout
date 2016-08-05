// start slingin' some d3 here.


var test2 = d3.select('body').selectAll('div')
	.data(['red', 'blue', 'green'])
	.enter()
	.append('span')
	.style("background-color", function (d) {
		return d; 
	})
	.attr("r", 0)
	.transition().duration(1000)
	.attr("r", 2.5);


/*
gameOptions =
  height: 450
  width: 700
  nEnemies: 30
  padding: 20
*/



/*	

.attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 2.5);

*/


/////////
// Example to handle all three states. 
/////////
/*
var circle = svg.selectAll("circle")
  .data(data);

circle.exit().remove();

circle.enter().append("circle")
    .attr("r", 2.5)
  .merge(circle)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
*/

////// Animation 
/*
circle.enter().append("circle")
    .attr("r", 0)
  .transition()
    .attr("r", 2.5);
*/


var bodySelection = d3.select("body");
 
var svgSelection = bodySelection.append("svg")
       .attr("width", 500)
       .attr("height", 500)
       .style("border", "1px solid black");  

/*
var circleSelection = svgSelection.append("circle")
       .attr("cx", 25)
       .attr("cy", 25)
       .attr("r", 0)
       .style("fill", "blue")
	   .transition().duration(1000)
	   .attr("r", 25);
*/

var positionData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var alphabetColor = function (num) {
	var alphabet = 'abcdef';
	alphabet = alphabet.split('');
	var colorCombo = "#";
	for (var i = 0; i < 3; i++) {
		var index = Math.floor(alphabet.length * Math.random());
		colorCombo += alphabet[index]; 
	}
	var num = Math.floor((Math.random() * 1000) - 10);
	colorCombo += num; 
	return colorCombo;
}

var circleSelection2 = svgSelection.selectAll("circle")
	.data(positionData)
	.enter()
	.append("circle")
	.attr("cx", function (d) { return d * 1.5 * 25; })
    .attr("cy", function (d) { return d * 1.5 * 25; })
    .attr("r", 0)
    //.style("fill", function (d) { return alphabetColor() + (Math.floor((Math.random * 1000) - 10)) } )
    .style("fill", function (d) { return alphabetColor(); } )
    .transition().duration(500)
    .attr("r", 20);
    //.style("background-image", "url(nic-cage.png)" )
/*
var circleSelectionPlayer = d3.select("svg")
	.data([1])
	.enter()
	.append("circlePlayer")
	.attr("cx", function (d) { return 250; })
    .attr("cy", function (d) { return 250; })
    .attr("r", 0)
    //.style("fill", function (d) { return alphabetColor() + (Math.floor((Math.random * 1000) - 10)) } )
    .style("fill", function (d) { return alphabetColor(); } )
    .transition().duration(500)
    .attr("r", 20);
    .text( 'P' );
*/
var randomPositionData = []

function Coordinate(x, y) {
	this.x = x;
	this.y = y; 
}

var generatePositions = function (length) {
	for (var i = 0; i < length; i++) {
		var x = Math.floor(Math.random() * (500 - 50)); // 20 is to account for the radius. 
		var y = Math.floor(Math.random() * (500 - 50)); // 20 is to account for the radius. 
		randomPositionData[i] = new Coordinate(x,y);
	}
}

generatePositions(10); 

/*
for (var j = 0; j < 10; j++) {
	generatePositions();
	circleMove
}
*/

var move = function () {
	var randomSpots = generatePositions(10); 

    svgSelection.selectAll("circle")
	.data(randomPositionData)
	.attr("r", 20)
	.transition().duration(500)
	.style("fill", function (d) { return alphabetColor(); } )
	.attr("cx", function (d) { return d.x })
    .attr("cy", function (d) { return d.y });

}

setInterval(move, 1500);

/*
generatePositions();

var circleMove = svgSelection.selectAll("circle")
	.data(randomPositionData)
	.attr("r", 20)
	.transition().duration(500)
	.attr("cx", function (d) { return d })
    .attr("cy", function (d) { return d });



var circleMove = svgSelection.selectAll("circle")
	.data(randomPositionData)
	.attr("r", 20)
	.transition().duration(500)
	.attr("cx", function (d) { return d })
    .attr("cy", function (d) { return d });

*/
