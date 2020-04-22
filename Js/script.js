
function PausePlay(el) {
    var el = el.getElementsByClassName('name')[0].innerHTML;
    var audioPlayer = document.getElementById("audio-player");
    audioPlayer.style.visibility = "visible";
    console.log(audioPlayer.currentSrc.substring(73)); //This is a major source of bugs with sound player!!!
    if ((audioPlayer.paused === false) && (audioPlayer.currentSrc.substring(73) === "Sounds/" + el + ".wav")) {
        audioPlayer.pause();
    }
    else if ((audioPlayer.paused === true) && (audioPlayer.currentSrc.substring(73) === "Sounds/" + el + ".wav")){
        audioPlayer.play();
    }
    else {
        audioPlayer.src = "Sounds/" + el + ".wav";
        audioPlayer.play();
    }
}


function ShowHideAMU(AMUchecked) {
    var amu = document.getElementsByClassName('amu');
    if (AMUchecked.checked) {
        for (i=0; i<amu.length; i++) {
            amu[i].style.visibility = 'visible';
        }
    }
    else {
        for (i=0; i<amu.length; i++) {
            amu[i].style.visibility = 'hidden';
        }
    }
}

function ShowHideName(Namechecked) {
    var name = document.getElementsByClassName('name');
    if (Namechecked.checked) {
        for (i=0; i<name.length; i++) {
            name[i].style.visibility = 'visible';
        }
    }
    else {
        for (i=0; i<name.length; i++) {
            name[i].style.visibility = 'hidden';
        }
    }
}

function ShowHideNumber(Numberchecked) {
    var atomicNumber = document.getElementsByClassName('atomic-number');
    if (Numberchecked.checked) {
        for (i=0; i<atomicNumber.length; i++) {
            atomicNumber[i].style.visibility = 'visible';
        }
    }
    else {
        for (i=0; i<atomicNumber.length; i++) {
            atomicNumber[i].style.visibility = 'hidden';
        }
    }
}




//THREEJS STUFF

console.log("working");
            