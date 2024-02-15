const express = require("express")
const router = express.Router()
const user = require("../models/user")
const weixinUtil = require("../utils/weixin-util")

router.get("/books/:cid/:bid", async (req, res) => {
    const userId = weixinUtil.getOpenId(req)
    const clientId = req.params.cid
    const bussinessId = req.params.bid
    res.send(await user.getUnfinishedBooks(userId, clientId, bussinessId))
})

router.post("/books/:cid/:bid", async (req, res) => {
    const userId = weixinUtil.getOpenId(req)
    const clientId = req.params.cid
    const bussinessId = req.params.bid
    const bookId = await user.addBook(userId, clientId, bussinessId)
    res.send({status: "ok", bookId})
})

router.delete("/books/:cid/:bid/:bookId", async (req, res) => {
    const userId = weixinUtil.getOpenId(req)
    const clientId = req.params.cid
    const bussinessId = req.params.bid
    const bookId = req.params.bookId
    await user.cancelBook(userId, clientId, bussinessId, bookId)
    res.send({status: "ok"})
})

module.exports = router