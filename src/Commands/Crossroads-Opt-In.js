const { SlashCommandBuilder } = require('discord.js');
const execSync = require('child_process').execSync;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crossroads-opt-in')
        .setDescription('Start walking around the crossroads! (Opt into getting crossroad fortunes)'),

    async execute(interaction) {
        await interaction.reply('Opted In! (Curretly under development aka no worky yet)');

        const output = execSync('dir', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);



    },
};