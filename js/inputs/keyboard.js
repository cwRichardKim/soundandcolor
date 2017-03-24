var keys = {
	"a" : "3-C",
	"w" : "3-C#",
	"s" : "3-D",
	"e" : "3-D#",
	"d" : "3-E",
	"f" : "3-F",
	"t" : "3-F#",
	"g" : "3-G",
	"y" : "3-G#",
	"h" : "3-A",
	"u" : "3-A#",
	"j" : "3-B",
	"k" : "4-C",
	"o" : "4-C#",
	"l" : "4-D",
	"p" : "4-D#",
	";" : "4-E",
	"'" : "4-F"
}


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
    if (typeof(notePressHandler.map) === 'undefined') {
        notePressHandler.map = {};
    }
    let new_key_down = !notePressHandler.map[note] && down ? note : null;
    notePressHandler.map[note] = down;
    if (new_key_down || !down) {
        callListeners(note, down, Object.keys(notePressHandler.map)
                .filter(key => notePressHandler.map[key]));
    }
}

function initialize() {
    $('body').on('keydown', function(e) {
        let note = e.key in keys ? keys[e.key] : null;
        notePressHandler(note, true);
    })

    $('body').on('keyup', function(e) {
        let note = e.key in keys ? keys[e.key] : null;
        notePressHandler(note, false);
    })
}

module.exports = {
    addListener,
    initialize,
}
