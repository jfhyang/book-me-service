const express = require("express")
const router = express.Router()
const client = require("../models/client")
const weixinUtil = require("../utils/weixin-util")

router.get("/books/:bid", async (req, res) => {
    const clientId = weixinUtil.getOpenId(req)
    const bussinessId = req.params.bid
    return client.getBooks(clientId, bussinessId)
})

router.delete("/books/:bid/:bookId", async (req, res) => {
    const clientId = weixinUtil.getOpenId(req)
    const bid = req.params.bid
    const bookId = req.params.bookId
    return client.finishBook(clientId, bid, bookId)
})

module.exports = router