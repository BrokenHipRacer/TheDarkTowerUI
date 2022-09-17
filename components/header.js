import { Component } from "react"

export default class extends Component {
    render () {
        return (
            <header className="header-wrapper">
                <div className="header-container">
                    <div className="header-logo">
                        <a href="/">
                            <img src="/logo_size.jpg"/>
                        </a>
                    </div>
                    <div className="header-links">
                        <a href="/blog">Blog</a>
                        <a href="/roleplaying">Roleplaying</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                    </div>
                </div>
            </header>
        )
    }
}
