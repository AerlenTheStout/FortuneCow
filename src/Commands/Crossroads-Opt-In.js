const { SlashCommandBuilder } = require('discord.js');
const fs = require("node:fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crossroads-opt-in')
        .setDescription('Start walking around the crossroads! (Opt into getting crossroad fortunes)'),

    async execute(interaction) {
        await interaction.reply('Opted In! (Curretly under development aka no worky yet)');

        jsonData.opted.push({
            "id": interaction.user.id, 
            "username": interaction.user.username}
            )
  
          //write the new json data to the file
          fs.writeFile('./src/Crossroads.json', JSON.stringify(jsonData), (err) => {
            if (err) throw err;
            console.log('Data written to file');
          });
    },
};