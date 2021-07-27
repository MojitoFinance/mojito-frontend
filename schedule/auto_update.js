// import schedule from 'node-schedule'
import axios from 'axios' 

// const scheduleCronstyle = ()=>{
//     schedule.scheduleJob("10 * * * *", () => {
//         const host = "http://localhost:8000/"
//         axios.post(host + "api/autoBuy")
//     })

//     schedule.scheduleJob("30 * * * *", () => {
//         const host = "http://localhost:8000/"
//         axios.post(host + "api/autoSell")
//     })
// }

// scheduleCronstyle()

const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))

setInterval(async () => {
    const host = "http://localhost:8000/"
    await axios.post(host + "api/autoBuy")    
    // await delay(15000)
    // await axios.post(host + "api/autoSell")
}, 60000)
    