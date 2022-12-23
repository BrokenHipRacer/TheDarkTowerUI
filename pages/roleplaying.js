import { Component } from 'react'

import Footer from '../components/footer'
import Header from '../components/header'
import HeadMetadata from '../components/headMetadata'

import initGoogleAnalytics from "../utils/googleAnalytics.js"

export default class extends Component {

  componentDidMount() {
    initGoogleAnalytics()
  }

  render() {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="Roleplaying | Andrew Alsberge Blog"
          metaDescription="Andrew Alsberge is a full stack developer and quality engineer."
        />
        <Header />
        <div className="roleplaying-container">
          <div className="dungeonsNDragons-section">
            <h1>Dungeons and Dragons</h1>
            <ul>
              <li><strong>Foundry Game Table</strong>: <a href="https://foundry.games.alsberge.dev">Current Game is Out Of The Abyss</a></li>
              <li><strong>Foundry Personal Table</strong>: <a href="https://foundry.characters.alsberge.dev">My various personal notes and game ideas</a></li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
