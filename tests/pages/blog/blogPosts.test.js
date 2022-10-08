import React from 'react';
import {render, screen} from '@testing-library/react';
import axios from 'axios';

import '@testing-library/jest-dom';

import BlogPosts from '../../../src/pages/blog/index';
import {randomPost, compareMaps, headerFooterValidation} from '../../test.methods';

jest.mock('axios', () => jest.fn());

describe('All Blog Posts Page renders', () => {
  it('Without blog posts', () => {
    const {container} = render(<BlogPosts/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(container.getElementsByClassName('blog-post-get-data-error-msg').length).toEqual(0);
  });

  it('With one post', () => {
    const blogpost1 = randomPost();
    const {container} = render(<BlogPosts posts={[blogpost1]}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(screen.queryByText(blogpost1.title)).toBeVisible();
    expect(container.getElementsByClassName('blog-posts-list-item')).toHaveLength(1);
  });

  it('With multiple blog posts', () => {
    const blogpost1 = randomPost();
    const blogpost2 = randomPost();
    const {container} = render(<BlogPosts posts={[blogpost1, blogpost2]}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(screen.queryByText(blogpost1.title)).toBeVisible();
    expect(screen.queryByText(blogpost2.title)).toBeVisible();
    expect(container.getElementsByClassName('blog-posts-list-item')).toHaveLength(2);
  });
});

describe('Main Page initialize', () => {
  it('getInitialProps with 0', async () => {
    axios.mockResolvedValue({status: 200, data: {'posts': []}});
    const response = await BlogPosts.getInitialProps();
    expect(response.posts.length).toEqual(0);
    expect(response.getDataError).toBeUndefined();
  });

  it('getInitialProps with 1 post', async () => {
    const blogpost1 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1]}});
    const response = await BlogPosts.getInitialProps();
    expect(response.posts.length).toEqual(1);
    expect(compareMaps(response.posts[0], blogpost1)).toBe(true);
    expect(response.getDataError).toBeUndefined();
  });

  it('getInitialProps with multiple posts', async () => {
    const blogpost1 = randomPost();
    const blogpost2 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1, blogpost2]}});
    const response = await BlogPosts.getInitialProps();
    expect(response.posts.length).toEqual(2);
    expect(compareMaps(response.posts[0], blogpost1)).toBe(true);
    expect(compareMaps(response.posts[1], blogpost2)).toBe(true);
    expect(response.getDataError).toBeUndefined();
  });

  it('getDataError when present while null posts', async () => {
    axios.mockResolvedValue({status: 410, data: {'getDataError': 'Removed'}});
    const response = await BlogPosts.getInitialProps();
    expect(response.posts).toBeUndefined();
    expect(response.getDataError).toBe('Removed');
  });

  it('Should have both when provided for some reason', async () => {
    const blogpost1 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1], 'getDataError': 'Removed'}});
    const response = await BlogPosts.getInitialProps();
    expect(response.posts.length).toEqual(1);
    expect(compareMaps(response.posts[0], blogpost1)).toBe(true);
    expect(response.getDataError).toBe('Removed');
  });
});

/**
 * Base validation for MainPage
 * @param {Object} container
 */
function baseValidation(container) {
  expect(container.getElementsByClassName('blog-posts-container')).toHaveLength(1);
  expect(container.getElementsByClassName('blog-posts-list')).toHaveLength(1);
}
