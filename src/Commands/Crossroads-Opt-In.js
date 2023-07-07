const { SlashCommandBuilder } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");
//get the json data and put into a variable

const filePath = path.join(__dirname, "../Crossroads.json")
const data = fs.readFileSync(filePath)
const jsonData = JSON.parse(data)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crossroads-opt-in')
    .setDescription('Start walking around the crossroads! (Opt into getting crossroad fortunes)'),

  async execute(interaction) {
    await interaction.reply('Opted In! (Curretly under development aka no worky yet)');
    //check if the user is already opted in
    //if they are, do nothing
    //if they are not, add them to the json file
    if (jsonData.opted.includes(interaction.user.id)) {
      interaction.editReply('You are already opted in!')
      return
    } else {
      jsonData.opted.push({
        "id": interaction.user.id,
        "username": interaction.user.username
      }
      )
      //write the new json data to the file
      fs.writeFile('./src/Crossroads.json', JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
    }
  },
};