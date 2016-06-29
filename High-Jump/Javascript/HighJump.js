/*
 * 
 * High Jump Javascript File
 * Created By Jason Rodriguez
 * 
 */
var IBShow = false;




window.addEventListener("DOMContentLoaded", init);

function init() {
    //Updates Horizontal and Veritcal on click
    document.getElementById("jumper").addEventListener("click", upHV);
    document.getElementById("calcCOM").addEventListener("click", COM);
    document.getElementById("MainTableDiv").addEventListener("click", select);
    document.getElementById("close").addEventListener("click", instruct);
    document.getElementById("instructions").addEventListener("click", instruct);

    var buttons = document.getElementsByTagName("button");


    for (var i = 0; i < buttons.length; i++) {
        buttons[i].className = "butts";
    }

}

function instruct(elem) {
    var iBox = document.getElementById("instructBox");
    if(!IBShow) {
        iBox.style.width = "30vw";
        iBox.style.height = "30vh";
        iBox.style.left = "35vw";
        iBox.style.top = "35vh";
        iBox.style.zIndex = 5;
        iBox.style.transition = "all 1s";
        iBox.style.WebkitTransition = "all 1s";
        iBox.style.opacity = 1;
        document.getElementById("inText").innerHTML = 'Click on the button for the segment you would like to digitize. Then, click on the proximal end of the segment followed by the distal. Continue this process for each segment. Once you are finished, click "Calculate Center of Mass" to display and be provided with the coordinate of the center of mass.';
        setTimeout(function () {
            iBox.children[0].style.fontSize = "1em";
            iBox.children[0].style.opacity = 1;
            iBox.children[1].style.fontSize = "1em";
            iBox.children[1].style.opacity = 1;
        }, 1000);
        
        IBShow = true;

        
    } else {
        iBox.children[0].style.opacity = 0;
        iBox.children[0].style.fontSize = 0;
        iBox.children[1].style.opacity = 0;
        iBox.children[1].style.fontSize = 0;
        iBox.style.width = 0;
        iBox.style.height = 0;
        iBox.style.left = 0;
        iBox.style.top = 0;
        iBox.style.opacity = 0;
        IBShow = false;
        document.getElementById("inText").innerHTML = "0px";
    }
}




function upHV(events) {

    var jimp = events.target;
    var rect = jimp.getBoundingClientRect();
    //X CALCULATIONS
    //calculates how much meter value each x pixel is alotted        
    var MoveX = 2.66 / jimp.offsetWidth;
    //calculates the x value from the left side of the image
    var RealX = events.clientX - rect.left;
    var xMeters = RealX * MoveX;
    xMeters = parseFloat(Math.round(xMeters * 100) / 100).toFixed(2);

    //Y CALCULATIONS
    //calculates how much meter value each y pixel is alotted
    var MoveY = 2.95 / jimp.offsetHeight;

    //calculates the y value from the left side of the image
    var RealY = rect.bottom - events.clientY;
    var yMeters = RealY * MoveY;
    yMeters = parseFloat(Math.round(yMeters * 100) / 100).toFixed(2);

    document.getElementById("hor").innerHTML = xMeters;
    document.getElementById("vert").innerHTML = yMeters;
}

