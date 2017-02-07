var svg_keys = [
	{ id: "octave-1-C-key", class: "piano-key white-key", data_key: "C", keyboard_key: "a", stroke: "#555555", fill: "#FFFFF7", x: 0, y: 0, width: 80, height: 400},
	{ id: "octave-1-D-key", class: "piano-key white-key", data_key: "D", keyboard_key: "s", stroke: "#555555", fill: "#FFFFF7", x: 80, y: 0, width: 80, height: 400},
	{ id: "octave-1-E-key", class: "piano-key white-key", data_key: "E", keyboard_key: "d", stroke: "#555555", fill: "#FFFFF7", x: 160, y: 0, width: 80, height: 400},
	{ id: "octave-1-F-key", class: "piano-key white-key", data_key: "F", keyboard_key: "f", stroke: "#555555", fill: "#FFFFF7", x: 240, y: 0, width: 80, height: 400},
	{ id: "octave-1-G-key", class: "piano-key white-key", data_key: "G", keyboard_key: "g", stroke: "#555555", fill: "#FFFFF7", x: 320, y: 0, width: 80, height: 400},
	{ id: "octave-1-A-key", class: "piano-key white-key", data_key: "A", keyboard_key: "h", stroke: "#555555", fill: "#FFFFF7", x: 400, y: 0, width: 80, height: 400},
	{ id: "octave-1-B-key", class: "piano-key white-key", data_key: "B",  keyboard_key: "j", stroke: "#555555", fill: "#FFFFF7", x: 480, y: 0, width: 80, height: 400},
	{ id: "octave-1-C#-key", class: "piano-key black-key", data_key: "C#", keyboard_key: "w", stroke: "#555555", fill: "#4B4B4B", x: 60, y: 0, width: 40, height: 280},
	{ id: "octave-1-D#-key", class: "piano-key black-key", data_key: "D#", keyboard_key: "e", stroke: "#555555", fill: "#4B4B4B", x: 140, y: 0, width: 40, height: 280},
	{ id: "octave-1-F#-key", class: "piano-key black-key", data_key: "F#", keyboard_key: "t", stroke: "#555555", fill: "#4B4B4B", x: 300, y: 0, width: 40, height: 280},
	{ id: "octave-1-G#-key", class: "piano-key black-key", data_key: "G#", keyboard_key: "y", stroke: "#555555", fill: "#4B4B4B", x: 380, y: 0, width: 40, height: 280},
	{ id: "octave-1-A#-key", class: "piano-key black-key", data_key: "A#", keyboard_key: "u", stroke: "#555555", fill: "#4B4B4B", x: 460, y: 0, width: 40, height: 280},

	{ id: "octave-2-C-key", class: "piano-key white-key", data_key: "C", keyboard_key: "k", stroke: "#555555", fill: "#FFFFF7", x: 560, y: 0, width: 80, height: 400},
	{ id: "octave-2-D-key", class: "piano-key white-key", data_key: "D", keyboard_key: "l", stroke: "#555555", fill: "#FFFFF7", x: 640, y: 0, width: 80, height: 400},
	{ id: "octave-2-E-key", class: "piano-key white-key", data_key: "E", keyboard_key: ";", stroke: "#555555", fill: "#FFFFF7", x: 720, y: 0, width: 80, height: 400},
	{ id: "octave-2-F-key", class: "piano-key white-key", data_key: "F", keyboard_key: "/'", stroke: "#555555", fill: "#FFFFF7", x: 800, y: 0, width: 80, height: 400},
	{ id: "octave-2-C#-key", class: "piano-key black-key", data_key: "C#", keyboard_key: "o", stroke: "#555555", fill: "#4B4B4B", x: 620, y: 0, width: 40, height: 280},
	{ id: "octave-2-D#-key", class: "piano-key black-key", data_key: "D#", keyboard_key: "p", stroke: "#555555", fill: "#4B4B4B", x: 700, y: 0, width: 40, height: 280}

]


var margin = {top: 40, right: 20, bottom: 30, left: 40},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

	var x = d3.scaleBand()
	          .range([0, width])
	          .padding(0.1);
	var y = d3.scaleLinear()
	          .range([height, 0]);

	var svg = d3.select("#keyboard").append("svg")
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
			return d.x + 15;
		}
		return d.x + 15;
	})
	.attr("y", function(d) {
		if(d.class.includes("black-key")){
			return d.y + 240;
		}
		return d.y + 360;
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



var keys = {
	"a" : "1-C",
	"w" : "1-C#",
	"s" : "1-D",
	"e" : "1-D#",
	"d" : "1-E",
	"f" : "1-F",
	"t" : "1-F#",
	"g" : "1-G",
	"y" : "1-G#",
	"h" : "1-A",
	"u" : "1-A#",
	"j" : "1-B",
	"k" : "2-C",
	"o" : "2-C#",
	"l" : "2-D",
	"p" : "2-D#",
	";" : "2-E",
	"'" : "2-F"
}

var key_list = [];

var KEYLISTMAX = 10;

function fillToFive(input_str){
	if(input_str.length > 5){
		return input_str
	}
	for(var i = input_str.length; i < 5; i++){
		input_str = "&nbsp" + input_str;
	}
	return input_str;
}

function updateKeyList(new_key) {
	key_list.push(new_key)
	var svg_id = findSVGKey(new_key).replace("#", "\\#")
	var curr_key = d3.select("#" + svg_id);

	var pre_press_fill = curr_key.attr("fill")

	curr_key
	.transition().duration(0)
      .style("fill", "green")
    .transition().duration(1000)
      .style("fill", pre_press_fill)
}

function findSVGKey(key_name) {
	return "octave-" + key_name + "-key";
}

function keyListToString() {
	ret_string = ""
	var start_index = (key_list.length - KEYLISTMAX) < 0 ?
		              0 : key_list.length - KEYLISTMAX
	for (i = start_index; i < key_list.length; i++){
		if(i == key_list.length - 1){
			ret_string += " <span id='currentKey'>" + fillToFive(key_list[i]) + "</span>"
		} else {
			ret_string += fillToFive(key_list[i]);
		}
	}
	return ret_string;
}

function updatePlayer(new_press, holding) {
    // hold note longer if it is in holding
    // process audio here too so we don't get multiple notes for one keydown
    if (new_press && keys[new_press]) {
        console.log('made it')
        updateKeyList(keys[new_press]);
        updateHeat(keys[new_press]);
		majorScaleValues(key_heats);
		$("#key_stream").html(keyListToString())
    }
}


var svg = d3.select('#svg-keyboard')


function keyPressHandler(e, down) {
    if (typeof(keyPressHandler.map) === 'undefined') {
        keyPressHandler.map = {};
    }
    console.log(down)
    console.log(e.key)
    console.log(keyPressHandler.map)
    let new_press = !keyPressHandler.map[e.key] && down ? e.key : null;
    keyPressHandler.map[e.key] = down;
    updatePlayer(new_press, Object.keys(keyPressHandler.map).filter(function(key) {
        return keyPressHandler.map[key];            
    }))
}

$('body').on('keydown', function(e) {
    keyPressHandler(e, true)
})

$('body').on('keyup', function(e) {
    keyPressHandler(e, false)
})
