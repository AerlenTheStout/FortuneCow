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

    if (jsonData.opted.some(e => e.id === interaction.user.id)) {
      var includes = true
      var spot = jsonData.opted.findIndex(e => e.id === interaction.user.id)
    } else {
      var includes = false
    }

    if (includes == false) {
      interaction.editReply("You aren't opted in!")
      return
    } 

    if(includes == true) {
      //delete json data for the user
      delete jsonData.opted[spot]
      fs.writeFile(jsonPath, JSON.stringify(jsonData), (err) => {
        if (err) throw err;
      });
      interaction.editReply('Opted Out! Data removed from file');

    }
  }
}