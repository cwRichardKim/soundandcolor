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
  "C": "rgb(40, 0, 120)",
  "C#": "rgb(50, 20, 110)",
  "D": "rgb(60, 40, 100)",
  "D#": "rgb(70, 60, 90)",
  "E": "rgb(80, 80, 80)",
  "F": "rgb(90, 100, 70)",
  "F#": "rgb(100, 120, 60)",
  "G": "rgb(110, 140, 50)",
  "G#": "rgb(120, 160, 40)",
  "A": "rgb(130, 180, 30)",
  "A#": "rgb(140, 200, 20)",
  "B": "rgb(150, 220, 10)"
}

var margin = {top: 40, right: 10, bottom: 30, left: 10};
width = d3.select("#probs-graph").node().getBoundingClientRect().width - margin.left - margin.right;
// width = 480 - 
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