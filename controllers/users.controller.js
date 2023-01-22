const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const axios = require("axios");
const { response } = require('express');

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
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

exports.profile = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await User.findOne({ email });
        if (!user) {
            throw "User doesn't exist";
        }
        res.status(200).send({ email, createdAt: user.createdAt, name: user.name });

    } catch (error) {
        res.status(500).send({ error: error.errors?.[0]?.message || error });
    }
}

exports.reverseGeoCode = async (req, res) => {
    try {
        const { coordinateA, coordinateB } = req.query;
        console.log(coordinateA, coordinateB)
        const address = await this.getReverseGeoCodeFn(coordinateA, coordinateB);

        res.status(200).send({ address });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.errors?.[0]?.message || error });
    }
}

exports.getReverseGeoCodeFn = async (coordinateA, coordinateB) => {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinateA},${coordinateB}&sensor=true&key=${process.env.GMAPSKEY}`;
    const response = await axios(URL).then(async (response) => response.data);
    const addressComponents = response.results[0].address_components;

    const address = `${addressComponents[2].short_name}, ${addressComponents[4].short_name}`;
    return address;
}