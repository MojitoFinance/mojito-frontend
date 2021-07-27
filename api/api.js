import axios from 'axios'





export const getAccountBalance = async () => {
    try {
        const { data } = await axios.get("/api/getAccountBalance")
        return data?.data
    } catch (error) {
        return 0
    }
}

export const getSymbols = async () => {
    try {
        const { data } = await axios.get("/api/getSymbols")
        return data?.data
    } catch (error) {
        return 0
    }
}

export const getPrice = async (symbols) => {
    try {
        const { data } = await axios.get("/api/getPrice?symbol=" + symbols)
        return data?.data
    } catch (error) {
        return 0
    }
}

export const batchCreate = async (orders) => {
    console.log("orders",orders)
    try {
        const { data } = await axios.post("/api/batchCreate?orders=" + orders)
        return data?.data
    } catch (error) {
        return 0
    }
}

export const autoBuy = async (value) => {
    try {
        const { data } = await axios.post("/api/autoBuy", {
            value: value,
        })
        return data?.data
    } catch (error) {
        return 0
    }
}

export const autoSell = async (value) => {
    try {
        const { data } = await axios.post("/api/autoSell", {
            value: value,
        })
        return data?.data
    } catch (error) {
        return 0
    }
}
