function PausePlay(el) {
    var el = el.getElementsByClassName('name')[0].innerHTML;
    var audioPlayer = document.getElementById("audio-player");
    audioPlayer.style.visibility = "visible";
    console.log("Sounds/" + el + ".wav")
    console.log(audioPlayer.currentSrc.substring(35)); //This is a major source of bugs with sound player!!! fix pls!
    if ((audioPlayer.paused === false) && (audioPlayer.currentSrc.substring(35) === el + ".wav")) {
        audioPlayer.pause();
    }
    else if ((audioPlayer.paused === true) && (audioPlayer.currentSrc.substring(35) === el + ".wav")){
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

//-----------Download Page------------//


$('.files-container > a').mouseover(function(){
    mouseOverFile(this);
})

$('.files-container > a').mouseout(function(){
    mouseOutFile(this);
})

$('.files-container > a').click(function(){
    fileClicked(this);
})


function mouseOverFile(file) {
    var str = file.innerHTML;
    var fileName = str.substring(0, str.length - 4);
    document.getElementById(fileName).classList.add('hovered');
}

function mouseOutFile(file) {
    var str = file.innerHTML;
    var fileName = str.substring(0, str.length - 4);
    document.getElementById(fileName).classList.remove('hovered');
}

function fileClicked(file) {
    var str = file.innerHTML;
    var fileName = str.substring(0, str.length - 4);
    var checkBox = document.getElementsByName(fileName)[0].nextElementSibling;
    if (checkBox.classList.contains('checkmark-visible')) {
        checkBox.classList.remove('checkmark-visible');
        document.getElementById(fileName).classList.remove('checked');
    }
    else {
        checkBox.classList.add('checkmark-visible');
        document.getElementById(fileName).classList.add('checked');
    }
    buttonUpdate();
}




function selectAllChecked() {
    var tiles = document.getElementsByClassName('element');
    console.log(tiles);
    var boxes = document.getElementsByClassName('checkmark');
    if (document.getElementById('select-all-box').classList.contains('checkmark-visible')) {
        for (i=0; i<boxes.length; i++) {
            boxes[i].classList.remove('checkmark-visible');
        }
        for (i=0; i<tiles.length; i++) {
            tiles[i].classList.remove('checked');
        }
    }
    else {
        for (i=0; i<boxes.length; i++) {
            boxes[i].classList.add('checkmark-visible');
        }
        for (i=0; i<tiles.length; i++) {
            tiles[i].classList.add('checked');
        }
    }
    buttonUpdate();
}



$('.checkbox-container-main input').click(function() {
    boxChecked(this);
});

function boxChecked(box) {
    var name = box.name;
    if (box.nextElementSibling.classList.contains('checkmark-visible')) {
        box.nextElementSibling.classList.remove('checkmark-visible');
        document.getElementById(name).classList.remove('checked');
    }
    else {
        box.nextElementSibling.classList.add('checkmark-visible');
        document.getElementById(name).classList.add('checked');
    }
    buttonUpdate();
}


$('.table-graph-container .element').click(function(){
    tileClicked(this);
})

function tileClicked(tile) {
    var id = tile.id;
    var checkBox = document.getElementsByName(id)[0].nextElementSibling;
    if (tile.classList.contains('checked')) {
        tile.classList.remove('checked');
        checkBox.classList.remove('checkmark-visible');
    }
    else {
        tile.classList.add('checked');
        checkBox.classList.add('checkmark-visible');
    }
    buttonUpdate();
}

//-----------Download Button------------//

function buttonUpdate() {
    if ($('.checkmark-visible').length == 0) {
        $('.download-button').hide(400);
        $('.download-description').hide(400);
    }
    else {
        var files = $('.checkmark-visible');
        var num = files.length;
        let fileSize = 0;
        for (i=0; i<files.length; i++) {
            var adder = files[i].title;
            fileSize += parseInt(adder);
        }
        fileSize = fileSize/1000;
            if ($('.checkmark-visible').length == 1) {
                $('.download-description').html(num + " file | " + Math.round(fileSize) + " MB");
            } 
            else {
                $('.download-description').html(num + " files | " + Math.round(fileSize) + " MB");
            }
        $('.download-button').show(400);
        $('.download-description').show(400);
    }
}

function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function downloadZip() {
    //Find all selected files
    let url = ""
    var zip = new JSZip();
    var files = $('.checkbox-container > span');
    var folder = [];
    for (i=0; i<files.length; i++) {
        if (files[i].classList.contains('checkmark-visible')) {
            var fileName = "Sounds/" + files[i].previousElementSibling.name + ".wav";
            zip.file(fileName, urlToPromise(fileName), {binary:true});
            //folder.push("Sounds/" + files[i].previousElementSibling.name + ".wav");
        }
    }
    zip.generateAsync({type:"blob"})
    .then(function(blob) {
    saveAs(blob, "Sounds.zip");
    });
}
