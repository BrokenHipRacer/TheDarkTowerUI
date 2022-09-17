import React, {Component} from 'react';
import Prism from 'prismjs';
import moment from 'moment';

import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

import Footer from '../../components/footer';
import GoogleAnalytics from '../../components/googleAnalytics';
import Header from '../../components/header';
import HeadMetadata from '../../components/headMetadata';

import getBlogPostByUrlTitle from '../../api/getBlogPostByUrlTitle';

/**
 * Dynamic Page for a blog post
 */
export default class BlogPost extends Component {
  /**
   * @param {string} query Blog Title
   * @return {Promise<{post: *, notFoundError: *, getDataError: (boolean|*)}>} Blog post
   */
  static async getInitialProps({query}) {
    const apiResult = await getBlogPostByUrlTitle(query.title);

    return {
      post: apiResult && apiResult.post,
      getDataError: apiResult && apiResult.getDataError,
      notFoundError: apiResult && apiResult.notFoundError,
    };
  }

  /**
   *
   */
  componentDidMount() {
    Prism.highlightAll();
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title={this.props.post ? this.props.post.seoTitleTag : 'Blog Post | Andrew Alsberge Blog'}
          metaDescription={this.props.post && this.props.post.seoMetaDescription}
        />
        <GoogleAnalytics />
        <Header />
        <div className="blog-post-container">
          {
              this.props.post ?
                  <>
                    <div className="blog-post-top-section">
                      <h1>{this.props.post.title}</h1>
                      <div className="blog-post-top-meta">
                        <span>{moment.unix(this.props.post.dateTimestamp).format('MMMM Do, YYYY')}</span>
                        {
                          this.props.post.tags.map((tag, index) => {
                            return (
                              <a
                                className="blog-post-top-tag-btn"
                                key={index}
                                href={`/blog/tags/${tag}`}
                              >
                                <span>{tag}</span>
                              </a>
                            );
                          })
                        }
                      </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: this.props.post.markdownContent}}
                      className="blog-post-body-content">
                    </div>
                  </> :
                  <div className="blog-post-get-data-error-msg">
                    {
                        this.props.notFoundError ?
                            <span>Blog post not found.</span> :
                            <span>An error occurred.</span>
                    }
                  </div>
          }
        </div>
        <Footer />
      </div>
    );
  }
}
