const EventType = require("../eventType.js");

class Register extends EventType {

    constructor() {
        super("login");
    }

    run(io, player, login, id, args) {
        if (args.length < 2) {
            io.to(id).emit("registerResponse", [false, "..."]);
            return;
        }
        const username = args[0];
        const password = args[0];
        const response = login.register(username, password);
        io.to(id).emit("registerResponse", response);
    }

}

module.exports = Register;