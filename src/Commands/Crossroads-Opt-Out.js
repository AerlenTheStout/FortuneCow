const { SlashCommandBuilder } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");
//get the json data and put into a variable
const jsonPath = path.join(__dirname, "../Crossroads.json")



module.exports = {
  data: new SlashCommandBuilder()
    .setName('crossroads-opt-out')
    .setDescription('Go home! (Opt out of getting crossroad fortunes)'),

  async execute(interaction) {
    await interaction.deferReply();
    let data = fs.readFileSync(jsonPath)
    let jsonData = JSON.parse(data)

    for (let i = 0; i < jsonData.opted.length; i++) {
      if (jsonData.opted[i] === null) {
        jsonData.opted.splice(i,1)
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData,null,1), (err) => {
          if (err) throw err;
        });
      }
    }

    data = fs.readFileSync(jsonPath)
    jsonData = JSON.parse(data)

    if (jsonData.opted.some(e => e.id === interaction.user.id)) {
      var includes = true
      var spot = jsonData.opted.indexOf(interaction.user.id)
    } else {
      var includes = false
    }

    console.log(includes)

    if (includes == false) {
      interaction.editReply("You aren't opted in!")
      return
    } 

    if(includes == true) {
      //delete json data for the user
      jsonData.opted.splice(spot,1)
      fs.writeFileSync(jsonPath, JSON.stringify(jsonData,null,1), (err) => {
        if (err) throw err;
      });
      interaction.editReply('Opted Out! Data removed from file', jsonData);

    }
  }
}