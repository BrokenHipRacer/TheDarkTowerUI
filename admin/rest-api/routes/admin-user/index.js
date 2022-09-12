const express = require("express")
const tldjs = require("tldjs")

const api = require("./api")
const config = require("../../config")
const authAdminUser = require("../../middlewares/index").authAdminUser

const app = express.Router()

/*
api.createNewAdminUser("<email address>", "<password>", function(apiResponse) {
    console.log(apiResponse)
})
*/

app.get("/users/authenticate", function(req, res) {
    const cookies = req.cookies.adminUser ? req.cookies.adminUser.split("&") : null

    let authUserId = cookies ? cookies[0] : ""
    let authToken = cookies ? cookies[1] : ""

    if (!authUserId || !authToken) {
        res.json({success: false})
    } else {
        api.authenticateAdminUser(authUserId, authToken, function(apiResponse) {
            res.json(apiResponse)
        })
    }
})

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
