import React, {Component} from 'react';
import moment from 'moment';

import Footer from '../../../components/footer';
import GoogleAnalytics from '../../../components/googleAnalytics';
import Header from '../../../components/header';
import HeadMetadata from '../../../components/headMetadata';

import getBlogPostsByTag from '../../../api/getBlogPostsByTag';

/**
 * Dynamic page for posts with a given tag
 */
export default class PostsWithTag extends Component {
  /**
   * @param {string} query Blog Tag
   * @return {Promise<{tag, posts: *, getDataError: (boolean|*)}>} List of Blogs with tag
   */
  static async getInitialProps({query}) {
    const apiResult = await getBlogPostsByTag(query.tag);

    return {
      posts: apiResult && apiResult.posts,
      tag: query.tag,
      getDataError: apiResult && apiResult.getDataError,
    };
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title={`Blog posts tagged as "${this.props.tag}" | Andrew Alsberge Blog`}
          metaDescription={`All blog posts tagged as "${this.props.tag}".`}
        />
        <GoogleAnalytics />
        <Header />
        <div className="blog-posts-container">
          <h1>Blog posts tagged as <u>{this.props.tag}</u></h1>
          <div className="blog-posts-list">
            {
                this.props.posts ?
                    this.props.posts.map((post, index) => {
                      return (
                        <a key={index} href={`/blog/${post.urlTitle}`}>
                          <div className="blog-posts-list-item">
                            <div className="blog-posts-thumbnail">
                              <img crossOrigin="anonymous" src={post.thumbnailImageUrl} />
                            </div>
                            <div className="blog-posts-list-item-title-and-date">
                              <h2>{post.title}</h2>
                              <div className="blog-posts-list-item-date">
                                <span>{moment.unix(post.dateTimestamp).format('Do MMMM YYYY')}</span>
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    }) :
                    <div className="blog-posts-get-data-error-msg">
                      <span>An error occurred.</span>
                    </div>
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
