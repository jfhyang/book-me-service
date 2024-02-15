const express = require("express")
const router = express.Router()
const books = require("../models/books")
const weixinUtil = require("../utils/weixin-util")

router.get("/books/:bussinessId", async (req, res) => {
    const clientId = weixinUtil.getOpenId(req)
    const bussinessId = req.params.bussinessId
    res.send(await books.getUnfinishedBooksForClient({clientId, bussinessId}))
})

router.delete("/books/:bussinessId/:bookId", async (req, res) => {
    const clientId = weixinUtil.getOpenId(req)
    const bussinessId = req.params.bussinessId
    const bookId = req.params.bookId
    await books.finishBook({clientId, bussinessId, bookId})
    res.send({status: "ok"})
})

module.exports = router