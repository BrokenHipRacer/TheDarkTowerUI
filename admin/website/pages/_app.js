// layout
import "../styles/layout.css"
import "../styles/components/header.css"
import "../styles/components/sidebar.css"

// pages
import "../styles/login.css"
import "../styles/blog/index.css"
import "../styles/blog/create-new-post.css"

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}
