/* eslint-disable indent */

const susGame = {
    commandSus(message, amogus) {
        if (amogus.ejected.includes(message.author.username)) {
            message.reply('lo siento pero ya te expulsaron de la nave, por lo cual estando muerto no puedes expulsar :(');
            return;
        }
        if (message.mentions.users.size == 0) {
            message.reply('Uso incorrecto del comando -sus, para usarlo es nesesario indicar quien es sus de la sig forma: **-sus @Usuario**');
        }
        else if (!amogus.inGame) {
            message.reply('Lo siento el juego termino, puedes iniciar otro con `-resetgame`');
        }
        else if (message.mentions.users.size > 0) {
            const { response, impostorWin, crewWin } = amogus.ejectSomeone(message.mentions.users.at(0).username);
            message.reply(response);
            if (impostorWin && !crewWin) {
                const defatMessage = amogus.gameOver('Defeat');
                message.channel.send({ embeds: [defatMessage] });
            }
            else if (crewWin && !impostorWin) {
                const victoryMessage = amogus.gameOver('Victory');
                message.channel.send({ embeds: [victoryMessage] });
            }
        }
    },
    commandResetGame(message, amogus) {
        amogus.resetGame();
        message.reply('Se a selecionando un impostor aleatorio y revivido a todos\nEl juego del AMOGUS se a reiniciado');
    },
};
module.exports = susGame;