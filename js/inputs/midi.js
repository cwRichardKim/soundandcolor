
let MIDIMAP;

// generates the midi map from 0: 1-C to 120: 12-C
function generateMIDIMAP() {
	let notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
	midimap = {};
	for (i = 0; i <= 120; i++) {
		midimap[i] =  Math.floor(i/12 - 1).toString() + "-" + notes[i % 12];
	}
	return midimap;
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

function midiHandler (msg) {
  if (msg.data && msg.data.length >= 3) {
    let isKeyDown = msg.data[0] == 144 && msg.data[2] !== 0;
    let isKeyUp = msg.data[0] == 128 || msg.data[2] === 0;
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

function initialize () {
  MIDIMAP = generateMIDIMAP();
  navigator
  .requestMIDIAccess()
  .then(
    midi => {
      var FIRST = midi.inputs.values().next().value;
      FIRST.addEventListener('midimessage', midiHandler);
    }
  );
}


module.exports = {
  initialize,
  addListener,
}
