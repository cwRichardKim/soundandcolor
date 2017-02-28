const keyboard = require('./js/inputs/keyboard');
const midi_sound = require('./js/ui/midi_sound');
const key_heats = require('./js/models/key_heats');
const simple_model = require('./js/models/simple_model');

$(document).ready(() => {
    keyboard.initialize();
    midi_sound.initialize();
    keyboard.addListener(midi_sound.keyEvent);
    keyboard.addListener(key_heats.updateHeat);
    keyboard.addListener(() =>
        console.log(simple_model.modeScaleValues(key_heats.getTotalHeats())));
})
