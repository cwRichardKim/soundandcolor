var CELL_WIDTH = 35;
var CELL_HEIGHT = 35;

var margin = {top: 40, right: 0, bottom: 30, left: 80},
width = 500;
height = 300 - margin.top - margin.bottom;



var svg = d3.select("#heat-graph").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", 
		          "translate(" + margin.left + "," + margin.top + ")");

function determine_y(mode) {
	console.log(mode)
	for (var i in modalities){
		var m = modalities[i]
		if(m == mode){
			return i * CELL_HEIGHT;
		}
	}
}

function determine_x(key_name) {
	for (var k in key_indices){
		if(key_name == k){
			return key_indices[k] * CELL_WIDTH
		}
	}
}

function determine_color(v){
	return "rgba(255,0,0," + (v / 5) + ")"
	return "rgb(" + Math.floor(v * 50) + ",0,0)";
}



var heat_values = []
for (var i = 0; i < (7); i++){
	svg.append("text").attr("y", determine_y(modalities[i]) + 15).attr("x", -margin.left).text(modalities[i])
	for (var key_name in key_indices){
		if(i == 0){
			console.log(determine_x(key_name))
			svg.append("text").attr("y", determine_y(modalities[i]) - 10).attr("x", determine_x(key_name) + 10).text(key_name)
		}
		heat_values.push({
			"key_name" : key_name,
			"mode" : modalities[i],
			"weight" : 0
		})
	}
}

svg.selectAll("cells")
      	.data(heat_values)
      	.enter().append("rect")
      	.attr("x", function(d){return determine_x(d.key_name)})
      	.attr("y", function(d){
      		console.log(determine_y(d.mode))
      		return determine_y(d.mode)
      	})
      	.style("fill", function(d){
      		return "white"
      	})
      	.attr("id", function(d){return d.key_name.replace("#", "s") + "_" + d.mode})
      	.attr("class", "cell")
      	.attr("rx", 3)
    	.attr("ry", 3)
      	.attr("width", CELL_WIDTH)
      	.attr("height", CELL_HEIGHT)
      	.attr("stroke", "black")
      	.style("fill-opacity", 1)
      	.style("stroke-radius", 2);

function redraw(data){
	for (var i in data){
		var d = data[i]
		var color = determine_color(d.weight);
		d3.select("#" + d.key_name.replace("#", "s") + "_" + d.mode).style("fill", color)
	}
}




var heat_data = [
	{"name": "C", "val": 0},
	{"name": "C#", "val": 0},
	{"name": "D", "val": 0},
	{"name": "D#", "val": 0},
	{"name": "E", "val": 0},
	{"name": "F", "val": 0},
	{"name": "F#", "val": 0},
	{"name": "G", "val": 100},
	{"name": "G#", "val": 0},
	{"name": "A", "val": 0},
	{"name": "A#", "val": 0},
	{"name": "B", "val" : 0}
]

var margin_k = {top: 40, right: 20, bottom: 30, left: 40},
width_k = d3.select("#key-graph").node().getBoundingClientRect().width 
        - margin_k.left - margin_k.right;
height_k = 300 - margin_k.top - margin_k.bottom;

var x_k = d3.scaleBand()
          .range([0, width_k])
          .padding(0.1);
var y_k = d3.scaleLinear()
          .range([height_k, 0]);

var svg_k = d3.select("#key-graph").append("svg")
		    .attr("width", width_k + margin_k.left + margin_k.right)
		    .attr("height", height_k + margin_k.top + margin_k.bottom)
		  .append("g")
		    .attr("transform", 
		          "translate(" + margin_k.left + "," + margin_k.top + ")");

x_k.domain(heat_data.map(function(d) { return d.name; }));
	y_k.domain([0, d3.max(heat_data, function(d) { return d.val; })]);

	svg_k.selectAll(".bar")
      .data(heat_data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("id", function(d){ 
      	var name = d.name.replace("#", "_sharp")
      	return "bar_" + name
      })
      .attr("x", function(d) { return x_k(d.name); })
      .attr("width", x_k.bandwidth())
      .attr("y", function(d) { return y_k(d.val); })
      .attr("height", function(d) { return height - y_k(d.val); })

svg_k.append("g")
  .attr("transform", "translate(0," + height_k + ")")
  .attr("font-family", "helvetica")
  .call(d3.axisBottom(x_k));


function updateHeatPlot(weights) {
 	var heat_model_values = modeScaleValues(weights);
 	for (var i in heat_values){
 		curr_heat = heat_values[i]
 		var cell_value = heat_model_values[curr_heat.mode][curr_heat.key_name];
 		heat_values[i].weight = cell_value
 	}

 	redraw(heat_values);



 	svg_k.selectAll(".bar").attr("fill", "red");
	for (var key in weights){
		var value = weights[key];
		key = key.replace("#", "_sharp")
		var selector = "#bar_" + key;
		// console.log(value)
		d3.select(selector).attr("height", value * 20)

		var key_bar = d3.select("#bar_" + key)
		key_bar.attr("height", value * 50)
		key_bar.attr("y", 230 - (value * 50))
	}
}
