import React from 'react';
import {render, screen} from '@testing-library/react';
import axios from 'axios';

import '@testing-library/jest-dom';

import PostsWithTag from '../../../../src/pages/blog/tags/[tag]';
import {randomPost, compareMaps, headerFooterValidation} from '../../../test.methods';

jest.mock('axios', () => jest.fn());

describe('Blog Posts by Tag Page renders', () => {
  it('Without blog posts and no error responses', () => {
    const {container} = render(<PostsWithTag/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(container.getElementsByClassName('blog-posts-get-data-error-msg')).toHaveLength(1);
    expect(screen.queryByText('An error occurred.')).toBeVisible();
  });

  it('With one post', () => {
    const blogpost1 = randomPost();
    const {container} = render(<PostsWithTag posts={[blogpost1]} tag={blogpost1.tags[0]}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(screen.queryByText(blogpost1.tags[0])).toBeVisible();
    expect(screen.queryByText(blogpost1.title)).toBeVisible();
    expect(container.getElementsByClassName('blog-posts-list-item')).toHaveLength(1);
    expect(container.getElementsByClassName('blog-posts-thumbnail')).toHaveLength(1);
    expect(container.getElementsByClassName('blog-posts-list-item-title-and-date')).toHaveLength(1);
    expect(container.getElementsByClassName('blog-posts-list-item-date')).toHaveLength(1);
  });

  it('With multiple posts', () => {
    const blogpost1 = randomPost();
    const blogpost2 = randomPost();
    blogpost2.tags = blogpost1.tags;
    const {container} = render(<PostsWithTag posts={[blogpost1, blogpost2]} tag={blogpost1.tags[0]}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(screen.queryByText(blogpost1.tags[0])).toBeVisible();
    expect(screen.queryByText(blogpost1.title)).toBeVisible();
    expect(screen.queryByText(blogpost2.title)).toBeVisible();
    expect(container.getElementsByClassName('blog-posts-list-item')).toHaveLength(2);
    expect(container.getElementsByClassName('blog-posts-thumbnail')).toHaveLength(2);
    expect(container.getElementsByClassName('blog-posts-list-item-title-and-date')).toHaveLength(2);
    expect(container.getElementsByClassName('blog-posts-list-item-date')).toHaveLength(2);
  });

  it('Without blog posts and getDataError', () => {
    const {container} = render(<PostsWithTag getDataError={true}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(container.getElementsByClassName('blog-posts-get-data-error-msg')).toHaveLength(1);
    expect(screen.queryByText('An error occurred.')).toBeVisible();
  });
});

describe('Blog Posts by Tag Page initialize, ', () => {
  it('getInitialProps with 0', async () => {
    axios.mockResolvedValue({status: 200, data: {}});
    const response = await PostsWithTag.getInitialProps({query: {tag: ''}});
    expect(response.posts).toBeUndefined();
    expect(response.getDataError).toBeUndefined();
  });

  it('getInitialProps with 1 post', async () => {
    const blogpost1 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1]}});
    const response = await PostsWithTag.getInitialProps({query: {blogpost1}});
    expect(compareMaps(response.posts[0], blogpost1)).toBe(true);
    expect(response.getDataError).toBeUndefined();
  });

  it('getInitialProps with multiple posts', async () => {
    const blogpost1 = randomPost();
    const blogpost2 = randomPost();
    blogpost2.tags = blogpost1.tags;
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1, blogpost2]}});
    const response = await PostsWithTag.getInitialProps({query: {blogpost1}});
    expect(compareMaps(response.posts[0], blogpost1)).toBe(true);
    expect(compareMaps(response.posts[1], blogpost2)).toBe(true);
    expect(response.getDataError).toBeUndefined();
  });

  it('getDataError when present while null posts', async () => {
    axios.mockResolvedValue({status: 410, data: {'getDataError': 'Removed'}});
    const response = await PostsWithTag.getInitialProps({query: {'title': ''}});
    expect(response.posts).toBeUndefined();
    expect(response.getDataError).toBe('Removed');
  });

  it('Should have both when provided for some reason', async () => {
    const blogpost1 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1], 'getDataError': 'Removed'}});
    const response = await PostsWithTag.getInitialProps({query: {'title': ''}});
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

