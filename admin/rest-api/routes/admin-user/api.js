const moment = require("moment")
const uuid = require("uuid")

const AdminUserModel = require("../../models/admin-user")

module.exports = {
    //TODO referback to todo in admin-user/index
    /*
    createNewAdminUser: function(email, password, callback) {
        const newAdminUser = new AdminUserModel({
            id: uuid.v4(),
            email: email,
            password: password,
            authToken: uuid.v4(),
            authTokenExpiresTimestamp: moment().unix() + (86400 * 3)
        })

        newAdminUser.save(function (newDocError, newDoc) {
            if (newDocError) {
                callback({success: false})
            } else {
                callback({success: true})
            }
        })
    }
    */
}
