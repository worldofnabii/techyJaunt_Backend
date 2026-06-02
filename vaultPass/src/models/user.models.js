const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'moderator', 'admin'],
            default: 'user'
        },

        // for when a user enters the wrong password 5 consecutive times, within 10 minutes, 
        // their account should be locked for 15 minutes

        failedLoginAttempts: {
            type: Number,
            default: 0,
        },
    lastFailedLogin: {
    type: Date,
    },
    accountLockedUntil: {
    type: Date,
    }
    },
    { timestamps: true, versionKey: false }
);

//During lock: login must fail even if password becomes correct

if (user.isLocked()) {
  return res.status(403).json({ message: "Account locked." });
}

// helps to save to the database.
const User = mongoose.model("User", userSchema);

module.exports = User;