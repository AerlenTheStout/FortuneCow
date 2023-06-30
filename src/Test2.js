const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');

// Create a canvas element
const canvas = createCanvas(1000, 1000);
canvas.width = 1000;
canvas.height = 1000;


// Get the 2D context of the canvas
const context = canvas.getContext('2d');

// Set the font properties
context.font = '30px Arial';

// Specify the text to be drawn
const text = 'Text Baseline Example \n second line \n third line ';
context.fillStyle = '#ffffff'; // Set the fill color
context.fillRect(0, 0, 1000, 1000); // Fill the entire canvas with the background color
context.fillStyle = '#000000'; // Set the text color
context.fillText(text, 20, 50); // Draw the text at coordinates (20, 50)

const measurement = context.measureText(text) // Actual width of the text in pixels
// Array of text baseline values


// Draw text with different baselines
var baselines = {
    Ascent : measurement.actualBoundingBoxAscent,
    Descent : measurement.actualBoundingBoxDescent,
    Left : measurement.actualBoundingBoxLeft,
    Right : measurement.actualBoundingBoxRight,
    FontAscent : measurement.fontBoundingBoxAscent,
    FontDescent : measurement.fontBoundingBoxDescent,
    Width : measurement.width,
    Alphabetical : measurement.alphabeticalbaseline,
    Ideographic : measurement.ideographicbaseline,
    Hanging : measurement.hangingbaseline
}
console.log("ActualboundingBoxAscent : " + measurement.actualBoundingBoxAscent);
console.log("ActualboundingBoxDescent : " + measurement.actualBoundingBoxDescent);
console.log("ActualboundingBoxLeft : " + measurement.actualBoundingBoxLeft);
console.log("ActualboundingBoxright : " + measurement.actualBoundingBoxRight);
console.log("FontboundingBoxAscent : " + measurement.fontBoundingBoxAscent);
console.log("FontboundingBoxAscent : " + measurement.fontBoundingBoxDescent);
console.log("width : " + measurement.width);
console.log("alphabeticalbaseline : " + measurement.alphabeticalbaseline);
console.log("ideographicbaseline : " + measurement.ideographicbaseline);
console.log("hangingbaseline : " + measurement.hangingbaseline);




for (var baseline in baselines) {
    context.fillText(baseline, 20, baselines[baseline]  + 50);
}
// Convert the canvas to a PNG buffer
const buffer = canvas.toBuffer('image/png');
fs.writeFile('text-baseline.png', buffer, (err) => {
    if (err)
        console.log(err);
    else {
        console.log("File written successfully\n");
    }
});