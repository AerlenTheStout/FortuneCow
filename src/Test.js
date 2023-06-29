const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules

const output = execSync('dir', { encoding: 'utf-8' });  // the default is 'buffer'
console.log('Output was:\n', output);

const fs = require('fs');

// Assuming 'imageString' contains the string representation of the image
const imageString = "vguycvgygftycfhgvugytfycg /n gyhhbgvghugvyb jbhgvy /n yubhugvytgyugytfgyugvyt76y"
// Convert the string into a Buffer
const imageBuffer = Buffer.from(imageString, 'base64');

// Specify the file path and name where you want to save the image
const filePath = 'image.png';

// Write the image Buffer to the file
fs.writeFile(filePath, imageBuffer, (err) => {
  if (err) {
    console.error('Error saving the image:', err);
  } else {
    console.log('Image saved successfully.');
  }
});


Canvas