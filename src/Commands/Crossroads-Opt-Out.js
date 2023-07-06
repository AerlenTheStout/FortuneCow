const { SlashCommandBuilder } = require('discord.js');

//make a indexedDB for crossroads opted users, and custom fortunes for the fortune command
const request = indexedDB.open("FortuneCow");
request.onerror = function (event) {
  console.log("Database error: " + event.target.errorCode);
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("Database opened successfully");
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crossroads-opt-out')
        .setDescription('Go home! (Opt out of getting crossroad fortunes)'),

    async execute(interaction) {
        await interaction.reply('Opted Out! (Curretly under development aka no worky yet)');
        console.log('opted')

        var userData = {"id": interaction.user.id, "username": interaction.user.username}

        const optedObjectStore = db
          .transaction("opted", "readwrite")
          .objectStore("opted");

        transaction.oncomplete = function (event) {
            interaction.editReply("Opted out!");
        };

        optedObjectStore.delete(userData["id"]);
    },
};