const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
let text = 'This is a test of the emergency broadcast system. This is only a test. If this were a real emergency, you would be instructed where to go and what to do. This is only a test.';

const canvas = createCanvas(300, 1000);
const context = canvas.getContext('2d');

let width = context.measureText(text).width; // Actual width of the text in pixels
let height = context.measureText(text).height; // Height of the text in pixels
// Draw the text on the canvas
context.fillStyle = '#ffffff'; // Set the fill color
context.fillRect(0, 0, width, height); // Fill the entire canvas with the background color
context.font = '20px Arial'; // Set the font properties
context.fillStyle = '#000000'; // Set the text color
context.fillText(text, 10, 50); // Draw the text at coordinates (10, 50)

// Convert the canvas to a PNG buffer
const buffer = canvas.toBuffer('image/png');
fs.writeFile('fortune.png', buffer, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync("fortune.png", "utf8"));
  }
});