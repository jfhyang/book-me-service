const express = require("express")
const router = express.Router()
const books = require("../models/books")
const weixinUtil = require("../utils/weixin-util")

router.get("/books/:clientId/:bussinessId", async (req, res) => {
    const userId = weixinUtil.getOpenId(req)
    const clientId = req.params.clientId
    const bussinessId = req.params.bussinessId
    res.send(await books.getUnfinishedBooksForUser({userId, clientId, bussinessId}))
})

router.post("/books/:clientId/:bussinessId", async (req, res) => {
    const userId = weixinUtil.getOpenId(req)
    const clientId = req.params.clientId
    const bussinessId = req.params.bussinessId
    const bookId = await books.addBook({userId, clientId, bussinessId})
    res.send({status: "ok", bookId})
})

router.delete("/books/:clientId/:bussinessId/:bookId", async (req, res) => {
    const userId = weixinUtil.getOpenId(req)
    const clientId = req.params.clientId
    const bussinessId = req.params.bussinessId
    const bookId = req.params.bookId
    await books.cancelBook({userId, clientId, bussinessId, bookId})
    res.send({status: "ok"})
})

module.exports = router