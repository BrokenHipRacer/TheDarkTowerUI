import { Component } from "react"

import Header from "../components/header.js"
import Footer from "../components/footer.js"
import HeadMetadata from "../components/headMetadata.js"

import initGoogleAnalytics from "../utils/googleAnalytics.js"

export default class extends Component {
  static getInitialProps({ req, res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null

    return {
      statusCode: statusCode
    }
  }

  componentDidMount() {
    initGoogleAnalytics()
  }

  render () {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="Error | Andrew Alsberge  Blog"
        />
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
              <p>An error occurred when trying to fulfill your request. Please try reloading the page or going back to the homepage.</p>
            </>
          }
        </div>
        <Footer />
      </div>
    )
  }
}
