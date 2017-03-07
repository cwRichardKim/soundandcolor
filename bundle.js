(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const keyboard = require('./js/inputs/keyboard');
const midi_sound = require('./js/ui/midi_sound');
const key_heats = require('./js/models/key_heats');
const simple_model = require('./js/models/simple_model');
const heat_plot = require('./js/ui/heat_graph');

$(document).ready(() => {
    keyboard.initialize();
    midi_sound.initialize();
    heat_plot.initialize();
    keyboard.addListener(midi_sound.keyEvent);
    keyboard.addListener(key_heats.updateHeat);
    setInterval(() => heat_plot.update(key_heats.getTotalHeats()), 16);
});

},{"./js/inputs/keyboard":2,"./js/models/key_heats":3,"./js/models/simple_model":4,"./js/ui/heat_graph":5,"./js/ui/midi_sound":6}],2:[function(require,module,exports){
/*var svg_keys = [
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


let on_screen_keys = {"1-C":true,"1-C#":true,"1-D":true,"1-D#":true,"1-E":true,"1-F":true,"1-F#":true,"1-G":true,"1-G#":true,"1-A":true,"1-A#":true,"1-B":true,"2-C":true,"2-C#":true,"2-D":true,"2-D#":true,"2-E":true,"2-F":true};
const MIDIMAP = generateMIDIMAP();

var key_list = [];

var KEYLISTMAX = 10;

// generates the midi map from 0: 1-C to 120: 12-C
function generateMIDIMAP() {
	let notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
	midimap = {};
	for (i = 0; i <= 120; i++) {
		midimap[i] =  Math.floor(i/12 - 1).toString() + "-" + notes[i % 12];
	}
	return midimap;
}

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
	key_list.push(new_key);
	var svg_id = findSVGKey(new_key).replace("#", "\\#");
	var curr_key = d3.select("#" + svg_id);
	var pre_press_fill = curr_key.attr("fill")

	curr_key
	.transition().duration(0)
      .style("fill", "green")
    .transition().duration(1000)
      .style("fill", pre_press_fill)
}

function findSVGKey(key_name) {
	if (!(key_name in on_screen_keys)) {
		key_name = "1-" + key_name.split("-")[1];
	}
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

// Processes heats and graphs. Does not process sounds. Called every key up and
// down event. should deal with both keyboard and midi
// new_key_down: if this is a keydown event, includes the new (musical) key (eg: 2-C)
// holding: contains all the (musical) keys still playing (eg: 2-C)
function updatePlayer(new_key_down, holding) {
  // hold note longer if it is in holding
  // process audio here too so we don't get multiple notes for one keydown
	updateHeat(new_key_down, holding);
  if (new_key_down) {
    updateKeyList(new_key_down);
		// majorScaleValues(key_heats);
		$("#key_stream").html(keyListToString());
  }
}


var svg = d3.select('#svg-keyboard')

navigator
  .requestMIDIAccess()
  .then(
    midi => {
    	var FIRST = midi.inputs.values().next().value;
			FIRST.addEventListener('midimessage', midiHandler);
    }
  );

function midiHandler (msg) {
	if (msg.data && msg.data.length >= 3) {
		let isKeyDown = msg.data[0] == 144;
		let isKeyUp = msg.data[0] == 128;

		let keyIndex = msg.data[1];
		let note = keyIndex in MIDIMAP ? MIDIMAP[keyIndex] : null;
		let velocity = msg.data[2];
		let delay = 0;
		if(isKeyDown){
			MIDI.setVolume(0, 100);
			MIDI.noteOn(0, keyIndex, velocity, delay);
			notePressHandler(note, true);
		} else if (isKeyUp) {
			MIDI.noteOff(0, keyIndex, delay);
			notePressHandler(note, false);
		}
	}
}
*/

var keys = {
	"a": "3-C",
	"w": "3-C#",
	"s": "3-D",
	"e": "3-D#",
	"d": "3-E",
	"f": "3-F",
	"t": "3-F#",
	"g": "3-G",
	"y": "3-G#",
	"h": "3-A",
	"u": "3-A#",
	"j": "3-B",
	"k": "4-C",
	"o": "4-C#",
	"l": "4-D",
	"p": "4-D#",
	";": "4-E",
	"'": "4-F"
};

let listeners = [];
function callListeners(new_key, is_key_down, held_keys) {
	for (let i = 0; i < listeners.length; ++i) {
		listeners[i](new_key, is_key_down, held_keys);
	}
}

function addListener() {
	for (let i = 0; i < arguments.length; ++i) {
		listeners.push(arguments[i]);
	}
}

// updates a dictionary of musical notes (eg: 2-C) with keydown / keyup events
// should be ambiguous as to where the input comes from (keybaord, MIDI)
function notePressHandler(note, down) {
	if (typeof notePressHandler.map === 'undefined') {
		notePressHandler.map = {};
	}
	let new_key_down = !notePressHandler.map[note] && down ? note : null;
	notePressHandler.map[note] = down;
	if (new_key_down || !down) {
		callListeners(note, down, Object.keys(notePressHandler.map).filter(key => notePressHandler.map[key]));
	}
}

function initialize() {
	$('body').on('keydown', function (e) {
		let note = e.key in keys ? keys[e.key] : null;
		notePressHandler(note, true);
	});

	$('body').on('keyup', function (e) {
		let note = e.key in keys ? keys[e.key] : null;
		notePressHandler(note, false);
	});
}

module.exports = {
	addListener,
	initialize
};

},{}],3:[function(require,module,exports){
const DECAY_RATE = -0.001;

// heats with incorporated octaves
// format: {C: {0: 0., 1: 0., ...}, C#: {...}, ...}
let octaved_key_heats = generate_octaved_key_heats();

let total_key_heats = {
  "C": 0.,
  "C#": 0.,
  "D": 0.,
  "D#": 0.,
  "E": 0.,
  "F": 0.,
  "F#": 0.,
  "G": 0.,
  "G#": 0.,
  "A": 0.,
  "A#": 0.,
  "B": 0.
};

const max_heat = 5;

let prev_timestamp = new Date().getTime();

// generates a map of all keys in all octaves of the format:
// {C: {0: 0., 1: 0., ...}, C#: {...}, ...}
function generate_octaved_key_heats() {
  let keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  var heat_map = {};
  for (keyI in keys) {
    var octaves = {};
    for (i = -1; i < 10; i++) {
      octaves[i] = 0.;
    }
    heat_map[keys[keyI]] = octaves;
  }
  return heat_map;
}

function stripNoteOctave(key) {
  let tuple = key.split('-');
  return { note: tuple[1], octave: tuple[0] };
}

function updateTotalHeats() {
  for (var n_i in octaved_key_heats) {
    var note_heat = 0.;
    for (var o_i in octaved_key_heats[n_i]) {
      note_heat += octaved_key_heats[n_i][o_i];
    }
    total_key_heats[n_i] = Math.min(note_heat, max_heat);
  }
}

function decayHeat(heat, dt) {
  return heat * Math.exp(DECAY_RATE * dt);
}

function decayNotes(holding) {
  if (typeof holding !== 'undefined') {
    decayNotes.holding = holding;
  }
  var timestamp = new Date().getTime();
  var dt = timestamp - prev_timestamp;
  prev_timestamp = timestamp;

  for (var n_i in octaved_key_heats) {
    for (var o_i in octaved_key_heats[n_i]) {
      if (!decayNotes.holding || !decayNotes.holding.includes(o_i + "-" + n_i)) {
        octaved_key_heats[n_i][o_i] = decayHeat(octaved_key_heats[n_i][o_i], dt);
      }
    }
  }
  updateTotalHeats();
}

function updateHeat(octave_key, is_key_down, holding) {
  decayNotes(holding);
  if (octave_key && is_key_down) {
    let key = stripNoteOctave(octave_key);
    octaved_key_heats[key.note][key.octave] += 1.;
  }
  //updateHeatPlot(total_key_heats);
}

setInterval(function () {
  decayNotes();
  //updateHeatPlot(total_key_heats);
}, 20);

module.exports = {
  updateHeat,
  getTotalHeats: () => total_key_heats
};

},{}],4:[function(require,module,exports){
const key_order = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
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
};

function key_index(key, scale) {
    return (key_indices[key] - key_indices[scale] + 12) % 12;
}

let simple_key_weights = [1.5, 0.1, 0.6, 0.3, 0.8, 0.1, 0.2];
let out_of_key_weight = 0.05;
const major_intervals = [2, 2, 1, 2, 2, 2, 1];

const modalities = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

function mode_weights(mode) {
    if (typeof mode_weights.memo == 'undefined' || typeof mode_weights.memo[mode] == 'undefined') {
        if (!mode_weights.memo) mode_weights.memo = {};
        var mode_index = modalities.indexOf(mode);
        var weight_vector = Array.apply(null, Array(12)).map(Number.prototype.valueOf, out_of_key_weight);
        var offset = 0;
        for (var i = 0; i < 7; ++i) {
            weight_vector[offset] = simple_key_weights[i];
            offset += major_intervals[(mode_index + i) % 8];
        }
        mode_weights.memo[mode] = weight_vector;
    }
    return mode_weights.memo[mode];
}

function modeScaleValue(heats, mode, scale) {
    let value = 0;
    for (var key_i in key_order) {
        let key = key_order[key_i];
        value += heats[key] / mode_weights(mode)[key_index(key, scale)];
    }
    return 10. / value;
}

// function that returns the mode / scale weights object
// {"mode: {"scale": weight}
//
//
function modeScaleValues(heats) {
    let values = {};
    let max_value = 0;
    for (var mode_i in modalities) {
        let mode = modalities[mode_i];
        values[mode] = {};
        for (var scale_i in key_order) {
            var scale = key_order[scale_i];
            values[mode][scale] = modeScaleValue(heats, mode, scale);
            if (values[mode][scale] > max_value) {
                max_value = values[mode][scale];
            }
        }
    }
    for (var mode_i in modalities) {
        let mode = modalities[mode_i];
        for (var scale_i in key_order) {
            var scale = key_order[scale_i];
            values[mode][scale] *= 5. / max_value;
        }
    }
    return values;
}

module.exports = {
    modeScaleValues
};

/*
function updateTopKey (key_heats) {
    console.log(key_heats)

    var top_val = -1
    var top_key = "";

    for (var key in key_heats) {
        if(key_heats[key] > top_val){
            top_key = key;
            top_val = key_heats[key];
        }
    }
    console.log("key: " + top_key)
    $("#key-guess").html("<h1>" + top_key + "</h1>")
    $("#keyboard").css("background-color", color_map[top_key]);
}

*/

},{}],5:[function(require,module,exports){
// In the process of refactoring this file into a module


const CELL_WIDTH = 35;
const CELL_HEIGHT = 35;
const modalities = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
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
};
const margin = { top: 40, right: 0, bottom: 30, left: 80 };
const width = 500;
const height = 300 - margin.top - margin.bottom;
let heat_values;
let svg;
let heat_data;
let x_k;
let y_k;
let svg_k;

function determine_y(mode) {
  for (var i in modalities) {
    var m = modalities[i];
    if (m == mode) {
      return i * CELL_HEIGHT;
    }
  }
}

function determine_x(key_name) {
  for (var k in key_indices) {
    if (key_name == k) {
      return key_indices[k] * CELL_WIDTH;
    }
  }
}

function determine_color(v) {
  return "rgba(255,0,0," + v / 5 + ")";
  return "rgb(" + Math.floor(v * 50) + ",0,0)";
}

function generate_heat_values() {
  let ret = [];
  for (var i = 0; i < 7; i++) {
    svg.append("text").attr("y", determine_y(modalities[i]) + 15).attr("x", -margin.left).text(modalities[i]);
    for (var key_name in key_indices) {
      if (i == 0) {
        svg.append("text").attr("y", determine_y(modalities[i]) - 10).attr("x", determine_x(key_name) + 10).text(key_name);
      }
      ret.push({
        "key_name": key_name,
        "mode": modalities[i],
        "weight": 0
      });
    }
  }
  return ret;
}

function redraw(data) {
  for (var i in data) {
    var d = data[i];
    var color = determine_color(d.weight);
    d3.select("#" + d.key_name.replace("#", "s") + "_" + d.mode).style("fill", color);
  }
}

function initialize() {
  heat_data = [{ "name": "C", "val": 0 }, { "name": "C#", "val": 0 }, { "name": "D", "val": 0 }, { "name": "D#", "val": 0 }, { "name": "E", "val": 0 }, { "name": "F", "val": 0 }, { "name": "F#", "val": 0 }, { "name": "G", "val": 100 }, { "name": "G#", "val": 0 }, { "name": "A", "val": 0 }, { "name": "A#", "val": 0 }, { "name": "B", "val": 0 }];
  let margin_k = { top: 40, right: 20, bottom: 30, left: 40 };
  let width_k = d3.select("#key-graph").node().getBoundingClientRect().width - margin_k.left - margin_k.right;
  let height_k = 300 - margin_k.top - margin_k.bottom;

  x_k = d3.scaleBand().range([0, width_k]).padding(0.1);

  y_k = d3.scaleLinear().range([height_k, 0]);

  svg_k = d3.select("#key-graph").append("svg").attr("width", width_k + margin_k.left + margin_k.right).attr("height", height_k + margin_k.top + margin_k.bottom).append("g").attr("transform", "translate(" + margin_k.left + "," + margin_k.top + ")");

  svg = d3.select("#heat-graph").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  heat_values = generate_heat_values();
  svg.selectAll("cells").data(heat_values).enter().append("rect").attr("x", function (d) {
    return determine_x(d.key_name);
  }).attr("y", function (d) {
    return determine_y(d.mode);
  }).style("fill", function (d) {
    return "white";
  }).attr("id", function (d) {
    return d.key_name.replace("#", "s") + "_" + d.mode;
  }).attr("class", "cell").attr("rx", 3).attr("ry", 3).attr("width", CELL_WIDTH).attr("height", CELL_HEIGHT).attr("stroke", "black").style("fill-opacity", 1).style("stroke-radius", 2);

  x_k.domain(heat_data.map(function (d) {
    return d.name;
  }));
  y_k.domain([0, d3.max(heat_data, function (d) {
    return d.val;
  })]);

  svg_k.selectAll(".bar").data(heat_data).enter().append("rect").attr("class", "bar").attr("id", function (d) {
    var name = d.name.replace("#", "_sharp");
    return "bar_" + name;
  }).attr("x", function (d) {
    return x_k(d.name);
  }).attr("width", x_k.bandwidth()).attr("y", function (d) {
    return y_k(d.val);
  }).attr("height", function (d) {
    return height - y_k(d.val);
  });

  svg_k.append("g").attr("transform", "translate(0," + height_k + ")").attr("font-family", "helvetica").call(d3.axisBottom(x_k));
}

function updateHeatPlot(weights) {
  // 	var heat_model_values = modeScaleValues(weights);
  // 	for (var i in heat_values){
  // 		curr_heat = heat_values[i]
  // 		var cell_value = heat_model_values[curr_heat.mode][curr_heat.key_name];
  // 		heat_values[i].weight = cell_value
  // 	}
  //
  // 	redraw(heat_values);

  svg_k.selectAll(".bar").attr("fill", "red");
  for (var key in weights) {
    var value = weights[key];
    key = key.replace("#", "_sharp");
    var selector = "#bar_" + key;
    // console.log(value)
    d3.select(selector).attr("height", value * 20);

    var key_bar = d3.select("#bar_" + key);
    key_bar.attr("height", value * 50);
    key_bar.attr("y", 230 - value * 50);
  }
}

module.exports = {
  initialize,
  update: updateHeatPlot
};

},{}],6:[function(require,module,exports){
function generateMIDIMAP() {
    let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    midimap = {};
    for (i = 0; i <= 120; i++) {
        midimap[Math.floor(i / 12 - 1).toString() + "-" + notes[i % 12]] = i;
    }
    return midimap;
}

const delay = 0; // play one note every quarter second
const note = 50; // the MIDI note
const velocity = 127; // how hard the note hits

const key_note_map = generateMIDIMAP();

function initialize() {
    MIDI.loadPlugin({
        soundfontUrl: "js/midi/",
        instrument: "acoustic_grand_piano",
        onsuccess: function () {
            MIDI.setVolume(0, 100);
        }
    });
}

function keyEvent(new_key, is_key_down, held_keys, new_velocity = velocity, new_delay = delay) {
    if (is_key_down) {
        MIDI.noteOn(0, key_note_map[new_key], new_velocity, new_delay);
    } else {
        MIDI.noteOff(0, key_note_map[new_key], new_delay);
    }
}

module.exports = {
    initialize,
    keyEvent
};

},{}]},{},[1]);
