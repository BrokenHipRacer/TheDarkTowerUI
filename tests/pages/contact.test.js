import React from 'react';
import {render} from '@testing-library/react';

import '@testing-library/jest-dom';

import Contact from '../../src/pages/contact';

import {headerFooterValidation} from '../test.methods';

describe('Contact Page renders, ', () => {
    it('with no errors', () => {
        const {container} = render(<Contact/>);
        headerFooterValidation(container);
        baseValidation(container);
    });
});

/**
 * Base validation for Contact
 * @param {Object} container
 */
function baseValidation(container) {
    // core of page
    expect(container.getElementsByClassName('contact-section')).toHaveLength(2);
}

