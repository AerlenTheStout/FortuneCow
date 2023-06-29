const { SlashCommandBuilder, Attachment } = require('discord.js');
const execSync = require('child_process').execSync;
const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');

function createPngImageFromString(text) {

    
    // Create a canvas
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
    //await fs.writeFile('fortune.png', buffer);
    return buffer;
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('Get a fortune from the fortune cow!'),

    async execute(interaction) {
        

        const output = execSync('fortune | cowsay', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);

        await interaction.reply({
            content: 'Here is your fortune!',
            attachment: [new createPngImageFromString(output)]
        });
        

    },
};