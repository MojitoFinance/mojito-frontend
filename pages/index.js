import Head from "next/head";
import React, { useState, useEffect } from "react";
import { render } from 'react-dom';
import useWallet from "use-wallet";
import { Link, withTranslation } from "../i18n";
import HeaderFooter from "../layout/HeaderFooter";
import classNames from "classnames/bind";
import styles from "../styles/home.less";
import CountUp from 'react-countup';
import ReactTypingEffect from "react-typing-effect"
const cx = classNames.bind(styles);
import Web3 from 'web3';
import { getAccountBalance, getSymbols } from "../api/api"

const Home = ({ t }) => {
    const [faq1State, setFaq1State] = useState(false)
    const [faq2State, setFaq2State] = useState(false)
    const [faq3State, setFaq3State] = useState(false)


    useEffect(async () => {
        const timer = setInterval(async () => {
        }, 3000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const toggleFAQ = (index) => {
        let state = faqActiveIndex
        state[index] = faqActiveIndex[index] == 0 ? 1 : 0
        console.log(state, faqActiveIndex)
        setFaqActiveIndex(state)
    }

    return (
        <HeaderFooter activeIndex={1}>
            <Head>
                <title>{t("title")}</title>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.banner}>
                    <div className={styles.cow}></div>

                    <div className={styles.text}>
                        <h1></h1>
                        <p>MOJITO.finance</p>
                        <p>Future finance leader,<ReactTypingEffect typingDelay={300} eraseSpeed={0} text={["The future of trading."]} /></p>
                        <p>
                            <Link href="http://123.56.72.197:3000/#/home">
                                <button className={styles.lauch}>Launch App</button>
                            </Link>
                            <button className={styles.docs}>Mojito Docs</button>
                            <Link href="#faq" >FAQs</Link>
                        </p>
                    </div>
                </div>
                <div className={styles.data}>
                    <i className={styles.decoration1}></i>
                    <i className={styles.decoration2}></i>
                    <ul>
                        <li>
                            <CountUp start={27621} end={39824} separator="," duration="5" decimal="." decimals="1" prefix="$" suffix="+" />
                            <h1>Total Value Locked</h1>
                        </li>
                        <li>
                            <CountUp start={27621} end={39824} separator="," duration="5" decimal="." decimals="1" prefix="$" suffix="+" />
                            <h1>Total MJT Supply</h1>
                        </li>
                        <li>
                            <CountUp start={27621} end={39824} separator="," duration="5" decimal="." decimals="1" prefix="$" suffix="+" />
                            <h1>Liquidity Providers</h1>
                        </li>
                        <li>
                            <CountUp start={27621} end={39824} separator="," duration="5" decimal="." decimals="1" prefix="$" suffix="+" />
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
                            <h2>Community </h2><h2>Owned</h2>
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
                <div className={cx(styles.advantage, styles.bg_white)}>
                    <i className={styles.decoration3}></i>
                    <i className={styles.decoration4}></i>
                    <i className={styles.decoration5}></i>
                    <h1>Learn more about MojitoSwap</h1>
                    <dl>
                        {/* <dt className={styles.learn1}>
                                <div className={styles.box_item}>
                                <img src="/img/learn_1.svg" />
                            </div> 
                        </dt> */}
                        <dt>
                             <div className={styles.box_item}>
                                <img src="/img/learn_1.svg" />
                                <p>Total MJT Supply</p>
                            </div>
                        </dt>
                        <dt>
                             <div className={styles.box_item}>
                                <img src="/img/learn_2.svg" />
                                <p>How to Swap</p>
                            </div>
                        </dt>                        
                        <dt>
                            <div className={styles.box_item}>
                                <img src="/img/learn_3.svg" />
                                <pre><p className={styles.text_3}>How to <br/> Liquidity mining</p></pre>
                            </div>
                        </dt>
                        {/* <dt className={styles.learn2}></dt>
                        <dt className={styles.learn3}></dt> */}
                    </dl>
                </div>
                <div className={cx(styles.advantage, styles.bg_white)} id="faq">
                    <h1>Frequently asked questions</h1>
                    < div onClick={
                        () => setFaq1State(!faq1State)
                    }
                        className={
                            cx(styles.faq, {
                                active: faq1State
                            })
                        } >
                        <span>1.What is Mojito Finance?</span>
                        <span po mn className={styles.content}>MojitoSwap is a decentralized exchange that allows you to trade cryptocurrencies and tokens without a centralized intermediary, keeping custody of your tokens all the while.</span>
                    </div>
                    < div onClick={
                        () => setFaq2State(!faq2State)
                    }
                        className={
                            cx(styles.faq, {
                                active: faq2State
                            })
                        } >
                        <span>1.What is Mojito Finance?</span>
                        <span className={styles.content}>MojitoSwap is a decentralized exchange that allows you to trade cryptocurrencies and tokens without a centralized intermediary, keeping custody of your tokens all the while.</span>
                    </div>
                    < div onClick={
                        () => setFaq3State(!faq3State)
                    }
                        className={
                            cx(styles.faq, {
                                active: faq3State
                            })
                        } >
                        <span>1.What is Mojito Finance?</span>
                        <span className={styles.content}>MojitoSwap is a decentralized exchange that allows you to trade cryptocurrencies and tokens without a centralized intermediary, keeping custody of your tokens all the while.</span>
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
