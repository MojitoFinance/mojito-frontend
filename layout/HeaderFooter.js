import { withTranslation } from '../i18n';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import React from 'react';

const HeaderFooter = (props) => {
  const { activeIndex } = props;

  return (
    <div className={`styles.wrapper`}>
      <Head>
        <meta itemProp="image" content="/logo.png" />
        <meta charSet="utf-8" />
        <meta name="renderer" content="webkit" />
        <meta name="author" content="teamoe" />
        <meta name="generator" content="teamoe" />
        <meta name="copyright" content="mojito" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta httpEquiv="Cache-Control" content="no-transform" />
        <meta httpEquiv="Cache-Control" content="no-siteapp" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="bookmark" href="/favicon.ico" />
        <meta name="description" content="mojito" />
        <meta name="keywords" content="mojito" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="stylesheet" href="/ReactToastify.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                      (function(d) {
                        var config = {
                          kitId: 'uva3cts',
                          scriptTimeout: 3000,
                          async: true
                        },
                        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
                      })(document);
              `,
          }}
        />
      </Head>
      <Header activeIndex={activeIndex} />
      <main className={`styles.container`}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default withTranslation('header')(HeaderFooter);
