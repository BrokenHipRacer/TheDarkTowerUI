// layout
import "../styles/layout.css"

// components
import "../styles/components/header.css"
import "../styles/components/footer.css"

// pages
import  "../styles/pages/homepage.css"

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}
