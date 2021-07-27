
export default function (router, handle) {
    /** api **/
    router.get("/api/getAccountBalance", require("../container/server").getAccountBalance)
    router.get("/api/getSymbols", require("../container/server").getSymbols)
    router.get("/api/getPrice", require("../container/server").getPrice)
    router.post("/api/batchCreate", require("../container/server").batchCreate)
    router.post("/api/autoBuy", require("../container/server").autoBuy)
    router.post("/api/autoSell", require("../container/server").autoSell)

    // Default catch-all handler to allow Next.js to handle all other routes
    router.all("*", (req, res) => handle(req, res))
}