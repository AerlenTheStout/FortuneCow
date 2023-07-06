const { SlashCommandBuilder } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");
//get the json data and put into a variable
const data = fs.readFileSync('./src/Crossroads.json')
const jsonData = JSON.parse(data)


module.exports = {
    data: new SlashCommandBuilder()
        .setName('crossroads-opt-out')
        .setDescription('Go home! (Opt out of getting crossroad fortunes)'),

    async execute(interaction) {
        await interaction.reply('Opted Out! (Curretly under development aka no worky yet)');
        console.log('opted')

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