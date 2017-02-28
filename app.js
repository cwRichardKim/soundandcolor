const keyboard = require('./js/inputs/keyboard');
const midi_sound = require('./js/ui/midi_sound');

$(document).ready(() => {
    keyboard.initialize();
    midi_sound.initialize();
    keyboard.addListener(midi_sound.keyEvent);
})
