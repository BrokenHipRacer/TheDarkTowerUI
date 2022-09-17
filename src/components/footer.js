import React, {Component} from 'react';

/**
 * Custom Footer component
 */
export default class CustFooter extends Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <footer className="footer-wrapper">
        <div className="footer-links">
          <a href="/blog">Blog</a>
          <a href="/roleplaying">Roleplaying</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-bottom-msg">
          <p>Handcrafted in the U.S.A. Unless otherwise noted, all code is free to use under the MIT License.</p>
        </div>
      </footer>
    );
  }
}
