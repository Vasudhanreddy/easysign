const express = require('express');
const path = require('path');
const canvas = require('canvas');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS) from the `public` directory
app.use(express.static(path.join(__dirname + '/public')));

// Route to handle signature generation requests
app.post('/generate-signature', (req, res) => {
    const { signatureText, font, fontSize, fontColor, backgroundColor } = req.body;

    // Create a canvas and its context
    const canvas = new canvas.createCanvas(400, 200); // Adjust width and height if needed
    const ctx = canvas.getContext('2d');

    // Set canvas background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set font properties
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Write text to canvas
    ctx.fillText(signatureText, canvas.width / 2, canvas.height / 2);

    // Convert canvas to PNG data URL
    const dataURL = canvas.toDataURL('image/png');

    // Send response with data URL
    res.send({ dataURL });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});