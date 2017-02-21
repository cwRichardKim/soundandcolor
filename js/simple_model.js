var key_order = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
var key_indices = {
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

var simple_key_weights = [1.5, 0.1, 0.6, 0.3, 0.8, 0.1, 0.2];
var out_of_key_weight = 0.05;
var major_intervals = [2,2,1,2,2,2,1]

function set_simple_key_weights(updated_key_weights) {
    simple_key_weights = updated_key_weights;
}

function set_out_of_key_weight(updated_out_of_key_weight) {
    out_of_key_weight = updated_out_of_key_weight;
}

var modalities = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

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
            values[mode][scale] *= (5. / max_value);
        }
    }
    return values;
}

function majorScaleValue(heats, scale) {
    value = 0;
    for (var key_i in key_order) {
        key = key_order[key_i];
        value += heats[key] / (mode_weights("Ionian")[key_index(key, scale)]);
    }
    return 10. / value;
}

function majorScaleValues(heats) {
    console.log(heats)
    values = {};
    max_value = 0;
    for (var scale_i in key_order) {
        var scale = key_order[scale_i];
        values[scale] = majorScaleValue(heats, scale);
        if (values[scale] > max_value) {
            max_value = values[scale];
        }
    }
    for (var scale_i in key_order) {
        var scale = key_order[scale_i];
        values[scale] *= (5. / max_value);
    }
    updateKeyProbs(values);
    updateTopKey(values);
    return values;
}


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

