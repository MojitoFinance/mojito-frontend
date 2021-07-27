import db from "../database/db.js"
import axios from "axios"
import CryptoJS from "crypto-js/crypto-js"

const User = db.User
const ACCESS_KEY = "77cb41203927f6bb8e8e82ee4488af275699d7a5f835b527d79808ab3bbb256e"
const SECRET_KEY = "8483df1d6e7832d95dd7d9214acb86cfbcb30a73ea644658f9ab1dc45be749cc"
const BASE_URL = "https://api.bkex.cc/v2"

export async function test(req, res) {
    console.log(req, res)
    let callBackData = {
        success: true,
        status: 200,
        message: "Success",
        data: null,
    }
    res.send(callBackData)
}

export async function getAccountBalance(req, res) {
    console.log("get_sign", get_sign(""))
    const { data } = await axios.get(BASE_URL + "/u/account/balance", {
        // params: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            X_ACCESS_KEY: ACCESS_KEY,
            X_SIGNATURE:  await get_sign(""),
        },
    })
    console.log("data",data)
    let callBackData = {
        status: 200,
        message: "Success",
        data: data?.data,
    }
    res.send(callBackData)
}

export async function getSymbols(req, res) {
    const { data } = await axios.get(BASE_URL + "/common/symbols", {
        // params: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            X_ACCESS_KEY: ACCESS_KEY,
            X_SIGNATURE: await get_sign(""),
        },
    })
    let callBackData = {
        status: 200,
        message: "Success",
        data: data?.data,
    }
    res.send(callBackData)
}

export async function getPrice(req, res) {
    const { symbol } = req.query
    const { data } = await axios.get(BASE_URL + "/q/ticker/price?symbol=" + symbol, {
        // params: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            X_ACCESS_KEY: ACCESS_KEY,
            X_SIGNATURE: await get_sign(""),
        },
    })
    let callBackData = {
        status: 200,
        message: "Success",
        data: data?.data,
    }
    res.send(callBackData)
}

export async function batchCreate(req, res) {
    const { orders } = req.query
    const { data } = await axios({
        url: BASE_URL + "/u/order/batchCreate?orders=" + decodeURI(orders),
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            X_ACCESS_KEY: ACCESS_KEY,
            X_SIGNATURE: await get_sign("orders=" + decodeURI(orders)),
        },
    })
    console.log(BASE_URL + "/u/order/batchCreate?orders=" + decodeURI(orders))
    console.log(data)
    let callBackData = {
        status: 200,
        message: "Success",
        data: data?.data,
    }
    res.send(callBackData)
}

export async function autoBuy(req, res) {
    let value =  req?.body?.value ? req?.body?.value : 0.00123
    console.log(value)
    const orders = JSON.stringify([
        {
            volume: (parseFloat(value) * ((Math.random() * 50 + 50) / 100)).toFixed(5),
            direction: "BID",
            symbol: "UCT_USDT",
            source: "WALLET",
            type: "MARKET",
        },
    ])
    const { data } = await axios({
        url: BASE_URL + "/u/order/batchCreate?orders=" + decodeURI(orders),
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            X_ACCESS_KEY: ACCESS_KEY,
            X_SIGNATURE: await get_sign("orders=" + decodeURI(orders)),
        },
    })
    console.log(data)
    let callBackData = {
        status: 200,
        message: "Success",
        data: data?.data,
    }
    res.send(callBackData)
}

export async function autoSell(req, res) {
    let value = req?.body?.value ? req?.body?.value : 0.00123
    const orders = JSON.stringify([
        {
            volume: (parseFloat(value) * ((Math.random() * 50 + 50) / 100)).toFixed(5),
            direction: "ASK",
            symbol: "UCT_USDT",
            source: "WALLET",
            type: "MARKET",
        },
    ])
    const { data } = await axios({
        url: BASE_URL + "/u/order/batchCreate?orders=" + decodeURI(orders),
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            X_ACCESS_KEY: ACCESS_KEY,
            X_SIGNATURE: await get_sign("orders=" + decodeURI(orders)),
        },
    })
    console.log(data)
    let callBackData = {
        status: 200,
        message: "Success",
        data: data?.data,
    }
    res.send(callBackData)
}

const get_sign = async (obj) => {
    let hash = CryptoJS.HmacSHA256(obj, SECRET_KEY)
    let hashInHex = CryptoJS.enc.Hex.stringify(hash)
    console.log("hashInHex",hashInHex)
    return hashInHex
}