//This function is called when a click is registered on the image
function select(event1) {



    var firstClick = false;
    var secondClick = false;

    //CREATES POINTERS TO SPECIFIC DOM ELEMENTS

    var buttonClicked = event1.target; //points to the button that was clicked
    var buttonParent = buttonClicked.parentElement; //points to div containing button

    //going to img

    var divParent = buttonParent.parentElement; //points to mainTableDiv
    var mainDiv = divParent.parentElement; //points to mainDiv
    var jumperdiv = mainDiv.children; //makes array of all mainDiv Children
    var jumpChild = jumperdiv[0].children; //makes array of mainDiv first child, children
    var jumpPic = jumpChild[0].children; //makes array of mainDivs first child, first child, children
    var jumpimg = jumpPic[0]; //selects first child of jumping div/ or img
    var imgWidth = jumpimg.offsetWidth; //gets width of jumper img
    var imgHeight = jumpimg.offsetHeight; //gets height of img

    //This function is triggered if the click lands on a button
    if (event1.target.className == "butts") {
        //startBlink

        var jumper = document.getElementById("jumper");

        jumper.addEventListener("click", getXY);


        document.getElementById("MainTableDiv").removeEventListener("click", select);

        blink();
    }

    function getXY(event2) {
        var rect = jumpimg.getBoundingClientRect();

        //X CALCULATIONS
        //calculates how much meter value each x pixel is alotted        
        var MoveX = 2.66 / imgWidth;

        //calculates the x value from the left side of the image
        var RealX = event2.clientX - rect.left;
        var xMeters = RealX * MoveX;
        xMeters = Number((xMeters).toFixed(2));
        xMeters = parseFloat(Math.round(xMeters * 100) / 100).toFixed(2);
        //Y CALCULATIONS
        //calculates how much meter value each y pixel is alotted
        var MoveY = 2.95 / imgHeight;

        //calculates the y value from the left side of the image
        var RealY = rect.bottom - event2.clientY;
        var yMeters = RealY * MoveY;
        yMeters = Number((yMeters).toFixed(2));
        yMeters = parseFloat(Math.round(yMeters * 100) / 100).toFixed(2);

        if (!firstClick) {

            //sets the X and Y Meter Variables for the first pair of X and Y

            buttonParent.getElementsByTagName("div")[4].innerHTML = xMeters;
            buttonParent.getElementsByTagName("div")[3].innerHTML = yMeters;
        }
        //sets the X and Y Meter Variables for the second pair of X and Y
        if (firstClick && !secondClick) {
            buttonParent.getElementsByTagName("div")[1].innerHTML = xMeters;
            buttonParent.getElementsByTagName("div")[0].innerHTML = yMeters;
            secondClick = true;
            document.getElementById("MainTableDiv").addEventListener("click", select);
        }
        firstClick = true;
    }
    //makes the selected x and y elements fade in and out.
    function blink() {
        var elem1op = buttonParent.getElementsByTagName("div")[4];
        var elem2op = buttonParent.getElementsByTagName("div")[3];
        var elem3op = buttonParent.getElementsByTagName("div")[1];
        var elem4op = buttonParent.getElementsByTagName("div")[0];
        var ct = 10;
        var ct2 = 0;
        var opacity = 0;
        MyFadeFunction();

        //This function makes the first two divs blink before you click
        //on the picture.
        function MyFadeFunction() {
            if (opacity < 1 && ct != 0 && !firstClick) {
                opacity += .1;
                ct--;
                setTimeout(function() {
                    MyFadeFunction()
                }, 50);
                elem1op.style.opacity = opacity;
                elem2op.style.opacity = opacity;
            }
            else if (opacity > 0 && ct2 < 10 && !firstClick) {
                opacity -= .1;
                ct2++;
                setTimeout(function() {
                    MyFadeFunction()
                }, 50);
                elem1op.style.opacity = opacity;
                elem2op.style.opacity = opacity;

            }
            else if (!firstClick) {
                ct = 10;
                ct2 = 0;
                setTimeout(function() {
                    MyFadeFunction()
                }, 50);
                elem1op.style.opacity = opacity;
                elem2op.style.opacity = opacity;
            }
            else {
                elem1op.style.opacity = 1;
                elem2op.style.opacity = 1;
                ct = 10;
                ct2 = 0;
                opacity = 0;
                //runs second highlight
                MyFadeFunction2();
            }
        }
        //This function causes the two divs of the second click after 
        //selecting a button blink until you click on the picture.
        function MyFadeFunction2() {
            if (opacity < 1 && ct != 0 && !secondClick) {
                opacity += .1;
                ct--;
                setTimeout(function() {
                    MyFadeFunction2()
                }, 50);
                elem3op.style.opacity = opacity;
                elem4op.style.opacity = opacity;
            }
            else if (opacity > 0 && ct2 < 10 && !secondClick) {
                opacity -= .1;
                ct2++;
                setTimeout(function() {
                    MyFadeFunction2()
                }, 50);
                elem3op.style.opacity = opacity;
                elem4op.style.opacity = opacity;

            }
            else if (!secondClick) {
                ct = 10;
                ct2 = 0;
                setTimeout(function() {
                    MyFadeFunction2()
                }, 50);
                elem3op.style.opacity = opacity;
                elem4op.style.opacity = opacity;
            }
            else {
                elem3op.style.opacity = 1;
                elem4op.style.opacity = 1;
            }
        }
    }
}

