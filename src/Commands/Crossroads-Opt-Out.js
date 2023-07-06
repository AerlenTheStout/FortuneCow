const { SlashCommandBuilder } = require('discord.js');

//make a indexedDB for crossroads opted users, and custom fortunes for the fortune command


module.exports = {
    data: new SlashCommandBuilder()
        .setName('crossroads-opt-out')
        .setDescription('Go home! (Opt out of getting crossroad fortunes)'),

    async execute(interaction) {
        await interaction.reply('Opted Out! (Curretly under development aka no worky yet)');
        console.log('opted')

        var userData = {"id": interaction.user.id, "username": interaction.user.username}

    },
};