const express = require("express")
const router = express.Router()
const user = require("../models/user")
const weixinUtil = require("../utils/weixin-util")

router.get("/books/:cid/:bid", async (req, res) => {
    const userId = weixinUtil.getOpenId(req)
    const clientId = req.params.cid
    const bussinessId = req.params.bid
    return user.getBooks(userId, clientId, bussinessId)
})

router.post("/books/:cid/:bid", async (req, res) => {
    const userId = weixinUtil.getOpenId(req)
    const clientId = req.params.cid
    const bussinessId = req.params.bid
    return user.addBook(userId, clientId, bussinessId)
})

router.delete("/books/:cid/:bid/:bookId", async (req, res) => {
    const userId = weixinUtil.getOpenId(req)
    const clientId = req.params.cid
    const bussinessId = req.params.bid
    const bookId = req.params.bookId
    return user.cancelBook(userId, clientId, bussinessId, bookId)
})

module.exports = router