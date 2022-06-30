const { Player } = require("./player.js");

class PlayerHandler {

    constructor() {
        this.players = [];
    }

    addPlayer(name, id) {
        this.players.push(new Player(name, id));
    }

    getPlayerByID(id) {
        this.players.forEach((player) => {
            if (player.id === id) return player;
        });
        return null;
    }

    getPlayerByName(name) {
        this.players.forEach((player) => {
            if (player.name === name) return player;
        });
        return null;
    }

}

module.exports = PlayerHandler;

