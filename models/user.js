const db = require("./db")

module.exports ={
    getBooks: function(userId, clientId, bussinessId){
        const sql = "select * from books where clientId = ? and bussinessId = ? and finished = 0"
        db.query(sql, [clientId, bussinessId])
    },
    addBook: function(userId, clientId, bussnessId){
        const sql = "insert into books (clientId, bussinessId, finished) values (?, ?, 1)"
        db.query(sql, [clientId, bussnessId])
    },
    cancelBook: function(userId, clientId, bussinessId, bookeId){
        const sql = "update books set finished = 0 where userId=? and clientId = ? and bussinessId = ? and bookeId = ?"
        db.query(sql, [userId, clientId, bussinessId, bookeId])
    }
}