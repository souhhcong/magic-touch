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
let on_drag = 0;

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
    let circleElements = document.querySelectorAll('.circle');
    if (circleElements.length > 0 && on_drag) {
        let container = document.querySelector(".container-canvas")
        container.removeChild(circleElements[0])
        hidden_ctx.clearRect(0, 0, hidden_ctx.canvas.width, hidden_ctx.canvas.height);

        let score = document.querySelector(".score")
        score.textContent = parseInt(score.textContent, 10) + 1
    }
    
    fadeOut()
    on_drag = 0
}

function mouseMove(event) {
    if (is_down) {
        on_drag = 1
        //ctx.moveTo(cur_x,cur_y);
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.stroke()
        hidden_ctx.lineTo(event.offsetX, event.offsetY)
        hidden_ctx.stroke()
        cur_x = event.offsetX
        cur_y = event.offsetY
    }
}


function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const RADIUS = 50;  // Radius of the circle
let y = 0;          // height (/vertical) of the circle within the viewport
let circleArray = []
let start_button = document.querySelector(".start-button")
let animationId;
let intervalId
start_button.addEventListener('click', startGame);

function startGame(event) {
    intervalId = setInterval(createCircle, 500)
    animationId = requestAnimationFrame( frame )
}

function createCircle(event) {
  const x = randomInteger(RADIUS, ctx.canvas.width - RADIUS);
  const y = 0;
  let circle = document.createElement('div')
  circle.setAttribute('id', circleArray.length)
  circle.classList.add('circle')
  circle.style.top = `${y}px`;
  circle.style.left = `${x-RADIUS}px`;
  circle.style.zIndex = '2';
  container = document.querySelector(".container-canvas")
  container.appendChild(circle);

  circleArray.push(circle)
}

function frame(currentTime) {
    let circleElements = document.querySelectorAll('.circle');
    //console.log(circleElements.length)
    let canceled = 0;
    for (let circle of circleElements) {
        let curY = circle.style.top.replace(/\D/g, "");
        if (parseInt(curY) + 2*RADIUS > ctx.canvas.height) {
            container = document.querySelector(".container-canvas")
            container.removeChild(circle);
            window.cancelAnimationFrame(animationId)
            clearInterval(intervalId);
            canceled = 1

            losingText = document.createElement("div")
            losingText.textContent = `YOU LOSE\r\nFinal Score: ${document.querySelector(".score").textContent}`
            losingText.classList.add("losing-text")
            losingText.classList.add("center")
            container.appendChild(losingText)

            canvasElement.removeEventListener('mousedown', mouseDown);
            canvasElement.removeEventListener('mouseup', mouseUp);
            canvasElement.removeEventListener('mousemove', mouseMove);
            break
        }
        circle.style.top = `${parseInt(curY)+2}px`;
    }
    if (canceled)
        return
    animationId = requestAnimationFrame( frame )
}