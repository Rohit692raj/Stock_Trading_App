const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    userName: {
        type: String,
        required: [true, 'userName is required'],
        unique: true,
        minlength: [4, 'userName must be at least 4 characters long'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number']
    },
    profilePicture: {
        type: String,
        default: null
    },
    googleId: {
        type: String
       
    },
    accountBalance: {
        type: Number,
        default: 0
    },
    portfolioValue: {
        type: Number,
        default: 0
    },
    watchlist: {
        type: [
            {
                symbol: { type: String, required: true },
                name: { type: String, required: true }
            }
        ],
        default: []
    },
    holdings: {
        type: [
            {
                symbol: { type: String, required: true },
                quantity: { type: Number, required: true },
                averagePrice: { type: Number, required: true }
            }
        ],
        default: []
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'companyUser'],
        default: 'user'
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
    
}) 

const User = mongoose.model('User', userSchema);

module.exports = User;
