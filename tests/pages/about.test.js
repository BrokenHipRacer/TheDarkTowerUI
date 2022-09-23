import React from 'react';
import {render} from '@testing-library/react';

import '@testing-library/jest-dom';

import About from '../../src/pages/about';

import {headerFooterValidation} from '../test.methods';

describe('About Page renders, ', () => {
  it('with no errors', () => {
    const {container} = render(<About/>);
    headerFooterValidation(container);
    baseValidation(container);
  });
});

/**
 * Base validation for About
 * @param {Object} container
 */
function baseValidation(container) {
  // core of page
  expect(container.getElementsByClassName('about-section')).toHaveLength(3);
}

