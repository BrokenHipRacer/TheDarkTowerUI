import axios from 'axios';

import apiBaseUrl from '../utils/apiBaseUrl';

/**
 * Requests all blog posts
 * @return {Object} Blog posts
 */
export default async function() {
  try {
    const response = await axios(`${apiBaseUrl}/posts/get-all-blog-posts`);
    return response.data;
  } catch (error) {
    return {getDataError: true};
  }
}
