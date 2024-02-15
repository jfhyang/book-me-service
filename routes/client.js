const express = require("express")
const router = express.Router()
const client = require("../models/client")
const weixinUtil = require("../utils/weixin-util")

router.get("/books/:bid", async (req, res) => {
    const clientId = weixinUtil.getOpenId(req)
    const bussinessId = req.params.bid
    res.send(await client.getUnfinishedBooks(clientId, bussinessId))
})

router.delete("/books/:bid/:bookId", async (req, res) => {
    const clientId = weixinUtil.getOpenId(req)
    const bid = req.params.bid
    const bookId = req.params.bookId
    await client.finishBook(clientId, bid, bookId)
    res.send({status: "ok"})
})

module.exports = router