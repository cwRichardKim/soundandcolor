const keyboard = require('./js/inputs/keyboard');
const midi_input = require('./js/inputs/midi')
const midi_sound = require('./js/ui/midi_sound');
const key_heats = require('./js/models/key_heats');
const simple_model = require('./js/models/simple_model');
const heat_plot = require('./js/ui/heat_graph');
const keyboard_ui = require('./js/ui/keyboard_ui')
const probs_graph = require('./js/ui/probs_graph');
const simple_view = require('./js/ui/simple_view');
const layout = require('./js/ui/layout');

$(document).ready(() => {
  layout.initialize();
  keyboard.initialize();
  midi_input.initialize();
  keyboard_ui.initialize();
  midi_sound.initialize();
  heat_plot.initialize();
  probs_graph.initialize();
  simple_view.initialize();

  keyboard.addListener(midi_sound.keyEvent);
  keyboard.addListener(key_heats.updateHeat);
  keyboard.addListener(keyboard_ui.updateKeyboardUI);

  midi_input.addListener(key_heats.updateHeat);
  midi_input.addListener(keyboard_ui.updateKeyboardUI);
  setInterval(() => {
    heat_plot.update(key_heats.getTotalHeats());
    probs_graph.update(simple_model.modeScaleValues(key_heats.getTotalHeats()));
  }, 16);
})
