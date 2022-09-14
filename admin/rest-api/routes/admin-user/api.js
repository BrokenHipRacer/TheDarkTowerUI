const moment = require("moment")
const { v4: uuidv4 } = require("uuid")

const AdminUserModel = require("../../models/admin-user")

module.exports = {
    authenticateAdminUser: function(userId, authToken, callback) {
        AdminUserModel.findOne({id: userId}).exec(function(error, user) {
            if (error || !user || authToken !== user.authToken || moment().unix() > user.authTokenExpiresTimestamp) {
                callback({success: false})
            } else {
                callback({success: true})
            }
        })
    },

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

    changeAdminUserPassword: function(userId, currentPassword, newPassword, callback) {
        AdminUserModel.findOne({id: userId}).exec(function(error, user) {
            if (error || !user) {
                callback({submitError: true})
            } else {
                user.comparePassword(currentPassword, function(matchError, isMatch) {
                    if (matchError) {
                        callback({submitError: true})
                    } else if (!isMatch) {
                        callback({invalidPasswordCredentialError: true})
                    } else {
                        user.password = newPassword

                        user.save(function(saveError) {
                            if (saveError) {
                                callback({submitError: true})
                            } else {
                                callback({success: true})
                            }
                        })
                    }
                })
            }
        })
    },

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
    },

    removeAdminUserAuthToken: function(userId, callback) {
        AdminUserModel.findOne({id: userId}).exec(function(error, user) {
            if (error || !user) {
                callback({success: false})
            } else {
                user.authToken = null
                user.authTokenExpiresTimestamp = null

                user.save(function(saveError) {
                    if (saveError) {
                        callback({success: false})
                    } else {
                        callback({success: true})
                    }
                })
            }
        })
    }
}
