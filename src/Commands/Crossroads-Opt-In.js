const { SlashCommandBuilder } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");
//get the json data and put into a variable

const jsonPath = path.join(__dirname, "../Crossroads.json")
const data = fs.readFileSync(jsonPath)
const jsonData = JSON.parse(data)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crossroads-opt-in')
    .setDescription('Start walking around the crossroads! (Opt into getting crossroad fortunes)'),

  async execute(interaction) {
    await interaction.deferReply();

    for (let i = 0; i < jsonData.opted.length; i++) {
      if (jsonData.hasOwnProperty("id") && jsonData.hasOwnProperty("username")) {
        if (jsonData.opted[i].id === interaction.user.id && jsonData.opted[i].username === interaction.user.username) {
          spot = i
          includes = true
        } else
          includes = false
      }
    }
    //check if the user is already opted in
    //if they are, do nothing
    //if they are not, add them to the json file

    if (includes = true) {
      interaction.editReply('You are already opted in!')
      return
    } else {
      jsonData.opted.push({
        "id": interaction.user.id,
        "username": interaction.user.username
      }
      )
      //write the new json data to the file
      fs.writeFile(jsonPath, JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        interaction.editReply('Opted In!! (Data written to file)');
      });
    }
  },
};