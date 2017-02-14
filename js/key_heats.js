let DECAY_RATE = -0.001;

var midi_key_heats = generate_midi_key_heats();
console.log("asdfasdfasdfasdfasdf");

var key_heats = {
    "C" : 0.,
	"C#" : 0.,
	"D" : 0.,
	"D#" : 0.,
	"E" : 0.,
	"F" : 0.,
	"F#" : 0.,
	"G" : 0.,
	"G#" : 0.,
	"A" : 0.,
	"A#" : 0.,
	"B" : 0.,
};

var max_heat = 5;

var prev_timestamp = new Date().getTime();
var curr_key = ""

function generate_midi_key_heats() {
  let keys = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  var heat_map = {};
  for (key in keys) {
    var octaves = {}
    for (i = 1; i < 12; i++) {
      octaves[i] = 0.;
    }
    heat_map[key] = octaves;
  }
  return heat_map;
}


function stripOctave(key) {
    return key.split('-')[1];
}

function decayHeat(heat, dt) {
    return heat * Math.exp(DECAY_RATE * dt);
}

function decayNotes() {
    var timestamp = new Date().getTime();
    var dt = timestamp - prev_timestamp;
    prev_timestamp = timestamp;

    for (var k in key_heats) {
        key_heats[k] = decayHeat(key_heats[k], dt);
    }
}

function updateHeat(octave_key) {
    curr_key = octave_key;
    var key = stripOctave(octave_key);
    decayNotes();
    key_heats[key] += 1.;

    if (key_heats[key] > max_heat) {
        key_heats[key] = max_heat;
    }

    updateHeatPlot(key_heats);
    // updateTopKey(key_heats)
}

setInterval(function(){
    decayNotes();
    updateHeatPlot(key_heats);
    // majorScaleValues(key_heats);
}, 20);
