import Head from "next/head";
import React, { useState, useEffect } from "react";
import { render } from 'react-dom';
import useWallet from "use-wallet";
import { Link, withTranslation } from "../i18n";
import HeaderFooter from "../layout/HeaderFooter";
import classNames from "classnames/bind";
import styles from "../styles/home.less";
import CountUp from 'react-countup';
const cx = classNames.bind(styles);
import Web3 from 'web3';
import { getAccountBalance, getSymbols } from "../api/api"
 
const Home = ({ t }) => {
    const [faqActiveIndex, setFaqActiveIndex] = useState(1)

    useEffect(async () => {
        const timer = setInterval(async () => {
        }, 3000)
        return () => {
            clearInterval(timer)
        }
    }, [])
    

    return (
        <HeaderFooter activeIndex={1}>
            <Head>
                <title>{t("title")}</title>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.banner}>
                    <div className={styles.text}>
                        <div className={styles.cow}></div>
                        <h1></h1>
                        <p>MOJITO.finance</p>
                        <p>Future finance leader,The future of trading.</p>
                        <p>
                            <Link href="/#/home">
                                <button className={styles.lauch}>Launch App</button>
                            </Link>
                            <button className={styles.docs}>Mojito Docs</button>
                            <Link href="/" >FAQs</Link>
                        </p>
                    </div>
                </div>
                <div className={styles.data}>
                    <i className={styles.decoration1}></i>
                    <i className={styles.decoration2}></i>
                    <ul>
                        <li>
                            <CountUp start={27621} end={39824} separator="," decimal="."  decimals="1" prefix="$" suffix="+"/>
                            <h1>Total Value Locked</h1>
                        </li>
                        <li>
                        <CountUp start={27621} end={39824} separator="," decimal="."  decimals="1" prefix="$" suffix="+"/>
                            <h1>Total MJT Supply</h1>
                        </li>
                        <li>
                        <CountUp start={27621} end={39824} separator="," decimal="."  decimals="1" prefix="$" suffix="+"/>
                            <h1>Liquidity Providers</h1>
                        </li>
                        <li>
                        <CountUp start={27621} end={39824} separator="," decimal="."  decimals="1" prefix="$" suffix="+"/>
                            <h1>All Time Trades</h1>
                        </li>
                    </ul>
                </div>
                <div className={styles.advantage}>
                    <i className={styles.decoration1}></i>
                    <i className={styles.decoration2}></i>
                    <h1>Mojito Swap Advantage</h1>
                    <ul>
                        <li className={styles.community}>
                            <h1><img src="/img/advantage1hover.gif" /></h1>
                            <h2>Community Owned</h2>
                            <h3></h3>
                            <p>Mojito is owned by the community，Community Autonomous Exchange</p>
                        </li>
                        <li className={styles.swap}>
                            <h1><img src="/img/advantage2hover.gif" /></h1>
                            <h2>Swap anytime and
                                Anywhere</h2>
                            <h3></h3>
                            <p>Swap tokens and add liquidity,Not subject to centralizedservices</p>
                        </li>
                        <li className={styles.defi}>
                            <h1><img src="/img/advantage3hover.gif" /></h1>
                            <h2>More interestings
                                about Defi</h2>
                            <h3></h3>
                            <p>We will not stick to existing products, and will carry out more innovations in the defi field</p>
                        </li>
                        
                    </ul>
                </div>
                <div className={cx(styles.advantage,styles.bg_white)}>
                    <i className={styles.decoration3}></i>
                    <i className={styles.decoration4}></i>
                    <i className={styles.decoration5}></i>
                    <h1>Learn more about MojitoSwap</h1>
                    <dl>
                        <dt className={styles.learn1}>
                            {/* <div className={styles.box_item}>
                                <img src="/img/learn_1.svg" />
                            </div> */}
                        </dt>
                        <dt className={styles.learn2}></dt>
                        <dt className={styles.learn3}></dt>
                    </dl>
                </div>
                <div className={cx(styles.advantage, styles.bg_white)}>
                    <h1>Frequently asked questions</h1>
                    < div onClick={()=>setFaqActiveIndex(1)} className={cx(styles.faq,{active: faqActiveIndex == 1 })}>
                        <span>1.What is Mojito Finance?</span>
                        <span po mn className={styles.content}>这里需要展开，告诉开发展开后的效果是什么样的。</span>
                    </div>
                    <div onClick={()=>setFaqActiveIndex(2)} className={cx(styles.faq,{active: faqActiveIndex == 2 })}>
                        <span>1.What is Mojito Finance?</span>
                        <span className={styles.content}>这里需要展开，告诉开发展开后的效果是什么样的。</span>
                    </div>
                    <div onClick={()=>setFaqActiveIndex(3)} className={cx(styles.faq,{active: faqActiveIndex == 3 })}>
                        <span>1.What is Mojito Finance?</span>
                        <span className={styles.content}>这里需要展开，告诉开发展开后的效果是什么样的。</span>
                    </div>
                </div>
            </div>
        </HeaderFooter>
    )
}

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "header", "home"],
});


export default withTranslation("home")(Home);
