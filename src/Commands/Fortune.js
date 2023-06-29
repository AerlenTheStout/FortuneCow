const { SlashCommandBuilder } = require('discordjs');
const execSync = require('child_process').execSync;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortune')
        .setDescription('Get a fortune from the fortune cow!'),

    async execute(interaction) {
        await interaction.reply('Moo!');

        const output = execSync('dir', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);



    },
};