const keyboard = require('./js/inputs/keyboard');
const midi_sound = require('./js/ui/midi_sound');
const key_heats = require('./js/models/key_heats');
const simple_model = require('./js/models/simple_model');
const heat_plot = require('./js/ui/heat_graph');

$(document).ready(() => {
    keyboard.initialize();
    midi_sound.initialize();
    heat_plot.initialize();
    keyboard.addListener(midi_sound.keyEvent);
    keyboard.addListener(key_heats.updateHeat);
    keyboard.addListener(() =>
        heat_plot.update(key_heats.getTotalHeats()))
})
