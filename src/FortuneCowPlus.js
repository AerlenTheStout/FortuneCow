const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, IntentsBitField } = require("discord.js");
const { TOKEN } = require("../TOKEN.json");
const { create } = require("node:domain");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "Commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

//create database with onupgrade function

const request = indexedDB.open("FortuneCow");
request.onerror = function (event) {
  console.log("Database error: " + event.target.errorCode);
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("Database opened successfully");
};

request.onupgradeneeded = function (event) {
    const db = event.target.result;

    const optedObjectStore = db.createObjectStore("opted", {keyPath: "id"});
    const CustomFortunesObjectStore = db.createObjectStore("opted", { autoIncrement: true });

    optedObjectStore.createIndex("opted", "opted", { unique: true });

    CustomFortunesObjectStore.transaction.oncomplete = (event) => {
      console.log("CustomFortunes Database upgraded successfully");
    };

    optedObjectStore.transaction.oncomplete = (event) => {
        console.log("opted Database upgraded successfully");
      };
};




client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error("no matching command found for", interaction.commandName);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});


client.login(TOKEN);
