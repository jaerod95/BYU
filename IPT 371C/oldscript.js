window.addEventListener("DOMContentLoaded", init);
var d = document;


function init() {

    document.getElementById("videoButton").addEventListener("mouseover", changeRed);
    document.getElementById("videoButton").addEventListener("mouseleave", changeback);
    document.getElementById("vidSlot").addEventListener("click", upload);

}

function changeRed(event) {
    event.target.src = "youtube-selected.png";
}

function changeback(event) {
    event.target.src = "youtube.png";
}

function upload() {
    var video = prompt("Please paste the URL to your youtube video here", "ex. https://www.youtube.com/watch?v=tpDqfj3v30c");
    video = getSecondPart(video);
    console.log(video);





    d.getElementById("vidSlot").innerHTML =




        "<iframe class='vid' src='https://www.youtube.com/embed/" + video + "?feature=oembed' allowfullscreen='allowfullscreen' frameborder='0'></iframe>";

    console.log(d.getElementById("vidSlot").innerHTML);
}

// gets the special url code for each video
function getSecondPart(str) {
    return str.split('v=')[1];
}