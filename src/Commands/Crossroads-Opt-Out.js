const { SlashCommandBuilder } = require('discord.js');
const execSync = require('child_process').execSync;
const { opted } = require('../Crossroads.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crossroads-opt-out')
        .setDescription('Go home! (Opt out of getting crossroad fortunes)'),

    async execute(interaction) {
        await interaction.reply('Opted Out! (Curretly under development aka no worky yet)');

        console.log(opted)


    },
};