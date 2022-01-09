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
        this.crew = crew;
        this.ejected = [];
        this.crewAmount = crew.length;
        this.impostor = getRandomInt(0, this.crewAmount - 1);
        console.log('in the game SUS the impostor index is:' + crew[this.impostor]);
        this.remainImpostors = 1;
        this.inGame = true;
    }

    ejectSomeone(crewMemberName) {
        if (this.ejected.includes(crewMemberName)) {
            return 'a ese men ya lo expulsaron de la nave por sus';
        }
        const sus = crewMemberName;
        let isSus = false;
        if (crew.indexOf(crewMemberName) == this.impostor) {
            isSus = true;
            this.remainImpostors = 0;
        }
        this.ejected.push(crewMemberName);
        const response = eject(sus, isSus, this.remainImpostors, 'The Skeld');

        if (this.ejected.length == this.crewAmount - 1 && !this.ejected.includes(crew[this.impostor])) {
            this.inGame = false;
            return {
                response,
                impostorWin: true,
                crewWin: false,
            };
        }
        else if (this.ejected.includes(crew[this.impostor])) {
            this.inGame = false;
            return {
                response,
                impostorWin: false,
                crewWin: true,
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

    resetGame() {
        this.impostor = getRandomInt(0, this.crewAmount - 1);
        console.log('in the game SUS the impostor index is:' + crew[this.impostor]);
        this.remainImpostors = 1;
        this.ejected = [];
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
}

module.exports = susGame;