window.addEventListener("DOMContentLoaded", init);
var JR_pages;
var JR_old_width = "18.3375vw";
var JR_old_height = "28.125vw";


function init() {
    JR_pages = document.getElementsByClassName("JR_carousel_defaults");
    document.getElementById("JR_carousel").addEventListener("click", JR_morph);
    var JR_SHADOW = document.getElementById("JR_shadows");
    document.getElementById("JR_shadows").addEventListener("click", JR_dissapear_shadows);
}

//checks to see if the item clicked on is part of the carousel
function JR_morph(event) {
    if (event.target.classList.contains("JR_carousel_defaults")) {
        JR_turn(event.target);
    }
}
//checks to see where the object is located and how many rotations in what
//direction should be called

function JR_turn(obj) {
    var pos = obj.classList[1];
    if (pos == "p1") {
        JR_rotateRight();
        JR_rotateRight();
    }
    else if (pos == "p2") {
        JR_rotateRight();
    }
    else if (pos == "p3") {
        JR_focus(obj);
    }
    else if (pos == "p4") {
        JR_rotateLeft();
    }
    else if (pos == "p5") {
        JR_rotateLeft();
        JR_rotateLeft();
    }
}

//rotates the carousel one position to the right

function JR_rotateRight() {
    console.log("rotating");
    if (JR_pages[7].classList.contains("p7")) {
        JR_pages[7].classList.add("p7half");
        JR_pages[7].classList.remove(JR_pages[7].classList[1]);
        JR_pages[7].setAttribute("data-styles", JR_pages[7].classList[1]);
    }

    for (var i = 0; i < 7; i++) {
        if (JR_pages[i].classList.contains("p7")) {
            JR_pages[i].classList.add("p7half");
            JR_pages[i].classList.remove(JR_pages[i].classList[1]);
            JR_pages[i].setAttribute("data-styles", JR_pages[i].classList[1]);
        }
        JR_pages[i].classList.add(JR_pages[i + 1].getAttribute("data-styles"));
        JR_pages[i].classList.remove(JR_pages[i].classList[1]);
    }

    JR_pages[7].classList.add(JR_pages[0].getAttribute("data-styles"));
    JR_pages[7].classList.remove(JR_pages[7].classList[1]);
    for (var i = 0; i < 8; i++) {
        JR_pages[i].setAttribute("data-styles", JR_pages[i].classList[1]);
    }
}

//rotates the carousel one to the left

function JR_rotateLeft() {
    if (JR_pages[0].classList.contains("p7half")) {
        JR_pages[0].classList.add("p7");
        JR_pages[0].classList.remove(JR_pages[0].classList[1]);
        JR_pages[0].setAttribute("data-styles", JR_pages[0].classList[1]);
    }
    for (var i = 7; i > 0; i--) {
        if (JR_pages[i].classList.contains("p7half")) {
            JR_pages[i].classList.add("p7");
            JR_pages[i].classList.remove(JR_pages[i].classList[1]);
            JR_pages[i].setAttribute("data-styles", JR_pages[i].classList[1]);
        }
        JR_pages[i].classList.add(JR_pages[i - 1].getAttribute("data-styles"));
        JR_pages[i].classList.remove(JR_pages[i].classList[1]);
    }
    JR_pages[0].classList.add(JR_pages[7].getAttribute("data-styles"));
    JR_pages[0].classList.remove(JR_pages[0].classList[1]);
    for (var i = 0; i < 8; i++) {
        JR_pages[i].setAttribute("data-styles", JR_pages[i].classList[1]);
    }
}

function JR_focus(obj) {
    var JR_shadows_div = document.getElementsByClassName("JR_shadows")[0];
    JR_shadows_div.style.opacity = .8;
    JR_shadows_div.style.zIndex = 30;
    obj.style.width = "22.921vw";
    obj.style.height = "35.156vw";
    obj.style.marginLeft = "38.5395vw";
    obj.style.zIndex = 31;
}

function JR_dissapear_shadows() {
    document.getElementById("JR_shadows").style.opacity = 0;
    document.getElementById("JR_shadows").style.zIndex = -20;
    var JR_return_page;
    for (var i = 0; i < 7; i++) {
        if (JR_pages[i].classList[1] == "p3") {
            JR_return_page = JR_pages[i];
        }
    }
    if (JR_return_page.style.removeProperty) {
        JR_return_page.style.removeProperty('width');
        JR_return_page.style.removeProperty('height');
        JR_return_page.style.removeProperty('z-Index');
        JR_return_page.style.removeProperty('margin-Left');
    }
    else {
        JR_return_page.style.removeAttribute('width');
        JR_return_page.style.removeAttribute('height');
        JR_return_page.style.removeAttribute('z-Index');
        JR_return_page.style.removeAttribute('margin-Left');
    }
}