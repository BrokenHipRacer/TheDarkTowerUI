import { Component } from "react"

import Header from "../components/header"
import Footer from "../components/footer"

export default class extends Component {
    render () {
        return (
            <div className="layout-wrapper">
                <Header />
                <div className="homepage-container">
                    Homepage content goes here.
                </div>
                <Footer />
            </div>
        )
    }
}
