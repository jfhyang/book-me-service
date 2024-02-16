const express = require("express")
const router = express.Router()
const books = require("../models/books")
const weixinUtil = require("../utils/weixin-util")

router.get("/books/:bussinessId", async (req, res) => {
    try{
        const clientId = weixinUtil.getOpenId(req)
        const bussinessId = req.params.bussinessId
        const books = await books.getBooksForClient({clientId, bussinessId})
        res.send({status: "ok", books})
    }catch(e){
        console.error(e)
        res.status(500).send({status: "error", message: e.message})
    }
})

router.delete("/books/:bussinessId/:bookId", async (req, res) => {
    try{
        const clientId = weixinUtil.getOpenId(req)
        const bussinessId = req.params.bussinessId
        const bookId = req.params.bookId
        await books.finishBook({clientId, bussinessId, bookId})
        res.send({status: "ok"})
    }catch(e){
        console.error(e)
        res.status(500).send({status: "error", message: e.message})
    }
})

module.exports = router