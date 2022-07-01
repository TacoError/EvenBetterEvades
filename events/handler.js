const Login = require("./types/login.js");
const Register = require("./types/register.js");

class EventHandlerMBE {

    constructor(io, playerHandler, loginHandler) {
        this.io = io;
        this.playerHandler = playerHandler;
        this.loginHandler = loginHandler;
        this.events = [
            new Login(),
            new Register()
        ];
    }

    runEvent(name, id, ...args) {
        this.events.forEach((handler) => {
            handler.run(this.io, this.playerHandler, this.loginHandler, id, args);
        });
    }

}

module.exports = EventHandlerMBE;