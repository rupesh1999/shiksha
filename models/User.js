const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true,
        lowercase: true,
        default: ["student"]
    },
    authId: {
        type: String,
        default: ""
    },
    authProvider: {
        type: String,
        required: true,
        lowercase: true,
        default: "local"
    },
    avatar: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_960_720.png"
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
});

userSchema.pre("save", function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (pw , callback) {
    bcrypt.compare(pw , this.password , function (err , isMatch){
        if (err) {
            console.log("is in comparing bcrypt password is " , err);
            return callback(err);
        }
        callback(null, isMatch);
    });
};

const User = mongoose.model('user', userSchema, "User");

module.exports = User;