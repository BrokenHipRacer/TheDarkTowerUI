const moment = require("moment")
const { v4: uuidv4 } = require("uuid")

const AdminUserModel = require("../../models/admin-user")

module.exports = {
    /*
    createNewAdminUser: function(email, password, callback) {
        const newAdminUser = new AdminUserModel({
            id: uuidv4(),
            email: email,
            password: password,
            authToken: uuidv4(),
            authTokenExpiresTimestamp: moment().unix() + (86400 * 3)
        })

        newAdminUser.save(function(newDocError, newDoc) {
            if (newDocError) {
                callback({success: false})
            } else {
                callback({success: true})
            }
        })
    },
    */

    loginAdminUser: function(email, password, callback) {
        AdminUserModel.findOne({email: email}).exec(function(error, user) {
            if (error || !user) {
                callback({success: false})
            } else {
                user.comparePassword(password, function(matchError, isMatch) {
                    if (matchError || !isMatch) {
                        callback({success: false})
                    } else {
                        const authTokenString = uuidv4()
                        const authTokenExpiresTimestamp = moment().unix() + (86400 * 3)

                        user.authToken = authTokenString
                        user.authTokenExpiresTimestamp = authTokenExpiresTimestamp

                        user.save(function(saveError) {
                            if (saveError) {
                                callback({success: false})
                            } else {
                                callback({success: true, userId: user.id, authToken: authTokenString, authTokenExpiresTimestamp: authTokenExpiresTimestamp})
                            }
                        })
                    }
                })
            }
        })
    }
}
