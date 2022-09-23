import React from 'react';
import {render, screen} from '@testing-library/react';

import '@testing-library/jest-dom';

import ErrorPage from '../../src/pages/_error';
import {headerFooterValidation} from '../test.methods';

const ErrorMessage404 = '404 Page Not Found';
const OtherMessage = 'An Error Occurred';

describe('Error Page renders, ', () => {
    it('But no error code', () => {
        const {container} = render(<ErrorPage/>);
        headerFooterValidation(container);
        baseValidation(container);
        expect(screen.queryByText(ErrorMessage404)).toBeNull();
        expect(screen.queryByText(OtherMessage)).toBeVisible();
    });

    it('With 404', () => {
        const {container} = render(<ErrorPage statusCode={404} />);
        headerFooterValidation(container);
        baseValidation(container);
        expect(screen.queryByText(ErrorMessage404)).toBeVisible();
        expect(screen.queryByText(OtherMessage)).toBeNull();
    });

    it('With 500', () => {
        const {container} = render(<ErrorPage statusCode={500} />);
        headerFooterValidation(container);
        baseValidation(container);
        expect(screen.queryByText(ErrorMessage404)).toBeNull();
        expect(screen.queryByText(OtherMessage)).toBeVisible();
    });
});

describe('Main Page initialize, ', () => {
    it('getInitialProps with response 200', () => {
        const responseObject = {req: null, res: {statusCode:200}, err: null};
        const response = ErrorPage.getInitialProps(responseObject);
        expect(response.statusCode).toEqual(200);
    });

    it('getInitialProps with error 404', async () => {
        const responseObject = {req: null, res: null, err: {statusCode:404}};
        const response = ErrorPage.getInitialProps(responseObject);
        expect(response.statusCode).toEqual(404);
    });

    it('getInitialProps with error 500', async () => {
        const responseObject = {req: null, res: null, err: {statusCode:500}};
        const response = ErrorPage.getInitialProps(responseObject);
        expect(response.statusCode).toEqual(500);
    });

    it('getInitialProps with nulls', async () => {
        const responseObject = {req: null, res: null, err: null};
        const response = ErrorPage.getInitialProps(responseObject);
        expect(response.statusCode).toBeNull();
    });
});

/**
 * Base validation for MainPage
 * @param {Object} container
 */
function baseValidation(container) {
    expect(container.getElementsByClassName('error-container')).toHaveLength(1);
}

