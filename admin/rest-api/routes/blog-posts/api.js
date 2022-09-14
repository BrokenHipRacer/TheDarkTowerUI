const moment = require("moment")

const BlogPostModel = require("../../models/post")

module.exports = {
    getAllBlogPosts: function(callback) {
        const now = moment().unix()

        BlogPostModel.find({dateTimestamp: {$lte: now}}, "title id dateTimestamp tags")
            .sort({dateTimestamp: -1})
            .exec(function(activePostsError, activePosts) {
                if (activePostsError) {
                    callback({getDataError: true})
                } else {
                    BlogPostModel.find({dateTimestamp: {$gte: now}}, "title id dateTimestamp tags")
                        .sort({dateTimestamp: -1})
                        .exec(function(upcomingPostsError, upcomingPosts) {
                            if (upcomingPostsError) {
                                callback({getDataError: true})
                            } else {
                                callback({
                                    success: true,
                                    activePosts: activePosts,
                                    upcomingPosts: upcomingPosts
                                })
                            }
                        })
                }
            })
    }
}
