import axios from 'axios';

import getFiveNewestPosts from '../../src/api/getFiveNewestPosts';

import {randomPost, compareMaps} from '../test.methods';

jest.mock('axios', () => jest.fn());

describe('getFiveNewestPosts, ', () => {
  it('200 with nothing', async () => {
    axios.mockResolvedValue({status: 200, data: {'posts': []}});
    const response = await getFiveNewestPosts();
    expect(response.posts.length).toEqual(0);
  });

  it('200 with single post', async () => {
    const blogpost1 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1]}});
    const response = await getFiveNewestPosts();
    expect(response.posts.length).toEqual(1);
    expect(compareMaps(response.posts[0], blogpost1)).toBeTruthy();
  });

  it('200 with multiple posts', async () => {
    const blogposts = [randomPost(), randomPost(), randomPost(), randomPost(),
      randomPost(), randomPost(), randomPost(), randomPost(), randomPost(),
      randomPost(), randomPost(), randomPost(), randomPost(), randomPost(),
      randomPost(), randomPost(), randomPost(), randomPost(), randomPost(),
      randomPost(), randomPost(), randomPost(), randomPost(), randomPost()];
    axios.mockResolvedValue({status: 200, data: {'posts': blogposts}});
    const response = await getFiveNewestPosts();
    expect(response.posts.length).toEqual(blogposts.length);
  });

  it('200 with multiple posts', async () => {
    const blogpost1 = randomPost();
    const blogpost2 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1, blogpost2]}});
    const response = await getFiveNewestPosts();
    expect(response.posts.length).toEqual(2);
    expect(compareMaps(response.posts[0], blogpost1)).toBeTruthy();
    expect(compareMaps(response.posts[1], blogpost2)).toBeTruthy();
  });

  it('Error', async () => {
    const error = new Error('Not Found');
    axios.mockRejectedValue(error);
    const response = await getFiveNewestPosts();
    expect(response.getDataError).toBeTruthy();
  });
});
