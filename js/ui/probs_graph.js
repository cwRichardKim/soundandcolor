const key_indices = {
  "C": 0,
  "C#": 1,
  "D": 2,
  "D#": 3,
  "E": 4,
  "F": 5,
  "F#": 6,
  "G": 7,
  "G#": 8,
  "A": 9,
  "A#": 10,
  "B": 11
}

const color_map = {
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

const margin = {top: 40, right: 10, bottom: 30, left: 10};
const width = 5//d3.select("#probs-graph").node().getBoundingClientRect().width - margin.left - margin.right;
// width = 480 -
const height = 300 - margin.top - margin.bottom;

function determine_color(v){
	return "rgba(255,0,0," + (v / 5) + ")"
	return "rgb(" + Math.floor(v * 50) + ",0,0)";
}

/*
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
      */

function initialize() {
  let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
  let y = d3.scaleLinear()
    .range([height, 0]);

  let svg = d3.select("#probs-graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  x.domain(Object.keys(key_indices));
  y.domain([0, 100]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("font-family", "helvetica")
    .attr("class", "x axis")
    .call(d3.axisBottom(x));
}
function updateKeyProbs(model_values) {
  for (let mode in model_values) {
    for (let key in model_values[mode]) {
	  let color = determine_color(model_values[mode][key]);
	  d3.select("#" + key.replace("#", "s") + "_" + mode).style("fill", color)
    }
  }

  /*
  var maxKey = "C"
  var maxValue = 0
  for (var key in keys) {
    var value = keys[key];
    if (value > maxValue) {
      maxKey = key;
      maxValue = value
    }

    key = key.replace("#", "_sharp")
    var selector = "#key_bar_" + key;
    d3.select(selector).attr("height", value * 20)

    var key_bar = d3.select("#key_bar_" + key)
    key_bar.attr("height", value * 50)
    key_bar.attr("y", 230 - (value * 50))
  }
  var currentBackground = $("#keyboard").css("background-color")

  var keyboard = d3.select("#keyboard");
  keyboard
    .transition().duration(0)
    .style("background-color", currentBackground)
    .transition().duration(2000)
    .style("background-color", color_map[maxKey])
    */

  // $("#keyboard").css("background-color", color_map[maxKey]);
}
module.exports = {
    initialize,
    update: updateKeyProbs
}
