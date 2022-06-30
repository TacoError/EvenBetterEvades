const crypto = require("crypto");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true
});

const profile = require("./profile.js");

class LoginManager {

    constructor() {
        // TODO: Prevent spam by logging attempts (by ip preferably)
    }

    generateSaltHash(password) {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto
            .pbkdf2Sync(password, salt, 1000, 64, "sha512")
            .toString("hex");
        return {
            salt: salt,
            hash: hash
        };
    }

    doesAccountExist(name) {
        // Make better later, just doing this for now.
        profile.find((_, document) => {
            document.forEach((profile) => {
                if (profile.name === name) return true;
            });
        });
        return false;
    }

    register(name, password) {
        if (this.doesAccountExist(name)) {
            return [false, "Account with name already exists."];
        }
        const sh = this.generateSaltHash(password);
        const profile = new profile({
            name: name,
            salt: sh.salt,
            hash: sh.hash,
            points: 0,
            admin: false
        });
        profile.save((err, _) => {
            if (err) {
                return [false, "Failed to create a account (server error)"];
            }
            return [true, "Success! You may now login."];
        });
    }

    login(name, password) {
        profile.find({name: name}, (err, response) => {
            if (err) {
                return [false, "No account with such name"];
            }
            const profile = response[0];
            const hash = crypto
                .pbkdf2Sync(password, profile.salt, 1000, 64, "sha512")
                .toString("hex");
            if (hash === profile.hash) {
                return [true, "Logged in!"];
            }
            return [false, "Wrong password."];
        });
        return [false, "At this point, just contact the developers."];
    }

}

module.exports = LoginManager;