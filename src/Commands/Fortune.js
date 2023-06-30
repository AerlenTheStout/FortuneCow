const { SlashCommandBuilder, Attachment } = require('discord.js');
const execSync = require('child_process').execSync;
const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');

function createPngImageFromString(text) {


    // Create a Temnp canvas
    const TEMPcanvas = createCanvas(500, 2000);
    const TEMPcontext = TEMPcanvas.getContext('2d');

    // Draw the text on the canvas
    TEMPcontext.fillStyle = '#ffffff'; // Set the fill color
    TEMPcontext.fillRect(0, 0, 500, 2000); // Fill the entire canvas with the background color
    TEMPcontext.font = '14px Arial'; // Set the font properties
    TEMPcontext.fillStyle = '#000000'; // Set the text color
    TEMPcontext.fillText(text, 10, 50); // Draw the text at coordinates (10, 50)

    width = TEMPcontext.measureText(text).width; // Actual width of the text in pixels
    height = TEMPcontext.measureText(text).actualBoundingBoxDescent; // Height of the text in pixels

    widthPadding = 10;
    heightPadding = 30;
    canvasWidth = width + (2*widthPadding);
    canvasHeight = height + (2*heightPadding);

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext('2d');

    context.fillStyle = '#ffffff'; // Set the fill color
    context.fillRect(0, 0, canvasWidth, canvasHeight); // Fill the entire canvas with the background color
    context.font = '14px Arial'; // Set the font properties
    context.fillStyle = '#000000'; // Set the text color
    context.fillText(text, widthPadding, heightPadding); // Draw the text at coordinates (10, 50)


  
    // Convert the canvas to a PNG buffer
    const buffer = canvas.toBuffer('image/png');
    fs.writeFile('fortune.png', buffer, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    });
    
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('Get a fortune from the fortune cow!'),

    async execute(interaction) {
        
        await interaction.deferReply();

        const output = execSync('ipconfig', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);

        createPngImageFromString(output)

       /* await interaction.reply({
            "content" : 'Here is your fortune!',
                "embeds": [{
                  "title": "Hello, Embed!",
                  "description": "This is an embedded message.",
                  "thumbnail": {
                    "url": "attachment://myfilename.png"
                  },
                  "image": {
                    "url": "attachment://mygif.gif"
                  }
                }],
                "message_reference": {
                  "message_id": "233648473390448641"
                },
                "attachments": [{
                    "id": 0,
                    "description": "Image of a cute little cat",
                    "filename": "fortune.png"
                }]
              });*/
        

    },
};