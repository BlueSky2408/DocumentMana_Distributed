const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = process.env.SECRET_ACCESS_TOKEN;
// const crypto = require('crypto');


const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Your name is required'],
        max: 24,
    },
    email: {
        type: String,
        required: [true, 'Your email is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Your password is required'],
        minlength: 8,
    },
    role: {
        type: String,
        required: true,
        default: '0x01',
    },
},
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Generate a salt and hash the password
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.generateAccessJWT = function () {
    let payload = {
        id: this._id,
    };
    return jwt.sign(payload, token, {
        expiresIn: '20m',
    });
};

module.exports = mongoose.model('User', userSchema);
