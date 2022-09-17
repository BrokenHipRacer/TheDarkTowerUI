import axios from 'axios';

import apiBaseUrl from '../utils/apiBaseUrl';

/**
 * getFiveNewestPosts
 * @return {Promise<{getDataError: boolean}|any>} List of the 5 latest blog posts
 */
export default async function() {
  try {
    const response = await axios(`${apiBaseUrl}/posts/get-five-newest-posts`);
    return response.data;
  } catch (error) {
    return {getDataError: true};
  }
}
