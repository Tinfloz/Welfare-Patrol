const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw "User doesn't exist";
        }
        if (user.authenticate(password)) {
            let token = jwt.sign(
                {
                    email: user.email
                },
                process.env.SECRET,
                { expiresIn: "120d" }
            );
            res.status(200).send({ token });
        } else {
            res.status(403).send({ error: "Wrong password" });
        }
    } catch (error) {
        res.status(500).send({ error: error.errors?.[0]?.message || error });
    }
}

exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        let token = jwt.sign(
            {
                email: user.email
            },
            process.env.SECRET,
            { expiresIn: "120d" }
        );
        res.status(200).send({ token });
 
    } catch (error) {
        res.status(500).send({ error: error.errors?.[0]?.message || error });
    }
}