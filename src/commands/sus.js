/* eslint-disable indent */
const susGame = {
    commandSus(message, amogus) {
        if (amogus.ejected.includes(message.author.username)) {
            message.reply('I\'m sorry, you were already ejected from the ship, so you can\'t eject people :(');
            return;
        }
        if (message.mentions.users.size == 0) {
            message.reply('Uso incorrecto del comando -sus, para usarlo es nesesario indicar quien es sus de la sig forma: **-sus @Usuario**');
        }
        else if (message.mentions.users.size > 0) {
            const response = amogus.ejectSomeone(message.mentions.users.at(0).username);
            message.reply(response);
        }
    },
    commandResetGame(message, amogus) {
        amogus.resetGame();
        message.reply('Among Us Game has been reset');
    },
};
module.exports = susGame;