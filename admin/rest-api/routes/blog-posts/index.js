const express = require("express")

const api = require("./api")

const authAdminUser = require("../../middlewares/index").authAdminUser

const app = express.Router()

app.post("/blog-posts/create-new", authAdminUser, function(req, res) {
    if (
        !req.body.title ||
        !req.body.urlTitle ||
        !req.body.dateTimestamp ||
        !req.body.tags ||
        !req.body.thumbnailImageUrl ||
        !req.body.markdownContent ||
        !req.body.seoTitleTag ||
        !req.body.seoMetaDescription
    ) {
        res.json({submitError: false})
    } else if (!res.locals.authSuccess) {
        res.json({authSuccess: false})
    } else {
        api.createNewBlogPost(
            req.body.title,
            req.body.urlTitle,
            req.body.dateTimestamp,
            req.body.tags,
            req.body.thumbnailImageUrl,
            req.body.markdownContent,
            req.body.seoTitleTag,
            req.body.seoMetaDescription,
            function(apiResponse) {
                apiResponse.authSuccess = true
                res.json(apiResponse)
            }
        )
    }
})

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
