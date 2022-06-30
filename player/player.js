class Player {

    constructor(name, id) {
        this.name = name;
        // Corresponding id to their socket
        this.id = id;
        // Generates random color hex
        this.color = Math.floor(Math.random() * 16777215).toString(16);
        this.x = 0;
        this.y = 0;
        this.radius = 15;

        this.draw = {
            drawStart: {x: 0, y: 0},
            drawEnd: {x: 0, y: 0},
            drawing: false
        };
    }

    serialize() {
        return {
            x: this.x,
            y: this.y,
            color: this.color,
            name: this.name,
            radius: this.radius,

            drawing: this.draw
        };
    }

}

module.exports = Player;