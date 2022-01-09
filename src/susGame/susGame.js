/* eslint-disable indent */
const eject = require('among-us-ejection');
const { crew, victoryImage, defeatImage } = require('./susGameConfig.json');
const { MessageEmbed } = require('discord.js');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class susGame {

    constructor() {
        this.gameCanceled = false;
        this.thereIsGame = false;
    }

    ejectSomeone(crewMemberName) {
        if (this.ejected.includes(crewMemberName)) {
            return 'a ese men ya lo expulsaron de la nave por sus';
        }
        const sus = crewMemberName;
        let isSus = false;
        if (this.crew.indexOf(crewMemberName) == this.impostor) {
            isSus = true;
            this.remainImpostors = 0;
        }
        this.ejected.push(crewMemberName);
        const response = eject(sus, isSus, this.remainImpostors, 'The Skeld');

        if (isSus) {
            this.inGame = false;
            return {
                response,
                impostorWin: false,
                crewWin: true,
            };
        }
        else if (!isSus && this.crew.length - this.ejected.length == 1) {
            this.inGame = false;
            return {
                response,
                impostorWin: true,
                crewWin: false,
            };
        }
        else {
            return {
                response,
                impostorWin: false,
                crewWin: false,
            };
        }
    }

    gameOver(status) {
        console.log('gameover');
        const embed = new MessageEmbed();
        if (status == 'Defeat') {
            embed.setTitle('Defeat');
            embed.setColor('RED');
            embed.setImage(defeatImage);
            embed.setURL(defeatImage);
        }
        else if (status == 'Victory') {
            embed.setTitle('Victory');
            embed.setColor('BLUE');
            embed.setImage(victoryImage);
            embed.setURL(victoryImage);
        }
        return embed;
    }

    createNewGame(userCreator) {
        this.userJoined = [];
        this.userJoined.push(userCreator);
        this.userJoined.push(crew[0]);
        this.gameHasStarted = false;
        this.inGame = false;
        this.thereIsGame = true;
        this.gameCanceled = false;
        // for later
        this.remainImpostors = 1;
        this.ejected = [];
        this.crew = [];
    }

    addPlayer(playerUserName) {
        this.userJoined.push(playerUserName);
        let userJoinedListSyle = '';
        this.userJoined.forEach(user => {
            userJoinedListSyle += '     +' + user + '\n';
        });
        return userJoinedListSyle;
    }

    startGame() {
        this.userJoined.forEach(user => {
            this.crew.push(user);
        });
        this.crewAmount = this.crew.length;
        this.impostor = getRandomInt(0, this.crewAmount - 1);
        console.log(this.crew[this.impostor]);
        this.gameHasStarted = true;
        this.inGame = true;
    }

    exitGame() {
        this.gameCanceled = true;
    }
}

module.exports = susGame;