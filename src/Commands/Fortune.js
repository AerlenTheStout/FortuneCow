const { SlashCommandBuilder } = require('discord.js');
const execSync = require('child_process').execSync;
const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');

function createPngImageFromString(text, width, height) {
    // Create a canvas
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
  
    // Draw the text on the canvas
    context.fillStyle = '#ffffff'; // Set the fill color
    context.fillRect(0, 0, width, height); // Fill the entire canvas with the background color
    context.font = '20px Arial'; // Set the font properties
    context.fillStyle = '#000000'; // Set the text color
    context.fillText(text, 10, 50); // Draw the text at coordinates (10, 50)
  
    // Convert the canvas to a PNG buffer
    const buffer = canvas.toBuffer('image/png');
  
    return buffer;
  }


module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('Get a fortune from the fortune cow!'),

    async execute(interaction) {
        

        const output = execSync('fortune | cowsay', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);

        var imageString = output;
        var witdth = 290;
        var height = 290;


        await interaction.reply({attachment: [createPngImageFromString(imageString, witdth, height)]});
        

    },
};