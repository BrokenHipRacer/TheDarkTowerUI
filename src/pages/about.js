import React, {Component} from 'react';

import Footer from '../components/footer';
import GoogleAnalytics from '../components/googleAnalytics';
import Header from '../components/header';
import HeadMetadata from '../components/headMetadata';

/**
 * About page
 */
export default class About extends Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="About Me | Andrew Alsberge Blog"
          metaDescription="Andrew Alsberge is a full stack developer and quality engineer."
        />
        <GoogleAnalytics />
        <Header />
        <div className="about-container">
          <div className="about-section">
            <h1>Andrew Alsberge</h1>
            <p>TODO</p>
          </div>
          <div className="about-section">
            <h2>My Projects</h2>
            <ul>
              <li><a href="https://www.google.com/search?q=1">google temp 1</a></li>
            </ul>
          </div>
          <div className="about-section">
            <h2>Currently Using</h2>
            <ul>
              <li><strong>Computer</strong>: M1 MacBook Pro</li>
              <li><strong>Web Hosting</strong>: AWS</li>
              <li><strong>Database Hosting</strong>: AWS</li>
              <li><strong>Editor</strong>: IntelliJ IDEA</li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
