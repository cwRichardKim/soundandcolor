function generateMIDIMAP() {
    let notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    midimap = {};
    for (i = 0; i <= 120; i++) {
        midimap[Math.floor(i/12 - 1).toString() + "-" + notes[i % 12]] = i;
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
        onsuccess: function() {
            MIDI.setVolume(0, 100);
        }
    });
}

function keyEvent(new_key,
                  is_key_down,
                  held_keys,
                  new_velocity=velocity,
                  new_delay=delay) {
    if (is_key_down) {
        MIDI.noteOn(0, key_note_map[new_key], new_velocity, new_delay);
    } else {
        MIDI.noteOff(0, key_note_map[new_key], new_delay);
    }
}

module.exports = {
    initialize,
    keyEvent
}
