import Head from "next/head"
import {useState, useEffect} from "react"
import useWallet from "use-wallet"
import {Link, withTranslation} from "../i18n"
import HeaderFooter from "../layout/HeaderFooter"
import classNames from "classnames/bind"
import {confirmAlert} from 'react-confirm-alert'
import {ToastContainer, toast} from 'react-toastify'
import {withRouter} from "next/router"
import styles from "../styles/detail.less"

import {getAccountBalance, getPrice, batchCreate, autoBuy, autoSell} from "../api/api"

const Home = ({t, router}) => {

    const symbol = router?.query?.symbol
    const [balance, setBalance] = useState([])
    const [price, setPrice] = useState([])

    const [bLowPrice, setBLowPrice] = useState(0)
    const [bHighPrice, setBHighPrice] = useState(0)
    const [bAsset, setBAsset] = useState(0)
    const [bAmount, setBAmount] = useState(0)

    const [sLowPrice, setSLowPrice] = useState(0)
    const [sHighPrice, setSHighPrice] = useState(0)
    const [sAsset, setSAsset] = useState(0)
    const [sAmount, setSAmount] = useState(0)

    const [aLowPrice, setALowPrice] = useState(0)
    const [aHighPrice, setAHighPrice] = useState(0)
    const [aTimes, setATimes] = useState(0)
    const [aAmount, setAAmount] = useState(0)
    const [aStart, setAStart] = useState(false)

    const [asLowPrice, setAsLowPrice] = useState(0)
    const [asHighPrice, setAsHighPrice] = useState(0)
    const [asTimes, setAsTimes] = useState(0)
    const [asAmount, setAsAmount] = useState(0)
    const [asStart, setAsStart] = useState(false)

    useEffect(async () => {
        const timer = setInterval(async () => {
            const accountBalance = await getAccountBalance()
            setBalance(accountBalance?.WALLET)
            const price = await getPrice(symbol)
            setPrice(price)
        }, 3000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const orderBuy = async () => {
        let orders = []

        let spreads = (bHighPrice - bLowPrice) / bAmount

        for (var i = 0; i < bAmount; i++) {
            const orderPrice = (bHighPrice * 1 - i * spreads - spreads * ((Math.random() * 50 + 50) / 100)).toFixed(2)
            orders.push({
                volume: (parseFloat(bAsset) * ((Math.random() * 70 + 50) / 100)).toFixed(5),
                price: orderPrice,
                direction: "BID",
                symbol: symbol,
                source: "WALLET",
                type: "LIMIT",
            })
        }

        console.log(orders)
        const orderList = await batchCreate(JSON.stringify(orders))
        console.log(orderList)

    }

    const orderSell = async () => {
        let orders = []

        let spreads = (sHighPrice - sLowPrice) / sAmount

        for (var i = 0; i < sAmount; i++) {
            const orderPrice = (sLowPrice * 1 + i * spreads + spreads * ((Math.random() * 50 + 50) / 100)).toFixed(2)
            orders.push({
                volume: (parseFloat(sAsset) * ((Math.random() * 70 + 50) / 100)).toFixed(5),
                price: orderPrice,
                direction: "ASK",
                symbol: symbol,
                source: "WALLET",
                type: "LIMIT",
            })
        }

        console.log(orders)
        const orderList = await batchCreate(JSON.stringify(orders))
        console.log(orderList)
    }

    let aTimer = null
    const autoStart = async () => {
        const nowPrice = price[0].price
        console.log("定时器", nowPrice, aHighPrice, aStart)

        if (aTimes <= 0) {
            alert("交易频率不能低于0!")
        }
        aTimer = setInterval(() => {
            if (nowPrice > aHighPrice) {
                //  console.log(aTimer)
                //  if (!!aTimer) {
                //      aTimer.clearInterval()
                //  }
                console.log("超过上限,结束啦!")
                return
            }
            if (nowPrice >= aLowPrice && !aStart) {
                console.log("自动买了", aAmount, "个")
                autoBuy(aAmount)
            }
        }, aTimes * 1000)

    }

    let asTimer = null
    const autosStart = async () => {
        const nowPrice = price[0].price
        console.log("定时器", nowPrice, asHighPrice)
        if (asTimes <= 0) {
            alert("交易频率不能低于0!")
        }
        asTimer = setInterval(() => {
            if (nowPrice < asHighPrice) {
                // if (!!asTimer) {
                //     asTimer.clearInterval()
                // }
                console.log("超过下限,结束啦!")
                return
            }
            if (nowPrice <= asLowPrice && !asStart) {
                autoSell(asAmount)
            }
        }, asTimes * 1000)
    }

    return (
        <HeaderFooter activeIndex={4}>
            <ToastContainer/>
            <Head>
                <title>{t("title")}</title>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.user}>
                    <p>用户余额:</p>
                    <table>
                        <thead>
                        <tr>
                            <th>币种</th>
                            <th>可用</th>
                            <th>冻结</th>
                            <th>总计数量</th>
                        </tr>
                        </thead>
                        <tbody>
                        {balance.map((ele, index) => {
                            return (
                                <tr key={index}>
                                    <td>{ele.currency}</td>
                                    <td>{ele.available}</td>
                                    <td>{ele.frozen}</td>
                                    <td>{ele.total}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div className={styles.list}>
                    <p>操作栏</p>
                    <table>
                        <thead>
                        <tr>
                            <th>交易对</th>
                            <th>当前成交价</th>
                        </tr>
                        </thead>
                        <tbody>
                        {price.map((ele, index) => {
                            return (
                                <tr key={index}>
                                    <td>{ele.symbol}</td>
                                    <td>{ele.price}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <p>批量下单(买单随机数量)</p>
                    <div className={styles.marker}>
                        <table>
                            <thead>
                            <tr>
                                <th>交易对</th>
                                <th>最低价格</th>
                                <th>最高价格</th>
                                <th>投入资金(单个格子不能低于10U)</th>
                                <th>下单个数</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{symbol}</td>
                                <td>
                                    <input step="0.0001" type="number" placeholder="输入最低价格" value={bLowPrice}
                                           onChange={(e) => setBLowPrice(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="输入最高价格" value={bHighPrice}
                                           onChange={(e) => setBHighPrice(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="输入每个格子数量(价格不能低于10U)" value={bAsset}
                                           onChange={(e) => setBAsset(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="输入挂单个数" value={bAmount}
                                           onChange={(e) => setBAmount(e.target.value)}/>
                                </td>
                                <td>
                                    <button onClick={() => orderBuy()}>下单</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>批量下单(卖单随机数量)</p>
                    <div className={styles.marker}>
                        <table>
                            <thead>
                            <tr>
                                <th>交易对</th>
                                <th>最低价格</th>
                                <th>最高价格</th>
                                <th>总卖出数量(单个格子不能低于10U)</th>
                                <th>下单个数</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{symbol}</td>
                                <td>
                                    <input step="0.0001" type="number" placeholder="输入最低价格" value={sLowPrice}
                                           onChange={(e) => setSLowPrice(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="输入最高价格" value={sHighPrice}
                                           onChange={(e) => setSHighPrice(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="输入每个格子出售数量(价格不能低于10U)" value={sAsset}
                                           onChange={(e) => setSAsset(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="输入挂单个数" value={sAmount}
                                           onChange={(e) => setSAmount(e.target.value)}/>
                                </td>
                                <td>
                                    <button onClick={() => orderSell()}>下单</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>自动吃单机器人</p>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>交易对</th>
                                <th>触发价格</th>
                                <th>结束价格</th>
                                <th>吃单频率(秒)</th>
                                <th>购买数量</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{symbol}</td>
                                <td>
                                    <input type="number" placeholder="触发价格" value={aLowPrice}
                                           onChange={(e) => setALowPrice(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="结束价格" value={aHighPrice}
                                           onChange={(e) => setAHighPrice(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="吃单频率(秒)" value={aTimes}
                                           onChange={(e) => setATimes(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="购买数量" value={aAmount}
                                           onChange={(e) => setAAmount(e.target.value)}/>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setAStart(!aStart)
                                            autoStart()
                                        }}
                                    >
                                        {!aStart ? "开始" : "停止"}
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>自动卖单机器人</p>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>交易对</th>
                                <th>触发价格</th>
                                <th>结束价格</th>
                                <th>吃单频率(秒)</th>
                                <th>购买数量</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{symbol}</td>
                                <td>
                                    <input type="number" placeholder="触发价格" value={asLowPrice}
                                           onChange={(e) => setAsLowPrice(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="结束价格" value={asHighPrice}
                                           onChange={(e) => setAsHighPrice(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="吃单频率(秒)" value={asTimes}
                                           onChange={(e) => setAsTimes(e.target.value)}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="购买数量" value={asAmount}
                                           onChange={(e) => setAsAmount(e.target.value)}/>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setAsStart(!asStart)
                                            autosStart()
                                        }}
                                    >
                                        {!asStart ? "开始" : "停止"}
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </HeaderFooter>
    )
}

Home.getInitialProps = async () => ({
    namespacesRequired: ["common", "header", "home"],
});

export default withTranslation("home")(withRouter(Home))
