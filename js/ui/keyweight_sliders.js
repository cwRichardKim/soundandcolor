let listeners = [];
function callListeners(keyIndex, newValue) {
    for (let i = 0; i < listeners.length; ++i) {
        listeners[i](keyIndex, newValue);
    }
}

function addListener() {
    for (let i = 0; i < arguments.length; ++i) {
        listeners.push(arguments[i]);
    }
}

function initialize(origKeyWeights) {


	//add sliders with values based on origKeyWeights
	slidersHTML = "";
	for (let i = 0; i < origKeyWeights.length; i++){
		slidersHTML += '<input class="weight-slider" type="range" name="' + i +
						'" min="0", max="4" step=".1" value=' + origKeyWeights[i] + '>';
	}

	$('#key-weights').html(slidersHTML);

	$('.weight-slider').on("change", function() {
    	const keyIndex = Number(this.name);
    	const newValue = Number(this.value);
    	callListeners(keyIndex, newValue);
	});

}



module.exports = {
	addListener,
	initialize
}