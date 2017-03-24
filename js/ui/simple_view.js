let color_top;
let color_bottom;

// http://www.cleansingfire.org/wp-content/uploads/2012/12/wheel-2.jpg\
// consider: http://www.easy-oil-painting-techniques.org/images/colorwheel12point.jpg
const key_colors_map = {
  "C": "RGB(254, 220, 1)",
  "C#": "RGB(178, 209, 30)",
  "D": "RGB(8, 128, 116)",
  "D#": "RGB(3, 125, 149)",
  "E": "RGB(3, 71, 132)",
  "F": "RGB(0, 30, 103)",
  "F#": "RGB(126, 13, 129)",
  "G": "RGB(200, 17, 107)",
  "G#": "RGB(229, 65, 40)",
  "A": "RGB(254, 105, 13)",
  "A#": "RGB(255, 149, 55)",
  "B": "RGB(255, 168, 35))"
}

const mode_colors = {
  "Ionian": "RGB(254, 220, 1)",
  "Dorian": "RGB(55, 171, 88)",
  "Phrygian": "RGB(3, 125, 149)",
  "Lydian": "RGB(0, 30, 103)",
  "Mixolydian": "RGB(126, 13, 129)",
  "Aeolian": "RGB(200, 17, 107)",
  "Locrian": "RGB(254, 105, 13)",
}

function initialize() {
  color_background = d3.select("#color-background");
  gradient = color_background.select("#gradient");
  color_top = gradient.select("#color1");
  color_bottom = gradient.select("#color2");
}

function extractTopKeyModeConfidence(probs_matrix) {
  let top_key = null;
  let top_mode = null;
  confidence = 0.;
  total = 0.;

  for (var mode in probs_matrix) {
    for (var key in probs_matrix[mode]) {
      let temp_conf = probs_matrix[mode][key];
      total += temp_conf
      if (temp_conf > confidence) {
        confidence = temp_conf;
        top_key = key;
        top_mode = mode;
      }
    }
  }
  return [top_key, top_mode, confidence / total]
}

function updateUI(probs_matrix, velocity) {
  if (probs_matrix) {
    let [top_key, top_mode, confidence] = extractTopKeyModeConfidence(probs_matrix);
    if (top_key && top_mode && confidence  > 0.) {
      let color1 = key_colors_map[top_key];
      let color2 = mode_colors[top_mode];

      let duration = Math.max(1/Math.pow(confidence, 2), 500);

      color_top.transition().duration(100).attr("stop-color", color1);
      color_bottom.transition().duration(100).attr("stop-color", color2);
    }
  }
}

module.exports = {
  initialize,
  updateUI
}
