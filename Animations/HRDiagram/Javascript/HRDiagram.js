/*
 * 
 * High Jump Javascript File
 * Created By Jason Rodriguez
 * 
 */



window.addEventListener("DOMContentLoaded", init);
var test = "TESTING THIS";
var lm1 = false;
var sm1 = false;
var lm2 = false;
var sm2 = false;

function init() {
    disableNext();
    document.getElementById("mainDiv").addEventListener("click", animate);
    loadImages();

}

var images = [];

function loadImages() {
    for (var i = 1; i < 114; i++) {
        var newImage = document.createElement("img");
        newImage.src = '../Media/Images/HRDiagramFrames/' + i + '.png';
        newImage.preload = true;
        newImage.style.width = "721px";
        newImage.style.height = "481px";
        images.push(newImage);
    }
}

function animate(event) {
    var btnClicked = event.target;
    if (btnClicked.innerHTML === "LARGE MASS") {
        hideMasses();
        playAnimation(1, 18, btnClicked);
        lm1 = true;
    }
    else if (btnClicked.innerHTML === "SMALL MASS") {
        hideMasses();
        playAnimation(57, 78, btnClicked);
        sm1 = true;
    }
    else if (btnClicked.innerHTML === "NEXT" && lm1) {
        disableNext();
        playAnimation(19, 37, btnClicked);
        lm1 = false;
        lm2 = true;
    }
    else if (btnClicked.innerHTML === "NEXT" && sm1) {
        disableNext();
        playAnimation(79, 94, btnClicked);
        sm1 = false;
        sm2 = true;
    }
    else if (btnClicked.innerHTML === "NEXT" && lm2) {
        disableNext();
        playAnimation(38, 55, btnClicked);
        lm2 = false;

    }
    else if (btnClicked.innerHTML === "NEXT" && sm2) {
        disableNext();
        playAnimation(95, 112, btnClicked);
        sm2 = false;

    }
    else if (btnClicked.innerHTML === "FINISH") {
        reset();
    }
}

function disableNext() {
    document.getElementById("next").disabled = true;
    document.getElementById("next").style.cursor = "default";
    document.getElementById("next").style.opacity = 0;
}

function showFinish() {
    document.getElementById("next").style.zIndex = 0;
    document.getElementById("finish").style.zIndex = 1;
    document.getElementById("finish").style.opacity = 1;
    document.getElementById("finish").style.cursor = "pointer";
}

function playAnimation(start, finish, btnClicked) {
    yes;
    var yes = setInterval(function() {
        if (start <= finish) {
            document.getElementById("mainDiv").style.backgroundImage = "url('" + images[start].src + "')";
            start++;
        }
        else {
            if (btnClicked.innerHTML === "LARGE MASS" || btnClicked.innerHTML === "SMALL MASS" || start === 38 || start === 95) {
                document.getElementById("next").style.opacity = 1;
                document.getElementById("next").style.cursor = "pointer";
                document.getElementById("next").disabled = false;
                clearInterval(yes);
            }
            else {
                showFinish();
                clearInterval(yes);
            }

        }
    }, 50);
}

function hideMasses() {
    document.getElementById("largeMass").style.opacity = 0;
    document.getElementById("smallMass").style.opacity = 0;
    document.getElementById("smallMass").disabled = true;
    document.getElementById("largeMass").disabled = true;
    document.getElementById("largeMass").style.cursor = "default";
    document.getElementById("smallMass").style.cursor = "default";
}

function reset() {
    document.getElementById("smallMass").disabled = false;
    document.getElementById("largeMass").disabled = false;
    document.getElementById("largeMass").style.opacity = 1;
    document.getElementById("smallMass").style.opacity = 1;
    document.getElementById("next").style.zIndex = 1;
    document.getElementById("finish").style.zIndex = -1;
    document.getElementById("finish").style.opacity = 0;
    document.getElementById("largeMass").style.cursor = "pointer";
    document.getElementById("smallMass").style.cursor = "pointer";
    document.getElementById("mainDiv").style.backgroundImage = "url('" + images[0].src + "')";
}