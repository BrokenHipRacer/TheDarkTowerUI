import { Component } from "react"

export default class extends Component {
  render () {
    return (
      <footer className="footer-wrapper">
        <div className="footer-column row">
          <div className="footer-left column">
            <div className="footer-links">
              <a href="/blog">Blog</a>
              <a href="/roleplaying">Roleplaying</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="footer-bottom-msg">
              <p>Handcrafted in the U.S.A. Unless otherwise noted, all code is free to use under the MIT License.</p>
            </div>
          </div>
          <div className="footer-right column">
            <div className="footer-img">
              <img src="/AlsbergeBizCard.png"/>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
