/* eslint-disable indent */

const susGame = {
    commandSus(message, amogus) {
        if (!amogus.gameHasStarted) {
            message.reply('Tienes que empezar el juego antes de poder expulsar a alguien por sus, si ya todos estan listos usa el comando: `-susStart` o tambien puede que no hayas creado una partida, para hacerlo usa el comando `-susCreate`');
            return;
        }
        if (amogus.ejected.includes(message.author.username)) {
            message.reply('lo siento pero ya te expulsaron de la nave, por lo cual estando muerto no puedes expulsar :(');
            return;
        }
        if (message.mentions.users.size == 0) {
            message.reply('Uso incorrecto del comando -sus, para usarlo es nesesario indicar quien es sus de la sig forma: `-sus @Usuario`');
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

    commandCreateNewSusGame(message, amogus) {
        amogus.createNewGame(message.author.username);
        message.reply('Se ah creado una nueva sala y la anterior se ah borrado, recuerden usen el comando `-susJoin` para unirse, ya que esten listos usen `-susStart` para inicar el juego');
    },

    commandJoinPlayerToSusGame(message, amogus) {
        if (amogus.gameCanceled || !amogus.thereIsGame) {
            message.reply('no hay ningun juego al que puedas unirte, crea uno con `-susCreate`');
            return;
        }

        if (amogus.userJoined.length > 0) {
            if (amogus.userJoined.includes(message.author.username)) {
                message.reply('tu ya estas dentro del juego, tu no puedes añadir a los demas');
                return;
            }
        }
        if (amogus.gameHasStarted) {
            message.reply('ya hay un juego en marcha, si quieren incluirte pueden usar `-susCreate` para reinicar');
        }
        else {
            const usersList = amogus.addPlayer(message.author.username);
            message.channel.send(usersList);
        }
    },

    commandStartSusGame(message, amogus) {
        if (amogus.gameCanceled || !amogus.thereIsGame) {
            message.reply('no hay ningun juego para iniciar, crea uno con `-susCreate`');
            return;
        }
        // TODO: este commando no se puede llamar una vez que el juega ya inicio, en caso de que se llame este commando sugerirle al usuario usar el commando para canelar
        if (amogus.gameCanceled) {
            message.reply('No hay un Juego disponible, puedes crearlo con el comando `-susCreate` y despues ya puedes ejecutar `-susStart`');
        }
        else if (!amogus.gameCanceled && amogus.gameHasStarted) {
            message.reply('Ya hay un juego en marcha, si quieres cancelar el actual y salir usa: `-susCancel`, si quieres cancelar e inicar otra usa `-susCreate`');
        }
        else if (!amogus.gameCanceled && !amogus.gameHasStarted) {
            amogus.startGame();
            message.reply('El juego a iniciado, hay un Impostor entre nosotros ඞ');
        }
    },

    // TODO: añade un comando para cancelar la partida
    commandCancelSusGame(message, amogus) {
        if (!amogus.gameCanceled || amogus.thereIsGame) {
            message.reply('Juego cancelado, puedes crear otro con `-susCreate`');
            amogus.exitGame();
        }
    },
};

module.exports = susGame;