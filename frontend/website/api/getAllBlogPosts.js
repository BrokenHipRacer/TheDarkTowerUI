import axios from "axios"

import apiBaseUrl from "../utils/apiBaseUrl.js"

export default async function() {
    try {
        const response = await axios(`${apiBaseUrl}/posts/get-all-blog-posts`)
        return response.data
    } catch(error) {
        return {getDataError: true}
    }
}
