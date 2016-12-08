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

var major_weights = {
    0:  1.5,
    1:  0.05,
    2:  0.1,
    3:  0.05,
    4:  0.6,
    5:  0.3,
    6:  0.05,
    7:  0.8,
    8:  0.05,
    9:  0.1,
    10: 0.05,
    11: 0.2,
};

function majorScaleValue(heats, scale) {
    value = 0;
    for (var key_i in key_order) {
        key = key_order[key_i];
       
        value += heats[key] * major_weights[key_index(key, scale)];
    }
    return value;
}

function majorScaleValues(heats) {
    values = {};
    for (var scale_i in key_order) {
        var scale = key_order[scale_i];
        values[scale] = majorScaleValue(heats, scale);
    }
    console.log(values)
    updateKeyProbs(values);
    updateTopKey(values);
    return values;
}


function updateTopKey (key_heats) {
    console.log(key_heats)

    var top_val = -1
    var top_key = "";

    for (var key in key_heats) {
        console.log("key: " + key)
        console.log("key_heats[key]: " + key_heats[key]);
        console.log("top_val: " + top_val);
        if(key_heats[key] > top_val){
            top_key = key;
            top_val = key_heats[key];
        }
    }
    console.log("key: " + top_key)
    $("#key-guess").html("<h1>" + top_key + "</h1>")
}

