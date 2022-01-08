/* eslint-disable indent */
const { prefix } = require('../../data/config.json');
const { errorMessage, errorImageLink } = require('../../data/statusMessages.json');
const hola = require('./hola.js');
const help = require('./help.js');
const clear = require('./clear.js');
const sus = require('./sus.js');

function loadCommands(client, amogus) {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        try {
            if (message.content.startsWith('hola')) {
                hola(message);
            }
            else if (message.content === 'help' || message.content === prefix + 'help') {
                help(message);
            }
            else if (message.content.toLowerCase() === prefix + 'clear') {
                clear(message);
            }
            else if (message.content.toLowerCase().startsWith(prefix + 'sus')) {
                sus.commandSus(message, amogus);
            }
            else if (message.content.toLowerCase() === prefix + 'resetgame') {
                sus.commandResetGame(message, amogus);
            }
            else if (message.content.toLowerCase().includes('sándwich') || message.content.toLowerCase().includes('sandwich')) {
                message.reply('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd4m7Z_mhKpIw-whftLymITDcgCOnFEjMZgQ&usqp=CAU');
            }
        }
        catch (error) {
            message.channel.send(errorMessage);
            message.channel.send(errorImageLink);
            message.channel.send(error.message);
            console.log(error.message);
        }
    });
}

module.exports = loadCommands;