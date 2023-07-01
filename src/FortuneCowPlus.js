const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, IntentsBitField } = require('discord.js');
const { TOKEN } = require('TOKEN.json');

console.log(TOKEN);
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
        
    ]
});
console.log("after client");
client.on('ready', (c) => {
    console.info(`Logged in as ${client.user.tag}!`);
});


client.commands = new Collection();

const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
console.log("after client2");
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

console.log("after client3");
client.on(Events.InteractionCreate, async interaction => {
    console.log("after client4");
	if (!interaction.isChatInputCommand()) return;
	
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) { console.error('no matching command found for', interaction.commandName); return; };

    try {
        await command.execute(interaction);
        console.log("after client5");
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }

});

client.login(TOKEN);

console.log("after client6");