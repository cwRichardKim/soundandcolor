// var heat_data = [
// 	{"name": "C", "val": 0},
// 	{"name": "C#", "val": 0},
// 	{"name": "D", "val": 0},
// 	{"name": "D#", "val": 0},
// 	{"name": "E", "val": 0},
// 	{"name": "F", "val": 0},
// 	{"name": "F#", "val": 0},
// 	{"name": "G", "val": 100},
// 	{"name": "G#", "val": 0},
// 	{"name": "A", "val": 0},
// 	{"name": "A#", "val": 0},
// 	{"name": "B", "val" : 0}
// ]

var margin = {top: 40, right: 20, bottom: 30, left: 40},
width = 480 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

var svg = d3.select("#probs-graph").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", 
		          "translate(" + margin.left + "," + margin.top + ")");

x.domain(heat_data.map(function(d) { return d.name; }));
y.domain([0, d3.max(heat_data, function(d) { return d.val; })]);

	svg.selectAll(".prob_bar")
      .data(heat_data)
    .enter().append("rect")
      .attr("class", "prob_bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.val); })
      .attr("height", function(d) { return height - y(d.val); })
      .on("mouseover", function(d){
      	d3.select(this).attr("fill", "#AA0030")
      })
      .on("mouseout", function(){
      	d3.select(this).attr("fill", "black")
      });

svg.selectAll(".text")
	.data(heat_data)
	.enter().append("text")
	.attr("x", function(d) { return x(d.name) + 2; })
	.attr("y", function(d) { return y(d.val) + 15; })
	.attr("font-family", "helvetica")
	.attr("fill", "white")
	.text( function (d) { if(d.val != 0) 
							return d.val;  
						  return ""});

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("font-family", "helvetica")
  .call(d3.axisBottom(x));