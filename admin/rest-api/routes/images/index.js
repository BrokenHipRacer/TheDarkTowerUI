const express = require("express")

const api = require("./api")

const authAdminUser = require("../../middlewares/index").authAdminUser

const app = express.Router()

app.get("/images/get-all-images", authAdminUser, (req, res) => {
    if (!res.locals.authSuccess) {
        res.json({authSuccess: false})
    } else {
        api.getAllImages(function(response) {
            response.authSuccess = true
            res.json(response)
        })
    }
})

module.exports = app
