const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.info(`Logged in as ${client.user.tag}!`);
});

const TOKEN = process.env.TOKEN;
client.login(TOKEN);
