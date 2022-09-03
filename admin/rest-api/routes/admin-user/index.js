const express = require("express")
const tldjs = require("tldjs")

const api = require("./api")

const config = require("../../config")

//TODO: when on some internet updated this and then lockdown.  Should do this when connected to the AWS Mongo so not having to redo
// https://www.coding-blog.crfcourses.com/admin-rest-api/add-each-admin-user-feature/add-an-initial-admin-user-to-the-database
/*
api.createNewAdminUser("YOUR_EMAIL_ADDRESS", "YOUR_PASSWORD", function (apiResponse) {
    console.log(apiResponse)
})
 */

const app = express.Router()

app.put("/users/login", function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false})
    } else {
        api.loginAdminUser(req.body.email, req.body.password, function(apiResponse) {
            if (!apiResponse.success) {
                res.json({success: false})
            } else {
                //TODO : I think this is going to have to be httpsOnly true considering .dev
                const cookieSettings = {
                    path: "/",
                    expires: new Date(apiResponse.authTokenExpiresTimestamp * 1000),
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    encode: String,
                    domain: process.env.NODE_ENV === "production" ? tldjs.parse(config.prodAdminURL).domain : ""
                }

                res.cookie("adminUser", apiResponse.userId + "&" + apiResponse.authToken, cookieSettings)

                res.json({success: true})
            }
        })
    }
})

module.exports = app
