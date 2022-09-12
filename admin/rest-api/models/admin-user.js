const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

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
}, {collection: "admin-users"})

// Saves the user"s password hashed (plain text password storage is not good)
AdminUserSchema.pre("save", function (next) {
    const user = this
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
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

AdminUserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model("AdminUser", AdminUserSchema)
