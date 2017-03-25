const key_order = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
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

function key_index(key, scale) {
    return (key_indices[key] - key_indices[scale] + 12) % 12;
}

let simple_key_weights = [1.5, 0.1, 0.6, 0.3, 0.8, 0.1, 0.2];
let out_of_key_weight = 0.05;
const major_intervals = [2,2,1,2,2,2,1]

const modalities = [
  "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian"
];

const mode_bias = {
  "Ionian": 1.0,
  "Dorian": 0.99,
  "Phrygian": 0.95,
  "Lydian": 0.95,
  "Mixolydian": 0.95,
  "Aeolian": 0.95,
  "Locrian": 0.95
};

function mode_weights(mode) {
    if (typeof(mode_weights.memo) == 'undefined' ||
        typeof(mode_weights.memo[mode]) == 'undefined') {
        if (!mode_weights.memo) mode_weights.memo = {};
        var mode_index = modalities.indexOf(mode);
        var weight_vector = Array.apply(null, Array(12)).map(Number.prototype.valueOf,
                                                         out_of_key_weight)
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
        value += heats[key] / (mode_weights(mode)[key_index(key, scale)]);
    }
    return 10. / value * mode_bias[mode];
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
            values[mode][scale] *= (5. / max_value);
        }
    }
    return values;
}

module.exports = {
    modeScaleValues
}
