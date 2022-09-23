import React from 'react';
import {render} from '@testing-library/react';

import '@testing-library/jest-dom';

import Roleplaying from '../../src/pages/roleplaying';

import {headerFooterValidation} from '../test.methods';

describe('Roleplaying Page renders, ', () => {
    it('with no errors', () => {
        const {container} = render(<Roleplaying/>);
        headerFooterValidation(container);
        baseValidation(container);
    });
});

/**
 * Base validation for Roleplaying
 * @param {Object} container
 */
function baseValidation(container) {
    // core of page
    expect(container.getElementsByClassName('dungeonsNDragons-section').length).toBe(1);
}

