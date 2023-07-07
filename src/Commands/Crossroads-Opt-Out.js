const { SlashCommandBuilder } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");
//get the json data and put into a variable
const jsonPath = path.join(__dirname, "../Crossroads.json")
const data = fs.readFileSync(jsonPath)
const jsonData = JSON.parse(data)


module.exports = {
    data: new SlashCommandBuilder()
        .setName('crossroads-opt-out')
        .setDescription('Go home! (Opt out of getting crossroad fortunes)'),

    async execute(interaction) {
        await interaction.deferReply();
        console.log('opted')
        //delete json data for the user
        console.log(jsonData.opted.length)

        if (!jsonData.opted.includes(interaction.user.id)) {
          interaction.editReply("You aren't opted in!")
          return
        } else {
          //2 cuz thats the size of it empty
          for (let i = 2; i < jsonData.opted.length; i++) {
              if (jsonData.opted[i].id === interaction.user.id && jsonData.opted[i].username === interaction.user.username) {
                delete jsonData.opted[i]
              }
          }
      }
        //write the new json data to the file
        fs.writeFile(jsonPath, JSON.stringify(jsonData), (err) => {
          if (err) throw err;
          interaction.editReply('Opted Out! Data removed from file');
        });
    },
};