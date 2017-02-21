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
