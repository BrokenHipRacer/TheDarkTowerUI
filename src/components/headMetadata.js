import React, {Component} from 'react';
import Head from 'next/head';

/**
 * Custom Header Metadata
 */
export default class headMetadata extends Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180"
          href="/apple-touch-icon.png" />
        <link rel="icon" type="image/jpg" sizes="32x32"
          href="/tiny_logo_32_size.jpg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.metaDescription} />
      </Head>
    );
  }
}
