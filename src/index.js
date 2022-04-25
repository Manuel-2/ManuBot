const { Client, Intents } = require('discord.js');
// const { token } = require('../data/config.json');
const loadCommands = require('./commands/commandRouter.js');
const token = process.env.TOKEN;

const susGame = require('./susGame/susGame.js');
const amogus = new susGame();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => { console.log('Ready!'); });

loadCommands(client, amogus);

client.login(token);