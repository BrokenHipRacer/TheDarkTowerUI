const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const AdminUserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    authToken: String,
    authTokenExpiresTimestamp: Number
}, {collation: "admin-users"})

// Saves the user's password hashed (plain text password storage is not good)
// TODO: I want to avoid some of this this process and use OAuth at some point

AdminUserSchema.pre("save", function (next) {
    const user = this
    if (this.isModified("password") || this.isNew) {
        bcrypt.getSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

module.exports = mongoose.model("AdminUser", AdminUserSchema)
