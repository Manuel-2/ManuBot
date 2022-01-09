/* eslint-disable indent */
const eject = require('among-us-ejection');
const { crew } = require('./susGameConfig.json');

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
        console.log('in the game SUS the impostor index is:' + this.impostor);
        this.remainImpostors = 1;
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
        this.wasEjected(crewMemberName);
        const response = eject(sus, isSus, this.remainImpostors, 'The Skeld');
        return response;
    }

    wasEjected(crewMemberName) {
        this.ejected.push(crewMemberName);
    }

    resetGame() {
        this.impostor = getRandomInt(0, this.crewAmount - 1);
        console.log('in the game SUS the impostor index is:' + this.impostor);
        this.remainImpostors = 1;
        this.ejected = [];
    }
}

module.exports = susGame;