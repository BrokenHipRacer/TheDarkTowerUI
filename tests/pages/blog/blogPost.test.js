import React from 'react';
import {render, screen} from '@testing-library/react';
import axios from 'axios';

import '@testing-library/jest-dom';

import BlogPost from '../../../src/pages/blog/[title]';
import {randomPost, compareMaps, headerFooterValidation} from '../../test.methods';

jest.mock('axios', () => jest.fn());

describe('All Blog Posts Page renders', () => {
  it('Without blog posts and no error responses', () => {
    const {container} = render(<BlogPost/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(container.getElementsByClassName('blog-post-get-data-error-msg')).toHaveLength(1);
  });

  it('With one post', () => {
    const blogpost1 = randomPost();
    const {container} = render(<BlogPost post={blogpost1}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(screen.queryByText(blogpost1.title)).toBeVisible();
    expect(container.getElementsByClassName('blog-post-top-section')).toHaveLength(1);
    expect(container.getElementsByClassName('blog-post-top-meta')).toHaveLength(1);
    expect(container.getElementsByClassName('blog-post-top-tag-btn')).toHaveLength(2);
    expect(container.getElementsByClassName('blog-post-body-content')).toHaveLength(1);
  });

  it('Without blog posts and no getDataError', () => {
    const {container} = render(<BlogPost getDataError={true}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(container.getElementsByClassName('blog-post-get-data-error-msg')).toHaveLength(1);
    expect(screen.queryByText('An error occurred.')).toBeVisible();
  });

  it('Without blog posts and notFoundError', () => {
    const {container} = render(<BlogPost notFoundError={true}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(container.getElementsByClassName('blog-post-get-data-error-msg')).toHaveLength(1);
    expect(screen.queryByText('Blog post not found.')).toBeVisible();
  });
});

describe('Blog Post Page initialize', () => {
  it('getInitialProps with 0', async () => {
    axios.mockResolvedValue({status: 200, data: {}});
    const response = await BlogPost.getInitialProps({query: {title: ''}});
    expect(response.post).toBeUndefined();
    expect(response.getDataError).toBeUndefined();
  });

  it('getInitialProps with 1 post', async () => {
    const blogpost1 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'post': blogpost1}});
    const response = await BlogPost.getInitialProps({query: {blogpost1}});
    expect(response.post.size).toEqual(blogpost1.size);
    expect(compareMaps(response.post, blogpost1)).toBe(true);
    expect(response.getDataError).toBeUndefined();
  });

  it('getInitialProps with multiple posts', async () => {
    const blogpost1 = randomPost();
    const blogpost2 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'post': blogpost1}});
    const response = await BlogPost.getInitialProps({query: {blogpost1}});
    expect(response.post.size).toEqual(blogpost1.size);
    expect(compareMaps(response.post, blogpost1)).toBe(true);
    expect(compareMaps(response.post, blogpost2)).toBe(false);
    expect(response.getDataError).toBeUndefined();
  });

  it('getDataError when present while null posts', async () => {
    axios.mockResolvedValue({status: 410, data: {'getDataError': 'Removed'}});
    const response = await BlogPost.getInitialProps({query: {'title': ''}});
    expect(response.post).toBeUndefined();
    expect(response.getDataError).toBe('Removed');
  });

  it('Should have both when provided for some reason', async () => {
    const blogpost1 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'post': blogpost1, 'getDataError': 'Removed'}});
    const response = await BlogPost.getInitialProps({query: {'title': ''}});
    expect(response.post.size).toEqual(blogpost1.size);
    expect(compareMaps(response.post, blogpost1)).toBe(true);
    expect(response.getDataError).toBe('Removed');
  });
});

/**
 * Base validation for MainPage
 * @param {Object} container
 */
function baseValidation(container) {
  expect(container.getElementsByClassName('blog-post-container')).toHaveLength(1);
}
