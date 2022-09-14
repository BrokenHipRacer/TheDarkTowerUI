const express = require("express")

const api = require("./api")

const authAdminUser = require("../../middlewares/index").authAdminUser

const app = express.Router()

app.get("/blog-posts/get-all", authAdminUser, function(req, res) {
    if (!res.locals.authSuccess) {
        res.json({authSuccess: false})
    } else {
        api.getAllBlogPosts(function(apiResponse) {
            apiResponse.authSuccess = true
            res.json(apiResponse)
        })
    }
})

module.exports = app
