const db = require("./db")

module.exports = {
    getUnfinishedBooks: async function (clientId, bussinessId){
        const sql = `select * from ${db.books.NAME} where ${db.books.fields.CLIENT_ID} = ? and ${db.books.fields.BUSSINESS_ID} = ? and ${db.books.fields.STATUS} = ${db.books.STATUS_BOOKED}`
        const [rows, fields] = await db.query(sql, [clientId, bussinessId])
        return rows
    }, 
    finishBook: async function(clientId, bussinessId, bookId){
        const timestamp = Date.now()
        const sql = `update ${db.books.NAME} set ${db.books.fields.STATUS} = ${db.books.STATUS_FINISHED}, ${db.books.fields.FINISH_TIME} = ${timestamp}  where ${db.books.fields.CLIENT_ID} = ? and ${db.books.fields.BUSSINESS_ID} = ? and ${db.books.fields.ID} = ?`
        const [r, fields] = await db.query(sql, [clientId, bussinessId, bookId])
    }
}