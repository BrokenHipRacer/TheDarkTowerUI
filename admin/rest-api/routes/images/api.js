const fs = require("fs")
const path = require("path")

const assetsDirPath = path.join(__dirname, "..", "..", "..", "..", "assets")

module.exports = {
    checkIfImageFilenameExists: function(filename, callback) {
        fs.stat(`${assetsDirPath}/${filename}`, function(error) {
            if (error) {
                callback({success: true})
            } else {
                callback({success: false})
            }
        })
    },

    getAllImages: function(callback) {
        fs.readdir(assetsDirPath, function(error, files) {
            if (error) {
                callback({getDataError: true})
            } else {
                callback({success: true, files: files})
            }
        })
    }
}
