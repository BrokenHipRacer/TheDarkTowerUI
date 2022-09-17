import { Component } from "react"

import Header from "../components/header"
import Footer from "../components/footer"
import HeadMetadata from "../components/headMetadata"
import GoogleAnalytics from "../components/googleAnalytics"

export default class extends Component {
    render () {
        return (
            <div className="layout-wrapper">
                <HeadMetadata
                    title="Roleplaying | Andrew Alsberge Blog"
                    metaDescription="Andrew Alsberge is a full stack developer and quality engineer."
                />
                <GoogleAnalytics />
                <Header />
                <div className="roleplaying-container">
                    <div className="dungeonsNDragons-section">
                        <h1>Dungeons and Dragons</h1>
                        <ul>
                            <li><strong>Foundry Game Table</strong>: <a href="https://173.174.124.207:30000">Current Game is Out Of The Abyss</a></li>
                            <li><strong>Foundry Personal Table</strong>: <a href="https://173.174.124.207:30001">My various personal notes and game ideas</a></li>
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
