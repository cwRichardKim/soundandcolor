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
const keyweight_sliders = require('./js/ui/keyweight_sliders')

$(document).ready(() => {
  layout.initialize();
  keyboard.initialize();
  midi_input.initialize();
  keyboard_ui.initialize();
  midi_sound.initialize();
  heat_plot.initialize();
  probs_graph.initialize();
  simple_view.initialize();
  keyweight_sliders.initialize(simple_model.getKeyWeights());

  keyboard.addListener(midi_sound.keyEvent);
  keyboard.addListener(key_heats.updateHeat);
  keyboard.addListener(keyboard_ui.updateKeyboardUI);
  keyboard.addListener(layout.updateLayout);

  midi_input.addListener(key_heats.updateHeat);
  midi_input.addListener(keyboard_ui.updateKeyboardUI);
  midi_input.addListener(layout.updateLayout);


  keyweight_sliders.addListener(simple_model.updateKeyWeight);


  setInterval(() => {
    let total_heats = key_heats.getTotalHeats();
    let probs_matrix = simple_model.modeScaleValues(total_heats);

    // only processes this stuff if the user is looking at it
    if (layout.getMenuActive()) {
      heat_plot.update(total_heats);
      probs_graph.update(probs_matrix);
    }

    simple_view.updateUI(probs_matrix);
  }, 16);
})
