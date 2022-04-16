// "use strict";
// //location.reload(true);

// // Background Color
// const color1 = document.querySelector(".color1");
// color1.addEventListener('change', colorModified1);

// function colorModified1(event) {
//     // const cur_gCO = ctx.globalCompositeOperation
//     // ctx.globalCompositeOperation = 'destination-over'
//     // ctx.fillStyle = event.target.value;
//     // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     // ctx.globalCompositeOperation = cur_gCO
//     canvasElement.style["background-color"] = event.target.value
// }

// // Pen color
// const color2 = document.querySelector(".color2");
// color2.addEventListener('change', colorModified2);
// let cur_color = "#000000";

// function colorModified2(event) {
//     ctx.strokeStyle = event.target.value
// }

// // width bar
// const width = document.querySelector("#width");
// let cur_width = 5;
// width.addEventListener('change', widthModified);

// function widthModified(event) {
//     cur_width = event.target.value / 5;
// }

//Mouse
const canvasElement = document.querySelector('canvas');
const ctx = canvasElement.getContext('2d');
ctx.canvas.width = 800;
ctx.canvas.height = 600;

let is_down = 0;
let cur_x = 0;
let cur_y = 0;
let cur_width = 5;

canvasElement.addEventListener('mousedown', mouseDown);
canvasElement.addEventListener('mouseup', mouseUp);
canvasElement.addEventListener('mousemove', mouseMove);
//canvasElement.addEventListener('mouseout', mouseUp);
let images = []

function mouseDown(event) {
    is_down = 1;
    cur_x = event.offsetX;
    cur_y = event.offsetY;
    ctx.beginPath();
    ctx.lineWidth = cur_width;
}

function mouseUp(event) {
    is_down = 0;
    ctx.closePath();
    let image = canvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream");
    //console.log(image)
    // if (!localStorage.images)
    //     localStorage.images = [];
    images.push(image);
    console.log(images)
    for (im of images) {
        display = document.createElement("img")
        display.src = im
        document.body.append(display)
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function mouseMove(event) {
    if (is_down) {
        //ctx.moveTo(cur_x,cur_y);
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.stroke()
        cur_x = event.offsetX
        cur_y = event.offsetY
    }
}