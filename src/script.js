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
const canvasElement = document.querySelector('#canvas-overlay');
const ctx = canvasElement.getContext('2d');
ctx.canvas.width = 800;
ctx.canvas.height = 600;

const hiddenCanvasElement = document.querySelector('#canvas-hidden');
const hidden_ctx = hiddenCanvasElement.getContext('2d');
hidden_ctx.canvas.width = 800;
hidden_ctx.canvas.height = 600;

let is_down = 0;
let cur_x = 0;
let cur_y = 0;
let cur_width = 5;

canvasElement.addEventListener('mousedown', mouseDown);
canvasElement.addEventListener('mouseup', mouseUp);
canvasElement.addEventListener('mousemove', mouseMove);
//canvasElement.addEventListener('mouseout', mouseUp);
let images = []

function fadeOut() {
    let cnt = 0
    let curTimeOut = 0
    function run () {
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        cnt++;
        if (cnt >= 8) {return}
        curTimeOut = setTimeout(run,200);
    }
    curTimeOut = setTimeout(run,200);
}

function mouseDown(event) {
    is_down = 1;
    cur_x = event.offsetX;
    cur_y = event.offsetY;
    ctx.beginPath();
    ctx.lineWidth = cur_width;

    hidden_ctx.beginPath();
    hidden_ctx.lineWidth = cur_width;
}

function mouseUp(event) {
    is_down = 0;
    ctx.closePath();
    hidden_ctx.closePath();
    let image = hiddenCanvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream");
    //console.log(image)
    // if (!localStorage.images)
    //     localStorage.images = [];
    images.push(image);
    console.log(images)
    for (im of images) {
        display = document.createElement("img")
        display.display = "block"
        display.src = im
        document.body.append(display)
    }
    hidden_ctx.clearRect(0, 0, hidden_ctx.canvas.width, hidden_ctx.canvas.height);
    fadeOut()
}

function mouseMove(event) {
    if (is_down) {
        //ctx.moveTo(cur_x,cur_y);
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.stroke()
        hidden_ctx.lineTo(event.offsetX, event.offsetY)
        hidden_ctx.stroke()
        cur_x = event.offsetX
        cur_y = event.offsetY
    }
}