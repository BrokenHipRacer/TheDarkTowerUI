const express = require("express")
const tldjs = require("tldjs")

const api = require("./api.js")

const config = require("../../config.js")

const app = express.Router()

/*
api.createNewAdminUser("<email address>", "<password>", function(apiResponse) {
    console.log(apiResponse)
})
*/

//think I need to change this to httpsOnly
app.put("/users/login", function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false})
    } else {
        api.loginAdminUser(req.body.email, req.body.password, function(apiResponse) {
            if (!apiResponse.success) {
                res.json({success: false})
            } else {
                const cookieSettings = {
                    path: "/",
                    expires: new Date(apiResponse.authTokenExpiresTimestamp * 1000),
                    httpsOnly: true,
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
