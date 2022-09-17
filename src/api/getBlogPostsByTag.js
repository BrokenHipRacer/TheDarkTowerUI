import axios from 'axios';

import apiBaseUrl from '../utils/apiBaseUrl';

/**
 * getBlogPostsByTag
 * @param {string} tag
 * @return {Promise<{getDataError: boolean}|any>} List of Blogs
 */
export default async function(tag) {
  try {
    const response = await axios(`${apiBaseUrl}/posts/get-blog-posts-by-tag?tag=${tag}`);
    return response.data;
  } catch (error) {
    return {getDataError: true};
  }
}
