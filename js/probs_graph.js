var key_data = [
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

var color_map = {
  "C": "rgb(0, 60, 0)",
  "C#": "rgb(30, 60, 60)",
  "D": "rgb(60, 60, 60)",
  "D#": "rgb(60, 60, 60)",
  "E": "rgb(120, 60, 60)",
  "F": "rgb(150, 60, 60)",
  "F#": "rgb(180, 60, 60)",
  "G": "rgb(210, 60, 60)",
  "G#": "rgb(240, 60, 60)",
  "A": "rgb(255, 60, 60)",
  "A#": "rgb(255, 60, 60)",
  "B": "rgb(255, 60, 60)"
}

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
      .attr("fill", function(d) {
        return color_map[d.name]
      })
      .attr("id", function(d) {
        var name = d.name.replace("#", "_sharp")
        return "key_bar_" + name
      })
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.val); })
      .attr("height", function(d) { return height - y(d.val); });


svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("font-family", "helvetica")
  .attr("class", "x axis")
  .call(d3.axisBottom(x));

function updateKeyProbs (keys) {
  var maxKey = "C"
  var maxValue = 0
  for (var key in keys){
    var value = keys[key];
    if(value > maxValue) {
      maxKey = key;
    }

    key = key.replace("#", "_sharp")
    var selector = "#key_bar_" + key;
    d3.select(selector).attr("height", value * 20)

    var key_bar = d3.select("#key_bar_" + key)
    key_bar.attr("height", value * 50)
    key_bar.attr("y", 230 - (value * 50))
  }
  $("#keyboard").css("background-color", color_map[maxKey]);
}