import React, {Component} from 'react';

import Footer from '../components/footer';
import GoogleAnalytics from '../components/googleAnalytics';
import Header from '../components/header';
import HeadMetadata from '../components/headMetadata';

/**
 * Error page
 */
export default class ErrorPage extends Component {
  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} err
   * @return {{statusCode: *}}
   */
  static getInitialProps({req, res, err}) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return {
      statusCode: statusCode,
    };
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="Error | Andrew Alsberge Blog"
        />
        <GoogleAnalytics />
        <Header />
        <div className="error-container">
          {
              this.props.statusCode === 404 ?
                  <>
                    <h1>404 Page Not Found</h1>
                    <p>I can't seem to find the page you're looking for.</p>
                  </> :
                  <>
                    <h1>An Error Occurred</h1>
                    <p>An error occurred when trying to fulfill your request.
                        Please try reloading the page or going back to the homepage.</p>
                  </>
          }
        </div>
        <Footer />
      </div>
    );
  }
}
