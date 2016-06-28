/*
 * 
 * High Jump Javascript File
 * Created By Jason Rodriguez
 * 
 */



window.addEventListener("DOMContentLoaded", init);
var test = "TESTING THIS";

function init() {
    document.getElementById("largeMass").addEventListener("click", large);
    loadImages();

}

var images = [];

function loadImages() {
    for (var i = 1; i < 114; i++) {
        var newImage = document.createElement("img");
        newImage.src = '../Media/Images/frames/' + i + '.png';
        newImage.preload = true;
        newImage.style.width = "721px";
        newImage.style.height = "481px";
        images.push(newImage);
        console.log(test);
    }
}

function large(event) {
    hideMasses();
    var con = playAnimation(1, 18);
    if (con) {
        console.log("YOOOOOO");
        document.getElementById("next").addEventListener("click", playAnimation(19, 37));
    }
}

function hideMasses() {
    document.getElementById("largeMass").style.opacity = 0;
    document.getElementById("smallMass").style.opacity = 0;
}

function playAnimation(start, finish) {
    document.getElementById("next").style.opacity = 0;
    yes;
    

var yes = setInterval(function() {
    console.log(test);
    if (start <= finish) {
        document.getElementById("mainDiv").style.backgroundImage = "url('" + images[start].src + "')";
        start++;
    }
    else {
        clearInterval(yes);
        document.getElementById("next").style.opacity = 1;
    }
}, 50);
}