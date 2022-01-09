const { Client, Intents } = require('discord.js');
const { token } = require('../data/config.json');
const loadCommands = require('./commands/commandRouter.js');

const susGame = require('./susGame/susGame.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const amogus = new susGame();

client.once('ready', () => { console.log('Ready!'); });

loadCommands(client, amogus);

client.login(token);