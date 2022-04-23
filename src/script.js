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

/*
const tesseract = require("Tesseract.js");
*/

//  Selecting drawing board
const canvasElement = document.querySelector('#canvas-overlay');
const ctx = canvasElement.getContext('2d');
ctx.canvas.width  = 0.8 * window.innerWidth;
ctx.canvas.height = 0.8 * window.innerHeight;

const hiddenCanvasElement = document.querySelector('#canvas-hidden');
const hidden_ctx = hiddenCanvasElement.getContext('2d');
hidden_ctx.canvas.width  = ctx.canvas.width;
hidden_ctx.canvas.height = ctx.canvas.height;

//  Mouse

canvasElement.addEventListener('mousedown', mouseDown);
canvasElement.addEventListener('mousemove', mouseMove);
canvasElement.addEventListener('mouseup', mouseUp);
canvasElement.addEventListener('mouseout', mouseUp);

let images = []

//  create fade out effect for the finished drawing
function fadeOut()  {
    let itr = 0;
    function run()  {
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        itr++;

        if (itr >= 20)
            return;
        setTimeout(run, 25);
    }
    setTimeout(run, 25);
}

let is_down = 0;
let cur_width = 5;

var rect = canvasElement.getBoundingClientRect();

function mouseDown(event)   {
    is_down = 1;

    ctx.beginPath();
    ctx.lineWidth = cur_width;

    hidden_ctx.beginPath();
    hidden_ctx.lineWidth = cur_width;
}
function mouseMove(event)   {
    if (is_down) {
        let cur_x = event.offsetX;
        let cur_y = event.offsetY;

        ctx.lineTo(cur_x, cur_y);
        ctx.stroke()
        hidden_ctx.lineTo(cur_x, cur_y);
        hidden_ctx.stroke()
    }
}

function mouseUp(event) {
    is_down = 0;
    ctx.closePath();
    hidden_ctx.closePath();
    let image = hiddenCanvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream");
    // console.log(image)
    // if (!localStorage.images)
    //      localStorage.images = [];
    // images.push(image);
    // console.log(images)
    // for (im of images) {
    //     display = document.createElement("img")
    //     display.display = "block"
    //     display.src = im
    //     document.body.append(display)
    // }
    // tesseract.recognize(
    //     image,
    //     'eng',
    //     { logger: m => console.log(m) }
    //     ).then(({ data: { text } }) => {
    //         console.log(text);
    //     })
    hidden_ctx.clearRect(0, 0, hidden_ctx.canvas.width, hidden_ctx.canvas.height);
    fadeOut();
}




// function randomInteger(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const RADIUS = 50;  // Radius of the circle
// let y = 0;          // height (/vertical) of the circle within the viewport
// let circleArray = []
// let start_button = document.querySelector(".start-button")
// let animationId;
// let intervalId
// start_button.addEventListener('click', startGame);

// function startGame(event) {
//     intervalId = setInterval(createCircle, 500)
//     animationId = requestAnimationFrame( frame )
// }

// function randomInteger(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

// const RADIUS = 50;  // Radius of the circle
// let y = 0;          // height (/vertical) of the circle within the viewport
// let circleArray = []
// let start_button = document.querySelector(".start-button")
// let animationId;
// let intervalId
// start_button.addEventListener('click', startGame);

// function startGame(event) {
//     intervalId = setInterval(createCircle, 500)
//     animationId = requestAnimationFrame( frame )
// }

// function createCircle(event) {
//   const x = randomInteger(RADIUS, ctx.canvas.width - RADIUS);
//   const y = 0;
//   let circle = document.createElement('div')
//   circle.setAttribute('id', circleArray.length)
//   circle.classList.add('circle')
//   circle.style.top = `${y}px`;
//   circle.style.left = `${x-RADIUS}px`;
//   circle.style.zIndex = '2';
//   container = document.querySelector(".container-canvas")
//   container.appendChild(circle);

//   circleArray.push(circle)
// }

// function frame(currentTime) {
//     let circleElements = document.querySelectorAll('.circle');
//     //console.log(circleElements.length)
//     let canceled = 0;
//     for (let circle of circleElements) {
//         let curY = circle.style.top.replace(/\D/g, "");
//         if (parseInt(curY) + 2*RADIUS > ctx.canvas.height) {
//             container = document.querySelector(".container-canvas")
//             container.removeChild(circle);
//             window.cancelAnimationFrame(animationId)
//             clearInterval(intervalId);
//             canceled = 1

//             losingText = document.createElement("div")
//             losingText.textContent = `YOU LOSE\r\nFinal Score: ${document.querySelector(".score").textContent}`
//             losingText.classList.add("losing-text")
//             losingText.classList.add("center")
//             container.appendChild(losingText)

//             canvasElement.removeEventListener('mousedown', mouseDown);
//             canvasElement.removeEventListener('mouseup', mouseUp);
//             canvasElement.removeEventListener('mousemove', mouseMove);
//             break
//         }
//         circle.style.top = `${parseInt(curY)+2}px`;
//     }
//     if (canceled)
//         return
//     animationId = requestAnimationFrame( frame )
// }
