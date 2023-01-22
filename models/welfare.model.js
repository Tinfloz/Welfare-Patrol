const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema = require('./user.model');

const welfareSchema = mongoose.Schema({
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    location: {
        type: { type: String, default: 'Point' },
        coordinates: {
            type: [Number],
            default: undefined,
            required: true
        },
    },
    address: {
        type: String
    },
    neighborhood: {
        type: String
    },
    acceptedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true })


welfareSchema.index({ "location": "2dsphere" });

const Welfare = mongoose.model("Welfare", welfareSchema);
module.exports = Welfare;