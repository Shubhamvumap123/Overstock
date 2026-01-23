const path = require('path');

async function verify() {
    console.log("Loading User model...");
    try {
        // Point to the user model in authentication_Oath-main
        const modulePath = path.resolve(__dirname, '../authentication_Oath-main/src/model/user.model');
        const User = require(modulePath);
        console.log("User model loaded.");

        const user = new User({
            email: "test@test.com",
            password: "password123",
            role: ["customer"]
        });

        // Generate a hash manually using the bcrypt from the project
        const bcryptPath = path.resolve(__dirname, '../authentication_Oath-main/node_modules/bcrypt');
        const bcrypt = require(bcryptPath);
        const hash = await bcrypt.hash("password123", 10);
        user.password = hash;

        console.log("Testing checkPassword...");
        const result = user.checkPassword("password123");

        if (result instanceof Promise) {
            console.log("SUCCESS: checkPassword returns a Promise (Async).");
            const match = await result;
            if (match === true) {
                console.log("SUCCESS: Password matched.");
            } else {
                console.error("FAILURE: Password did not match.");
                process.exit(1);
            }
        } else {
            console.log("INFO: checkPassword returned " + typeof result + ". (Expected Promise for Async fix)");
            if (result === true) {
                 console.log("Current state: Synchronous implementation working.");
            }
        }

    } catch (e) {
        console.error("Error during verification:", e);
        process.exit(1);
    }
}

verify();
