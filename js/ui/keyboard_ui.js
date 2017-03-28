const key_width = 50;
const key_height = 150;
const svg_keys = [
	{ id: "octave-3-C-key", class: "piano-key white-key", data_key: "C", keyboard_key: "a", stroke: "#555555", fill: "#FFFFF7", x: 0, y: 0, width: key_width, height: key_height},
	{ id: "octave-3-D-key", class: "piano-key white-key", data_key: "D", keyboard_key: "s", stroke: "#555555", fill: "#FFFFF7", x: key_width, y: 0, width: key_width, height: key_height},
	{ id: "octave-3-E-key", class: "piano-key white-key", data_key: "E", keyboard_key: "d", stroke: "#555555", fill: "#FFFFF7", x: key_width * 2, y: 0, width: key_width, height: key_height},
	{ id: "octave-3-F-key", class: "piano-key white-key", data_key: "F", keyboard_key: "f", stroke: "#555555", fill: "#FFFFF7", x: key_width * 3, y: 0, width: key_width, height: key_height},
	{ id: "octave-3-G-key", class: "piano-key white-key", data_key: "G", keyboard_key: "g", stroke: "#555555", fill: "#FFFFF7", x: key_width * 4, y: 0, width: key_width, height: key_height},
	{ id: "octave-3-A-key", class: "piano-key white-key", data_key: "A", keyboard_key: "h", stroke: "#555555", fill: "#FFFFF7", x: key_width * 5, y: 0, width: key_width, height: key_height},
	{ id: "octave-3-B-key", class: "piano-key white-key", data_key: "B",  keyboard_key: "j", stroke: "#555555", fill: "#FFFFF7", x: key_width * 6, y: 0, width: key_width, height: key_height},
	{ id: "octave-3-C#-key", class: "piano-key black-key", data_key: "C#", keyboard_key: "w", stroke: "#555555", fill: "#4B4B4B", x: key_width * .75, y: 0, width: key_width / 2, height: key_height * .75},
	{ id: "octave-3-D#-key", class: "piano-key black-key", data_key: "D#", keyboard_key: "e", stroke: "#555555", fill: "#4B4B4B", x: key_width * 1.75, y: 0, width: key_width / 2, height: key_height * .75},
	{ id: "octave-3-F#-key", class: "piano-key black-key", data_key: "F#", keyboard_key: "t", stroke: "#555555", fill: "#4B4B4B", x: key_width * 3.75, y: 0, width: key_width / 2, height: key_height * .75},
	{ id: "octave-3-G#-key", class: "piano-key black-key", data_key: "G#", keyboard_key: "y", stroke: "#555555", fill: "#4B4B4B", x: key_width * 4.75, y: 0, width: key_width / 2, height: key_height * .75},
	{ id: "octave-3-A#-key", class: "piano-key black-key", data_key: "A#", keyboard_key: "u", stroke: "#555555", fill: "#4B4B4B", x: key_width * 5.75, y: 0, width: key_width / 2, height: key_height * .75},

	{ id: "octave-4-C-key", class: "piano-key white-key", data_key: "C", keyboard_key: "k", stroke: "#555555", fill: "#FFFFF7", x: key_width * 7, y: 0, width: key_width, height: key_height},
	{ id: "octave-4-D-key", class: "piano-key white-key", data_key: "D", keyboard_key: "l", stroke: "#555555", fill: "#FFFFF7", x: key_width * 8, y: 0, width: key_width, height: key_height},
	{ id: "octave-4-E-key", class: "piano-key white-key", data_key: "E", keyboard_key: ";", stroke: "#555555", fill: "#FFFFF7", x: key_width * 9, y: 0, width: key_width, height: key_height},
	{ id: "octave-4-F-key", class: "piano-key white-key", data_key: "F", keyboard_key: "\'", stroke: "#555555", fill: "#FFFFF7", x: key_width * 10, y: 0, width: key_width, height: key_height},
	{ id: "octave-4-C#-key", class: "piano-key black-key", data_key: "C#", keyboard_key: "o", stroke: "#555555", fill: "#4B4B4B", x: key_width * 7.75, y: 0, width: key_width / 2, height: key_height * .75},
	{ id: "octave-4-D#-key", class: "piano-key black-key", data_key: "D#", keyboard_key: "p", stroke: "#555555", fill: "#4B4B4B", x: key_width * 8.75, y: 0, width: key_width / 2, height: key_height * .75}
]
let x;
let y;
let svg;
let margin = {top: 40, right: 20, bottom: 10, left: 40},
	width = key_width * 11 + margin.left + margin.right,
	height = key_height + margin.top + margin.bottom;
const on_screen_keys = {
  "3-C":true,
  "3-C#":true,
  "3-D":true,
  "3-D#":true,
  "3-E":true,
  "3-F":true,
  "3-F#":true,
  "3-G":true,
  "3-G#":true,
  "3-A":true,
  "3-A#":true,
  "3-B":true,
  "4-C":true,
  "4-C#":true,
  "4-D":true,
  "4-D#":true,
  "4-E":true,
  "4-F":true
};

let KEYLISTMAX = 10;

function updateKeyboardUI(octave_key, is_key_down, holding) {
  if (octave_key != null) {
    // key_list.push(octave_key);
    var svg_id = findSVGKey(octave_key).replace("#", "\\#");
    var curr_key = d3.select("#" + svg_id);
    var pre_press_fill = curr_key.attr("fill")

    if (is_key_down) {
      curr_key
      .transition().duration(0)
      .style("fill", "green")
      .transition().duration(4000)
      .style("fill", pre_press_fill)
    } else {
      curr_key
      .transition().duration(300)
      .style("fill", pre_press_fill)
    }
  }
}

function findSVGKey(key_name) {
	if (!(key_name in on_screen_keys)) {
		key_name = "3-" + key_name.split("-")[1];
	}
	return "octave-" + key_name + "-key";
}

function initialize() {
  x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
	y = d3.scaleLinear()
        .range([height, 0]);

	svg = d3.select("#keyboard").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform",
			  "translate(" + margin.left + "," + margin.top + ")");

  svg.selectAll(".key")
  	  .data(svg_keys)
  	.enter().append("rect")
  	  .attr("class", function(d) {
  	  	return d.class; })
  	  .attr("id", function(d) { return d.id })
  	  .attr("x", function(d) {
  	  	return d.x;
  	  })
  	  .attr("width", function(d) {
  	  	return d.width;
  	  })
  	  .attr("y", function(d) { return d.y; })
  	  .attr("height", function(d) {
  	  	return d.height;
  	  })
  	  .attr("stroke", function(d) { return d.stroke; })
  	  .attr("fill", function(d) { return d.fill });

  svg.selectAll(".black-key .white-key")
  	.data(svg_keys)
  	.enter().append("text")
  	.attr("x", function(d) {
  		if(d.class.includes("black-key")){
  			return d.x + key_width / 4 - 5;
  		}
  		return d.x + key_width / 2 - 5;
  	})
  	.attr("y", function(d) {
  		if(d.class.includes("black-key")){
  			return d.y + key_height * .75 - 15;
  		}
  		return d.y + key_height - 15;
  	})
  	.attr("font-family", "helvetica")
  	.attr("fill", function(d) {
  		if(d.class.includes("black-key")){
  			return "white";
  		}
  		return "black";
  	})
  	.text( function (d) {
  		return d.keyboard_key;
  	});

  svg = d3.select('#svg-keyboard')
}

module.exports = {
  initialize,
  updateKeyboardUI,
}
