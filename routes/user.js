const express = require("express")
const router = express.Router()
const books = require("../models/books")
const weixinUtil = require("../utils/weixin-util")

router.get("/books/:clientId/:bussinessId", async (req, res) => {
    try{
        const userId = weixinUtil.getOpenId(req)
        const clientId = req.params.clientId
        const bussinessId = req.params.bussinessId
        const books = await books.getBooksForUser({userId, clientId, bussinessId})
        res.send({status: "ok", books})
    }catch(e){
        console.error(e)
        res.status(500).send({status: "error", message: e.message})
    }
})

router.post("/books/:clientId/:bussinessId", async (req, res) => {
    try{
        const userId = weixinUtil.getOpenId(req)
        const clientId = req.params.clientId
        const bussinessId = req.params.bussinessId
        const bookId = await books.addBook({userId, clientId, bussinessId})
        res.send({status: "ok", bookId})
    }catch(e){
        console.error(e)
        res.status(500).send({status: "error", message: e.message})
    }
})

router.delete("/books/:clientId/:bussinessId/:bookId", async (req, res) => {
    try{
        const userId = weixinUtil.getOpenId(req)
        const clientId = req.params.clientId
        const bussinessId = req.params.bussinessId
        const bookId = req.params.bookId
        await books.cancelBook({userId, clientId, bussinessId, bookId})
        res.send({status: "ok"})
    }catch(e){
        console.error(e)
        res.status(500).send({status: "error", message: e.message})
    }
})

module.exports = router