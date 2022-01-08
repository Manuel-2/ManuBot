/* eslint-disable indent */
const { permisionDenied } = require('../../data/statusMessages.json');

function commandClear(message) {
    if (message.author.tag === 'Manuel-2#1186') {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results);
        });
    }
    else {
        message.reply(permisionDenied);
    }
}

module.exports = commandClear;