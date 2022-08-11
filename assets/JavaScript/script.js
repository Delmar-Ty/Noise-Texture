const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const noiseDims = {
    x: 200,
    y: 200
}
let makeAnimate = Number(prompt('Do you wish to animate the noise texture? (true: 1 / false: 0)'));
(makeAnimate)? makeAnimate = true: makeAnimate = false;
console.log(typeof(makeAnimate), makeAnimate);

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

//Noise Generation Function
function noise(sizeX, sizeY = 1) {
    const grid = [];
    for (let i = 0; i < sizeY; i++) {
        let row = [];
        for (let j = 0; j < sizeX; j++) {
            let noiseValue = Math.round(Math.random() * 255);
            row.push(noiseValue);
        }
        grid.push(row);
    }
    return grid;
}

const texture = noise(noiseDims.x, noiseDims.y);

//Render Noise Texture
function renderTexture(texture) {
    let size = {
        x: canvas.width / texture[0].length,
        y: canvas.height / texture.length
    };
    let lastY = 0;
    for (const y in texture) {
        let lastX = 0;
        for (const x in texture[y]) {
            let color = texture[y][x];
            c.beginPath();
            c.fillStyle = `rgb(${color}, ${color}, ${color})`;
            c.fillRect(lastX, lastY, size.x, size.y);
            c.closePath();
            lastX += size.x;
        }
        lastY += size.y;
    }
}

//Shuffle Noise Array
function shuffle(texture) {
    let temp = texture[texture.length - 1];
    texture.pop();
    texture.unshift(temp);
    return texture;
}

renderTexture(texture);

//Animate The Noise
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    renderTexture(shuffle(texture));
}

if (makeAnimate) {
    animate();
}