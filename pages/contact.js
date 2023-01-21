import { Component } from "react"

import Header from "../components/header.js"
import Footer from "../components/footer.js"
import HeadMetadata from "../components/headMetadata.js"

import initGoogleAnalytics from "../utils/googleAnalytics.js"

export default class extends Component {
  componentDidMount() {
    initGoogleAnalytics()
  }

  render () {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
            title="Contact | Andrew Alsberge Blog"
            metaDescription="questions, comments, concerns, critiques, or ideas email andrew@alsberge.email."
        />
        <Header />
        <div className="contact-container">
          <div className="contact-section">
            <h1>Contact</h1>
              <p>Hello, I'm Andrew Alsberge, a full stack software and quality engineer certainly located in Texas. I write about my random coding and table top roleplaying.</p>
              <p>If you have questions, comments, concern, critiques, or ideas, please send me an email at <a href = "mailto: andrew@alsberge.email">andrew@alsberge.email</a></p>
          </div>
          <div className="contact-section">
            <h2>Where to find me on the web</h2>
            <ul>
                <li><strong>Email</strong>: <a href="mailto: andrew@alsberge.email">andrew@alsberge.email</a></li>
                <li><strong>Github</strong>: <a href="https://github.com/BrokenHipRacer">Broken Hip Racer</a></li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
