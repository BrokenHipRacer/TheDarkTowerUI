const express = require("express")

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

// ADD API ENDPOINT CODE HERE

module.exports = app
