/*
 * 
 * High Jump Javascript File
 * Created By Jason Rodriguez
 * 
 */

window.addEventListener("DOMContentLoaded", init);

var inames = ["72.png", "73.png", "basalt.png", "basaltBig.png", "Granite.png", "GraniteBig.png", "Limestone.png", "LimestoneBig.png", "MarbleGneissSchist.png", "MarbleGneissSchistBig.png", "ShaleSandstone.png", "ShaleSandstoneBig.png"];
var images = [];


function preloadimages() {
    for (var i = 0; i < 12; i++) {
        images[i] = document.createElement("img");
        images[i].src = "../Media/Images/RockIdentification/" + inames[i];
    }
}

function init() {
    preloadimages();
    document.getElementById("mainDiv").addEventListener("click", display);
}






function display(event) {
    var imgbox = document.getElementById("imgbox");
    var txt = document.getElementById("text");
    imgbox.style.opacity = 1;
    if (event.target.className === "one button") {
        imgbox.src = images[3].src;
        txt.innerHTML = "<p>This is an igneous rock (volcanic) that has formed from lava that cooled on the surface of the earth.  It is called basalt, and although it is not all rare on continents, most of it is found at the seafloor.  Basalt crystallizes quickly, and so the individual minerals that constitute it are small and not visible without magnification.</p>"
    }
    else if (event.target.className === "two button") {
        imgbox.src = images[11].src;
        txt.innerHTML = "<p>These layers represent sedimentary rocks. Some sedimentary rocks, as these pictured here, consist of fragments of previously existing rocks that have been eroded and deposited in layers. The samples pictured are sandstone and shale.</p>"
    }
    else if (event.target.className === "three button") {
        imgbox.src = images[7].src;
        txt.innerHTML = "<p>Like the tan layers, these are sedimentary rocks. The sample you see here is limestone, which may form as a chemical precipitate from warm, shallow seas.</p>"
    }
    else if (event.target.className === "four button") {
        imgbox.src = images[5].src;
        txt.innerHTML = "<p>This igneous rock (plutonic) is granite. It has crystallized beneath the surface, and because it has cooled slowly, the individual mineral crystals are large enough to be seen easily.</p>"
    }
    else if (event.target.className === "five button") {
        imgbox.src = images[9].src;
        txt.innerHTML = "<p>These contorted purple layers represent metamorphic rocks. Here you see pictured three typical metamorphic rocks-marble, schist, and gneiss.</p>"

    }
}