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
    }
    */
}
