import React from 'react';
import {render, screen} from '@testing-library/react';
import axios from 'axios';

import '@testing-library/jest-dom';

import MainPage from '../../src/pages/index';
import {randomPost, compareMaps, headerFooterValidation} from '../test.methods';

jest.mock('axios', () => jest.fn());

describe('Main Page renders, ', () => {
  it('main page without blog posts', () => {
    const {container} = render(<MainPage/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(container.getElementsByClassName('homepage-latest-blog-post').length).toEqual(0);
  });

  it('main page with one blog post', () => {
    const blogpost1 = randomPost();
    const {container} = render(<MainPage posts={[blogpost1]}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(screen.getByText(blogpost1.title)).toBeVisible();
    expect(container.getElementsByClassName('homepage-latest-blog-post')).toHaveLength(1);
  });

  it('main page with multiple blog posts', () => {
    const blogpost1 = randomPost();
    const blogpost2 = randomPost();
    const {container} = render(<MainPage posts={[blogpost1, blogpost2]}/>);
    headerFooterValidation(container);
    baseValidation(container);
    expect(screen.getByText(blogpost1.title)).toBeVisible();
    expect(screen.getByText(blogpost2.title)).toBeVisible();
    expect(container.getElementsByClassName('homepage-latest-blog-post')).toHaveLength(2);
  });
});

describe('Main Page initialize, ', () => {
  it('getInitialProps with 0', async () => {
    axios.mockResolvedValue({status: 200, data: {'posts': []}});
    const response = await MainPage.getInitialProps();
    expect(response.posts.length).toEqual(0);
  });

  it('getInitialProps with 1 post', async () => {
    const blogpost1 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1]}});
    const response = await MainPage.getInitialProps();
    expect(response.posts.length).toEqual(1);
    expect(compareMaps(response.posts[0], blogpost1)).toBe(true);
  });

  it('getInitialProps with multiple posts', async () => {
    const blogpost1 = randomPost();
    const blogpost2 = randomPost();
    axios.mockResolvedValue({status: 200, data: {'posts': [blogpost1, blogpost2]}});
    const response = await MainPage.getInitialProps();
    expect(response.posts.length).toEqual(2);
    expect(compareMaps(response.posts[0], blogpost1)).toBe(true);
    expect(compareMaps(response.posts[1], blogpost2)).toBe(true);
  });
});

/**
 * Base validation for MainPage
 * @param {Object} container
 */
function baseValidation(container) {
  expect(container.getElementsByClassName('homepage-introduction')).toHaveLength(1);
  expect(container.getElementsByClassName('homepage-latest-blog-posts')).toHaveLength(1);
  expect(container.getElementsByClassName('homepage-latest-blog-posts-view-all')).toHaveLength(1);
  expect(container.getElementsByClassName('homepage-projects')).toHaveLength(1);
}
