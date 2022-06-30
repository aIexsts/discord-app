const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        // check if user exists
        const userExists = await User.exists({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(409).send('Email already in use.');
        }

        // encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10); // 10 char random salt  

        // create user document and save in database
        const user = await User.create({
            email: email.toLowerCase(),
            username: username,
            password: encryptedPassword
        });

        // create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '24h'
            }
        );

        res.status(201).json({
            userDetails: {
                email: user.email,
                username: user.username,
                token: token,
                _id: user._id
            }
        });
    } catch (err) {
        return res.status(500).send("Error occured. Please try again")
    }


    res.send('register route');
}

module.exports = postRegister;
