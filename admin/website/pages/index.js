import { Component } from "react";

import Header from "../components/header"
import Sidebar from "../components/sidebar"

export default class extends Component {
    render () {
        return (
            <div className="layout-wrapper">
                <Header />
                <Sidebar page="blog-posts" />
                <div className="layout-content-container">
                    Page content goes here.
                </div>
            </div>
        )
    }
}
