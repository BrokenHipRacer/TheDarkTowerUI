import React, {Component} from 'react';

import Footer from '../components/footer';
import GoogleAnalytics from '../components/googleAnalytics';
import Header from '../components/header';
import HeadMetadata from '../components/headMetadata';

import getFiveNewestPosts from '../api/getFiveNewestPosts';

/**
 * Main (index) page of the site
 */
export default class MainPage extends Component {
  /**
   * @return {Promise<{posts: *}>}
   */
  static async getInitialProps() {
    const apiResults = await getFiveNewestPosts();

    return {
      posts: apiResults && apiResults.posts,
    };
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="Andrew Alsberge Blog"
          metaDescription="Andrew Alsberge is a full stack developer and quality engineer."
        />
        <GoogleAnalytics />
        <Header />
        <div className="homepage-container">
          <div className="homepage-introduction">
            <h1>Hello, I'm Andrew Alsberge.  Here you will find my personal works</h1>
            <p>I'm a full stack software developer and quality engineer.</p>
            <p>I write about my side works and roleplaying fun.</p>
          </div>
          <div className="homepage-latest-blog-posts">
            <span className="span-error-message">Images are broken at the moment while working on a CORS issue</span>
            <h2>
                            Latest Blog Posts
              <a className="homepage-latest-blog-posts-view-all" href="/blog">View all</a>
            </h2>
            <div className="homepage-latest-blog-posts-list">
              {
                this.props.posts ?
                    this.props.posts.map((post, index) => {
                      return (
                        <a key={index} href={`/blog/${post.urlTitle}`}>
                          <div className="homepage-latest-blog-post">
                            <div className="homepage-latest-thumbnail">
                              <img crossOrigin="use-credentials" src={post.thumbnailImageUrl} />
                            </div>
                            <div className="homepage-latest-blog-post-title">
                              <h3>{post.title}</h3>
                            </div>
                          </div>
                        </a>
                      );
                    }) : null
              }
            </div>
          </div>
          <div className="homepage-projects">
            <h2>My Projects</h2>
            <div className="homepage-projects-list">
              <div className="homepage-project">
                <h3>
                  <a href="https://github.com/BrokenHipRacer/TheDarkTower">
                    <div className="homepage-project-icon">💻</div>
                    <div className="homepage-project-title">The Dark Tower</div>
                  </a>
                </h3>
                <p>A project that has is a running practice of interview coding questions and even has a working api for
                  it</p>
                <div className="homepage-project-btns">
                  <a className="homepage-project-view-btn" href="https://github.com/BrokenHipRacer/TheDarkTower">
                    View
                  </a>
                </div>
              </div>
              <div className="homepage-project">
                <h3>
                  <a href="https://github.com/BrokenHipRacer/DarkArts">
                    <div className="homepage-project-icon">🎨</div>
                    <div className="homepage-project-title">Dark Arts</div>
                  </a>
                </h3>
                <p>This will be my project for AI art generation but it's a work in progress</p>
                <div className="homepage-project-btns">
                  <a className="homepage-project-view-btn" href="https://github.com/BrokenHipRacer/DarkArts">
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
