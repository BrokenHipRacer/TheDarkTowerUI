const moment = require("moment")
const { v4 : uuid4v } = require("uuid")

const BlogPostModel = require("../../models/post")

module.exports = {
    createNewBlogPost: function(title, urlTitle, dateTimestamp, tags, thumbnailImageUrl, markdownContent, seoTitleTag, seoMetaDescription, callback) {
        BlogPostModel.findOne({$or: [{title: title}, {urlTitle: urlTitle}]}).exec(function(error, post) {
            if (error) {
                callback({submitError: true})
            } else if (post) {
                callback({alreadyExistsError: true})
            } else {
                const arrayOfTags = tags.split(",").map(function(tag) {
                    return tag.trim()
                })

                const newBlogPost = new BlogPostModel({
                    id: uuid4v(),
                    title: title,
                    urlTitle: urlTitle,
                    dateTimestamp: dateTimestamp,
                    tags: arrayOfTags,
                    thumbnailImageUrl: thumbnailImageUrl,
                    markdownContent: markdownContent,
                    seoTitleTag: seoTitleTag,
                    seoMetaDescription:seoMetaDescription
                })

                newBlogPost.save(function(saveError) {
                    if (saveError) {
                        callback({submitError: true})
                    } else {
                        callback({success: true})
                    }
                })
            }
        })
    },

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
