/* eslint-disable indent */
const { statusMessages } = require('../susGame/susGameConfig.json');

const susGame = {
    commandSus(message, amogus) {

        if (!amogus.gameHasStarted) {
            // gameNotStartedError
            message.reply(statusMessages.eject.gameNotStartedError);
            return;
        }

        if (amogus.ejected.includes(message.author.username)) {
            // playerHasLostError
            message.reply(statusMessages.eject.playerHasLostError);
            return;
        }

        if (message.mentions.users.size == 0) {
            // noMentionError
            message.reply(statusMessages.eject.noMentionError);
            return;
        }

        if (!amogus.inGame) {
            // gameEndedError
            message.reply(statusMessages.eject.gameEndedError);
            return;
        }

        if (message.mentions.users.size > 0) {
            const target = message.mentions.users.at(0).username;

            if (!amogus.crew.includes(target)) {
                // noPlayerError
                message.reply(statusMessages.eject.noPlayerError);
                return;
            }

            const { response, impostorWin, crewWin } = amogus.ejectSomeone(target);
            message.reply(response);

            if (impostorWin && !crewWin) {
                const defatMessage = amogus.gameOver('Defeat');
                message.channel.send({ embeds: [defatMessage] });
                message.channel.send('Gano: ' + amogus.crew[amogus.impostor]);
            }
            else if (crewWin && !impostorWin) {
                const victoryMessage = amogus.gameOver('Victory');
                message.channel.send({ embeds: [victoryMessage] });
                message.channel.send('Perdio: ' + amogus.crew[amogus.impostor]);
            }
        }
    },

    commandCreateNewSusGame(message, amogus) {
        amogus.createNewGame(message.author.username);
        message.reply(statusMessages.createGame.gameCreated);
    },

    commandJoinPlayerToSusGame(message, amogus) {
        if (amogus.gameCanceled || !amogus.thereIsGame) {
            // noGameError
            message.reply(statusMessages.joinPlayer.noGameError);
            return;
        }

        if (amogus.userJoined.length > 0) {
            if (amogus.userJoined.includes(message.author.username)) {
                // alreadyInError
                message.reply(statusMessages.joinPlayer.alreadyInError);
                return;
            }
        }
        if (amogus.gameHasStarted) {
            // gameHasStartedError
            message.reply(statusMessages.joinPlayer.gameHasStartedError);
        }
        else {
            const usersList = amogus.addPlayer(message.author.username);
            message.channel.send(usersList);
        }
    },

    commandStartSusGame(message, amogus) {
        if (amogus.gameCanceled || !amogus.thereIsGame) {
            // noGame2StartError
            message.reply(statusMessages.startGame.noGame2StartError);
            return;
        }

        if (!amogus.gameCanceled && amogus.gameHasStarted) {
            // gameAlreadyStartedError
            message.reply(statusMessages.startGame.gameAlreadyStartedError);
            return;
        }

        if (!amogus.gameCanceled && !amogus.gameHasStarted) {
            const alone = amogus.startGame();
            message.channel.send('El juego a iniciado, hay un Impostor entre nosotros ඞ');
            if (alone) {
                message.channel.send('Solo estamos tu y yo ...');
                setTimeout(function() {
                    message.channel.send('...');
                    setTimeout(function () {
                        if (amogus.inGame && !amogus.gameCanceled) {
                            const { response, impostorWin, crewWin } = amogus.ejectSomeone(amogus.crew[0]);
                            message.reply(response);
                            if (impostorWin && !crewWin) {
                                const defatMessage = amogus.gameOver('Defeat');
                                message.channel.send({ embeds: [defatMessage] });
                                message.channel.send('Gano: ' + amogus.crew[amogus.impostor]);
                            }
                            else if (crewWin && !impostorWin) {
                                const victoryMessage = amogus.gameOver('Victory');
                                message.channel.send({ embeds: [victoryMessage] });
                                message.channel.send('Perdio: ' + amogus.crew[amogus.impostor]);
                            }
                        }
                    }, 3000);
                }, 3000);
            }
        }
    },

    commandCancelSusGame(message, amogus) {
        if (!amogus.gameCanceled && amogus.thereIsGame) {
            message.reply(statusMessages.cancelGame.gameCanceled);
            amogus.exitGame();
        }
        else {
            message.reply(statusMessages.cancelGame.noGame2CancelError);
        }
    },
};

module.exports = susGame;