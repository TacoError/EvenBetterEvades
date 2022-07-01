class EventType {

    constructor(name) {
        if (this.constructor === EventType) {
            console.log("This class is meant to be abstract and not be instantiated.");
            return;
        }
        this.name = name;
    }

    run(io, player, login, id, args) {}

    getName() {
        return name;
    }

}

module.exports = EventType;