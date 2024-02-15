const db = require("./db")

module.exports ={
    getUnfinishedBooks: async function(userId, clientId, bussinessId){
        const sql = `select * from ${db.books.NAME} where ${db.books.fields.USER_ID} = ? and ${db.books.fields.CLIENT_ID} = ? and ${db.books.fields.BUSSINESS_ID} = ? and ${db.books.fields.STATUS} = ${db.books.STATUS_BOOKED}`
        const [rows, fields] = await db.query(sql, [userId, clientId, bussinessId])
        return rows
    },
    addBook: async function(userId, clientId, bussnessId){
        const timestamp = Date.now()
        const sql = `insert into ${db.books.NAME} (${db.books.fields.USER_ID}, ${db.books.fields.CLIENT_ID}, ${db.books.fields.BUSSINESS_ID}, ${db.books.fields.STATUS}, ${db.books.fields.BOOK_TIME}) values (?, ?, ?, ${db.books.STATUS_BOOKED}, ${timestamp})`
        const [r, fields] = await db.query(sql, [userId, clientId, bussnessId])
        return r.insertId
    },
    cancelBook: async function(userId, clientId, bussinessId, bookeId){
        const timestamp = Date.now()
        const sql = `update ${db.books.NAME} set ${db.books.fields.STATUS} = ${db.books.STATUS_CANCELED}, ${db.books.fields.CANCEL_TIME} = ${timestamp}  where ${db.books.fields.USER_ID}=? and ${db.books.fields.CLIENT_ID} = ? and ${db.books.fields.BUSSINESS_ID} = ? and ${db.books.fields.ID} = ?`
        const [r, fields] = await db.query(sql, [userId, clientId, bussinessId, bookeId])
    }
}