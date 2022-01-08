/* eslint-disable indent */
const { helpResponse } = require('../../data/statusMessages.json');

function commandHelp(message) {
    message.reply(helpResponse);
}

module.exports = commandHelp;