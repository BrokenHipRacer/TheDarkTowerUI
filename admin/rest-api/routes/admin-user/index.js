const express = require("express")

const api = require("./api.js")

const config = require("../../config.js")

const app = express.Router()

/*
api.createNewAdminUser("<email address>", "<password>", function(apiResponse) {
    console.log(apiResponse)
})
*/

module.exports = app