function COM(eventer) {
    var txtElem = document.getElementsByClassName("txt0");
    var spans = document.getElementsByTagName("span");
    var goFor = true;
    for (var i = 0; i < spans.length; i++) {
        console.log(spans[i].innerHTML);
        if (spans[i].innerHTML === "0.00") {
            goFor = false;
        }
    }
    if (goFor) {

        var DX = [];
        var DY = [];
        var PX = [];
        var PY = [];

        var segCMX = [];
        var segCMY = [];
        var torqueX = [];
        var torqueY = [];

        var CMX = 0;
        var CMY = 0;


        var realTorqueX = [];
        var realTorqueY = [];
        //variables for calculations
        var LPValues = [0.5, 0.5, 0.419, 0.419, 0.428, 0.428, 0.458, 0.458, 0.434, 0.434, 0.468, 0.468, 0.55, 0.5];

        var MPValues = [0.0133, 0.0133, 0.0535, 0.0535, 0.1175, 0.1175, 0.029, 0.029, 0.0157, 0.0157, 0.005, 0.005, 0.082, 0.45];



        for (var i = 0; i < txtElem.length; i += 1) {

            if (!isNaN(txtElem[i].innerHTML))
                DY.push(parseFloat(txtElem[i].innerHTML));
            i++;
            if (!isNaN(txtElem[i].innerHTML))
                DX.push(parseFloat(txtElem[i].innerHTML));
            i++;
            if (!isNaN(txtElem[i].innerHTML))
                PY.push(parseFloat(txtElem[i].innerHTML));
            i++;
            if (!isNaN(txtElem[i].innerHTML))
                PX.push(parseFloat(txtElem[i].innerHTML));
        }
        for (var a = 0; a < LPValues.length; a++) {
            segCMX.push(PX[a] + LPValues[a] * (DX[a] - PX[a]));
            segCMY.push(PY[a] + LPValues[a] * (DY[a] - PY[a]));
        }

        for (var b = 0; b < MPValues.length; b++) {
            torqueX.push(MPValues[b] * segCMX[b]);
            torqueY.push(MPValues[b] * segCMY[b]);
        }

        for (i = 0; i < torqueX.length; i++) {
            if (!isNaN(torqueX[i])) {
                realTorqueX.push(torqueX[i]);
            }
            if (!isNaN(torqueY[i])) {
                realTorqueY.push(torqueY[i]);
            }
        }



        CMX = realTorqueX.reduce(add, 0);
        CMY = realTorqueY.reduce(add, 0);

        CMX = parseFloat(Math.round(CMX * 100) / 100).toFixed(2);
        CMY = parseFloat(Math.round(CMY * 100) / 100).toFixed(2);

        document.getElementById("massCalculated1").innerHTML = CMX + "m";
        document.getElementById("massCalculated2").innerHTML = CMY + "m";

        addYellowDot(CMX, CMY);

        function add(a, b) {
            return a + b;
        }


        function addYellowDot(X, Y) {

            //CALCULATES THE X AND Y OF THE YELLOW DOT
            var jimp = document.getElementById("jumper");
            var rect = jimp.getBoundingClientRect();
            //X CALCULATIONS
            //calculates how much meter value each x pixel is alotted        
            var MoveX = 2.66 / jimp.offsetWidth;

            var RealX = X / MoveX;
            var NX = RealX + rect.left;


            var MoveY = 2.95 / jimp.offsetHeight;
            //Y CALCULATIONS
            //calculates how much meter value each y pixel is alotted
            var RealY = Y / MoveY;
            var NY = rect.bottom - RealY;

            var yellow = document.getElementById("yellowDot");
            yellow.style.opacity = 1;
            yellow.style.marginLeft = (NX - 8) + "px";
            yellow.style.marginTop = (NY - 8) + "px";
        }
    }
    else {
        alert("Please assign a value to all parts of the body before calculating the center of mass.");
    }
}
