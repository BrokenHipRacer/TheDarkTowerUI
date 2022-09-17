import React, {Component} from 'react';
import Head from 'next/head';

/**
 * Google Analytics component
 */
export default class GoogleAnalytics extends Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <>
        {
          process.env.NODE_ENV === 'production' && process.browser ?
              <Head>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}/>
                <script
                  async
                  dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || []; 
                      function gtag(){dataLayer.push(arguments);}
                      gtag("js", new Date());
                      gtag("config", "${process.env.GOOGLE_ANALYTICS_ID}");`}}
                />
              </Head> : null
        }
      </>
    );
  }
}
