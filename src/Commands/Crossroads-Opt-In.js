const { SlashCommandBuilder } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");
//get the json data and put into a variable

const jsonPath = path.join(__dirname, "../Crossroads.json")


module.exports = {
  data: new SlashCommandBuilder()
    .setName('crossroads-opt-in')
    .setDescription('Start walking around the crossroads! (Opt into getting crossroad fortunes)'),

    
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
      fs.writeFileSync(jsonPath, JSON.stringify(jsonData,null,1), (err) => {
        if (err) throw err;
      });
      interaction.editReply('Opted In!! (Data written to file)');
    }
    interaction.followUp(jsonData);
  },
};

