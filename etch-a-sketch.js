// select canvas and shake button elements
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeBtn = document.querySelector('.shake');
const MOVE_AMOUNT = 30;

let hue = 0;
// console.log(canvas);
// console.dir(shake);

//setup canvas for drawing

// make variables called height width from canvas properties
const { width, height } = canvas;
// const width = canvas.width;
// const height = canvas.height;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;
ctx.strokeStyle = `hsl(${hue},100%,50% )`;
ctx.beginPath(); //start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();
//write draw function

// destructuring  options
function draw({ key }) {
    hue += 10;
    ctx.strokeStyle = `hsl(${hue},100%,50% )`;
    console.log(key);
    ctx.beginPath(); //start drawing
    ctx.moveTo(x, y);

    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;

        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// function draw(options) {
//     console.log(options);
// }

// write handler for keys
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
        // console.log(e.key);
        console.log('Handling Key!');
    }
}

window.addEventListener('keydown', handleKey);

// clear canvas on shake function
function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
    canvas.classList.add('shake');
    canvas.addEventListener(
        'animationend',
        () => {
            console.log('Shaked!');
            canvas.classList.remove('shake');
        }, { once: true }
    );
}

shakeBtn.addEventListener('click', clearCanvas);
//listen for arrow keys