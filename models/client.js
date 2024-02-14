const db = require("./db")

module.exports = {
    getBooks: function (clientId, bussinessId){
        const sql = "select * from books where clientId = ? and bussinessId = ? and finished = 0"
        db.query(sql, [clientId, bussinessId])
    }, 
    finishBook: function(clientId, bussinessId, bookId){
        const sql = "update books set finished = 1 where clientId = ? and bussinessId = ? and bookId = ?"
        db.query(sql, [clientId, bussinessId, bookId])
    }
}