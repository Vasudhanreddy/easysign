// Function to generate signature from text
// Function to generate signature from text
function generateSignature() {
    const signatureText = document.getElementById('signatureText').value;
    const font = document.getElementById('fontSelect').value;
    const fontSize = document.getElementById('fontSizeInput').value;
    const fontColor = document.getElementById('fontColorPicker').value;
    const backgroundColor = document.getElementById('backgroundColorPicker').value;
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set font properties
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Write text to canvas
    ctx.fillText(signatureText, canvas.width / 2, canvas.height / 2);
}

//
let canvas, ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function initCanvas() {
    canvas = document.getElementById('signatureCanvas');
    ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY];
}

function draw(e) {
    if (!isDrawing) return;
    
    const x = e.offsetX || e.touches[0].clientX;
    const y = e.offsetY || e.touches[0].clientY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('DOMContentLoaded', initCanvas);
// Function to download signature
function downloadSignature() {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'signature.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize canvas when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initCanvas);

// Function to clear canvas
function clearCanvas() {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to download signature from canvas
function downloadSignature() {
    const canvas = document.getElementById('signatureCanvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'signature.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}