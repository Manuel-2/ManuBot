/* eslint-disable indent */
function commandHola(message) {
    message.reply({
        content: `holaaa ${message.author.username}`,
    });
}

module.exports = commandHola;