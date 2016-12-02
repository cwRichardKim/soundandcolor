let DECAY_RATE = -0.001;

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

function stripOctave(key) {
    return key.split('-')[1];
}

function decayHeat(heat, dt) {
    return heat * Math.exp(DECAY_RATE * dt);
}

function updateHeat(octave_key) {
    var key = stripOctave(octave_key);
    var timestamp = new Date().getTime();
    var dt = timestamp - prev_timestamp;
    prev_timestamp = timestamp;
    for (var k in key_heats) {
        key_heats[k] = decayHeat(key_heats[k], dt);
    }
    key_heats[key] += 1.;
    if (key_heats[key] > max_heat) {
        key_heats[key] = max_heat;
    }
    console.log(key_heats);
}
