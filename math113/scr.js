var d = document;
var count = 0;

var jrsub = [
    "<div style='width: 100%;height: 100%;background-color: yellow;display: flex;'><div style='background-color: purple;flex-grow: 1;height: 100%;'></div><div style='background-color: blue;flex-grow: 1;height: 100%;'></div></div>",
    "<div style='width: 100%;height: 100%;background-color: yellow;display: flex;'><div style='background-color: purple;flex-grow: 1;height: 100%;'><p>From &theta; = 0:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(0) = 4sin(3(0))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(0) = 0<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (0, 0)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (x, y) = (0, 0)</strong></p></div><div style='background-color: blue;flex-grow: 1;height: 100%;'><p>To &theta; = &pi;/6:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/6) = 4sin(3(&pi;/6))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/6) = 4<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Strong>(r, &theta;) = (4, &pi;/6)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (x, y) = (3.46, 2)</strong></p></div></div>",
    
    
    
    "<div style='width: 100%;height: 100%;background-color: yellow;display: flex;'><div style='background-color: purple;flex-grow: 1;height: 100%;'><p>From &theta; = &pi;/6:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/6) = 4sin(3(&pi;/6))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/6) = 4<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (4, &pi;/6)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (x, y) = (3.46, 2)</strong></p></div><div style='background-color: blue;flex-grow: 1;height: 100%;'><p>To &theta; = &pi;/3:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/3) = 4sin(3(&pi;/3))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/3) = 0<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (0, &pi;/3)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (x, y) = (0, 0)</strong></p></div></div>",
    
    
    
    "<div style='width: 100%;height: 100%;background-color: yellow;display: flex;'><div style='background-color: purple;flex-grow: 1;height: 100%;'><p>From &theta; = &pi;/3:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/3) = 4sin(3(&pi;/3))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/3) = 0<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (0, &pi;/3)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (x, y) = (0, 0)</strong></p></div><div style='background-color: blue;flex-grow: 1;height: 100%;'><p>To &theta; = &pi;/2:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/2) = 4sin(3(&pi;/2))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/2) = &minus;4<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (&minus;4, &pi;/2)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (x, y) = (0, &minus;4)</strong></p></div></div>",
    
    
    "<div style='width: 100%;height: 100%;background-color: yellow;display: flex;'><div style='background-color: purple;flex-grow: 1;height: 100%;'><p>From &theta; = &pi;/2:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/2) = 4sin(3(&pi;/2))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;/2) = &minus;4<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (&minus;4, &pi;/2)</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> (x, y) = (0, &minus;4)</strong></p></div><div style='background-color: blue;flex-grow: 1;height: 100%;'><p>To &theta; = 2&pi;/3:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(2&pi;/3) = 4sin(3(2&pi;/3))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(2&pi;/3) = 0<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (0, 2&pi;/3)</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> (x, y) = (0, 0)</strong></p></div></div>",
    
    
    
    "<div style='width: 100%;height: 100%;background-color: yellow;display: flex;'><div style='background-color: purple;flex-grow: 1;height: 100%;'><p>From &theta; = 2&pi;/3:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(2&pi;/3) = 4sin(3(2&pi;/3))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(2&pi;/3) = 0<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (0, 2&pi;/3)</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> (x, y) = (0, 0)</strong></p></div><div style='background-color: blue;flex-grow: 1;height: 100%;'><p>To &theta; = 5&pi;/6:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(5&pi;/6) = 4sin(3(5&pi;/6))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(5&pi;/6) = 4<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (4, 5&pi;/6)</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> (x, y) = (&minus;3.46, 2)</strong></p></div></div>",
    
    
    
    "<div style='width: 100%;height: 100%;background-color: yellow;display: flex;'><div style='background-color: purple;flex-grow: 1;height: 100%;'><p>From &theta; = 5&pi;/6:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(5&pi;/6) = 4sin(3(5&pi;/6))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(2&pi;/3) = 4<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (4, 5&pi;/6)</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> (x, y) = (&minus;3.46, 2)</strong></p></div><div style='background-color: blue;flex-grow: 1;height: 100%;'><p>To &theta; = &pi;:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&theta;) = 4sin(3&theta;)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;) = 4sin(3(&pi;))<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; r(&pi;) = 0<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(r, &theta;) = (0, &pi;)</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> (x, y) = (0, 0)</strong></p></div></div>"
    
    
    
];

function back() {
    if (count > 0) {
        count--;
    }
    init();
}

function forward() {
    if (count < 6) {
        count++;
    }
    init();
}



function init() {
    switch (count) {
        case 0:
            d.getElementById("subtxt").innerHTML = jrsub[0];
            console.log(d.getElementById("subtxt").innerHTML);
            break;
        case 1:
            d.getElementById("subtxt").innerHTML = jrsub[1];
            console.log(d.getElementById("subtxt").innerHTML);
            break;
        case 2:
            d.getElementById("subtxt").innerHTML = jrsub[2];
            console.log(d.getElementById("subtxt").innerHTML);
            break;
        case 3:
            d.getElementById("subtxt").innerHTML = jrsub[3];
            console.log(d.getElementById("subtxt").innerHTML);
            break;
        case 4:
            d.getElementById("subtxt").innerHTML = jrsub[4];
            console.log(d.getElementById("subtxt").innerHTML);
            break;
        case 5:
            d.getElementById("subtxt").innerHTML = jrsub[5];
            console.log(d.getElementById("subtxt").innerHTML);
            break;
        case 6:
            d.getElementById("subtxt").innerHTML = jrsub[6];
            console.log(d.getElementById("subtxt").innerHTML);
    }

}