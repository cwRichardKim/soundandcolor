
key_note_map = {
	"a": 48,
	"w": 49,
	"s": 50,
	"e": 51,
	"d": 52,
	"f": 53,
	"t": 54,
	"g": 55,
	"y": 56,
	"h": 57,
	"u": 58,
	"j": 59,
	"k": 60,
	"o": 61,
	"l": 62,
	"p": 63,
	";": 64,
	"'": 65
}

window.onload = function () {
	MIDI.loadPlugin({
		soundfontUrl: "js/midi/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var note = 50; // the MIDI note
			var velocity = 127; // how hard the note hits
			// play the note
			$()
			

			$("body").keypress(function(e){
				if(key_note_map[e.key]){
					MIDI.setVolume(0, 100);
					MIDI.noteOn(0, key_note_map[e.key], velocity, delay);
					MIDI.noteOff(0, note, delay + 0.75);
				}
			});
		}
	});
};
