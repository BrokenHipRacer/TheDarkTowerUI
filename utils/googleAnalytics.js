import ReactGA from "react-ga"

export default function() {
  if (process.env.NODE_ENV === "production") {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize("G-3JM49GP7XN")
      window.GA_INITIALIZED = true
    }

    ReactGA.set({page: window.location.pathname})
    ReactGA.pageview(window.location.pathname)
  }
}
