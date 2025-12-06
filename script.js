var sounds = {
    dog: new Audio("./dog.mp3"),
    clap: new Audio("./clap.mp3"),
    pop: new Audio("./pop.mp3"),
    laugh: new Audio("./laugh.mp3")
};

var buttons = document.querySelectorAll(".sound-btn");
var volumeSlider = document.getElementById("volume");
var muteBtn = document.getElementById("mute-btn");
var isMuted = false;
var lastVolume = volumeSlider.value;

function setVolume(value) {
    var key;
    for (key in sounds) {
        if (sounds.hasOwnProperty(key)) {
            sounds[key].volume = value;
        }
    }
}

setVolume(volumeSlider.value);

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var name = this.getAttribute("data-sound");
        var audio = sounds[name];
        if (!audio) {
            return;
        }
        audio.currentTime = 0;
        audio.play();
    });
}

volumeSlider.addEventListener("input", function () {
    var value = Number(this.value);
    setVolume(value);
    if (value > 0) {
        lastVolume = value;
        if (isMuted) {
            isMuted = false;
            muteBtn.textContent = "Mute";
        }
    }
});

muteBtn.addEventListener("click", function () {
    if (!isMuted) {
        isMuted = true;
        lastVolume = Number(volumeSlider.value);
        volumeSlider.value = 0;
        setVolume(0);
        muteBtn.textContent = "Unmute";
    } else {
        isMuted = false;
        if (!lastVolume) {
            lastVolume = 0.7;
        }
        volumeSlider.value = lastVolume;
        setVolume(lastVolume);
        muteBtn.textContent = "Mute";
    }
});

