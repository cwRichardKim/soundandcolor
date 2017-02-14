let DECAY_RATE = -0.001;

// heats with incorporated octaves
// format: {C: {0: 0., 1: 0., ...}, C#: {...}, ...}
var octaved_key_heats = generate_octaved_key_heats();

var total_key_heats = {
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

// generates a map of all keys in all octaves of the format:
// {C: {0: 0., 1: 0., ...}, C#: {...}, ...}
function generate_octaved_key_heats() {
  let keys = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  var heat_map = {};
  for (keyI in keys) {
    var octaves = {}
    for (i = -1; i < 10; i++) {
      octaves[i] = 0.;
    }
    heat_map[keys[keyI]] = octaves;
  }
  return heat_map;
}

function stripNoteOctave(key) {
  let tuple = key.split('-');
  return {note: tuple[1], octave:tuple[0]};
}

function updateTotalHeats() {
  for (var n_i in octaved_key_heats) {
    var note_heat = 0.;
    for (var o_i in octaved_key_heats[n_i]) {
      note_heat += octaved_key_heats[n_i][o_i];
    }
    total_key_heats[n_i] = note_heat;
  }
}

function decayHeat(heat, dt) {
    return heat * Math.exp(DECAY_RATE * dt);
}

function decayNotes() {
  var timestamp = new Date().getTime();
  var dt = timestamp - prev_timestamp;
  prev_timestamp = timestamp;

  for (var n_i in octaved_key_heats) {
    for (var o_i in octaved_key_heats[n_i]) {
      octaved_key_heats[n_i][o_i] = decayHeat(octaved_key_heats[n_i][o_i], dt);
    }
  }
  updateTotalHeats();
}

function updateHeat(octave_key) {
  let key = stripNoteOctave(octave_key);
  curr_key = octave_key;
  decayNotes();
  octaved_key_heats[key.note][key.octave] += 1.;

  if (total_key_heats[key] > max_heat) {
      total_key_heats[key] = max_heat;
  }

  updateHeatPlot(total_key_heats);
  // updateTopKey(total_key_heats)
}

setInterval(function(){
    decayNotes();
    updateHeatPlot(total_key_heats);
    // majorScaleValues(total_key_heats);
}, 20);
