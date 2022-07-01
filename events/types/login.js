const EventType = require("../eventType.js");

class Login extends EventType {

    constructor() {
        super("login");
    }

    run(io, player, login, id, args) {
        if (args.length < 2) {
            io.to(id).emit("loginResponse", [false, "..."]);
            return;
        }
        const username = args[0];
        const password = args[0];
        const response = login.login(username, password);
        io.to(id).emit("loginResponse", response);
    }

}

module.exports = Login;