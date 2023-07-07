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
      if (jsonData.opted[i] === null) {
        delete jsonData.opted[i]
      }
    }

    if (jsonData.opted.some(e => e.id === interaction.user.id)) {
      var includes = true
      var spot = jsonData.opted.findIndex(e => e.id === interaction.user.id)
    } else {
      var includes = false
    }
    console.log(includes)
    //check if the user is already opted in
    //if they are, do nothing
    //if they are not, add them to the json file

    if (includes == true) {
      interaction.editReply('You are already opted in!')
      return
    }

    if (includes == false) {
      jsonData.opted.push({
        "id": interaction.user.id,
        "username": interaction.user.username
      })
      //write the new json data to the file
      fs.writeFile(jsonPath, JSON.stringify(jsonData), (err) => {
        if (err) throw err;
      });
      interaction.editReply('Opted In!! (Data written to file)');
    }
  },
};

