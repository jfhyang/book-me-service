const db = require("./db")


const TABLE = {
    NAME: "books",
    fields:{
        ID: "id",
        USER_ID: "userId",
        CLIENT_ID: "clientId",
        BUSSINESS_ID: "bussinessId",
        STATUS: "status",
        BOOK_TIME: "bookTime",
        FINISH_TIME: "finishTime",
        CANCEL_TIME: "cancelTime"
    },
    STATUS_BOOKED: 0,
    STATUS_FINISHED: 1,
    STATUS_CANCELED: 2
}

async function createTable(){
    const sql = `create table if not exists ${TABLE.NAME} (
        ${TABLE.fields.ID} int auto_increment primary key,
        ${TABLE.fields.USER_ID} varchar(32) not null,
        ${TABLE.fields.CLIENT_ID} varchar(32) not null,
        ${TABLE.fields.BUSSINESS_ID} varchar(32) not null,
        ${TABLE.fields.STATUS} int not null,
        ${TABLE.fields.BOOK_TIME} bigint not null,
        ${TABLE.fields.FINISH_TIME} bigint,
        ${TABLE.fields.CANCEL_TIME} bigint
    )`
    return await db.query(sql)
}

async function getBooksForClient({clientId, bussinessId}){
    const sql = `select * from ${TABLE.NAME} where ${TABLE.fields.CLIENT_ID} = ? and ${TABLE.fields.BUSSINESS_ID} = ? and ${TABLE.fields.STATUS} = ${TABLE.STATUS_BOOKED}`
    const [rows, fields] = await db.query(sql, [clientId, bussinessId])
    return rows
}

async function finishBook({clientId, bussinessId, bookId}){
    const timestamp = Date.now()
    const sql = `update ${TABLE.NAME} set ${TABLE.fields.STATUS} = ${TABLE.STATUS_FINISHED}, ${TABLE.fields.FINISH_TIME} = ${timestamp}  where ${TABLE.fields.CLIENT_ID} = ? and ${TABLE.fields.BUSSINESS_ID} = ? and ${TABLE.fields.ID} = ?`
    const [r, fields] = await db.query(sql, [clientId, bussinessId, bookId])
}

async function getBooksForUser({userId, clientId, bussinessId}){
    const sql = `select * from ${TABLE.NAME} where ${TABLE.fields.USER_ID} = ? and ${TABLE.fields.CLIENT_ID} = ? and ${TABLE.fields.BUSSINESS_ID} = ? and ${TABLE.fields.STATUS} = ${TABLE.STATUS_BOOKED}`
    const [rows, fields] = await db.query(sql, [userId, clientId, bussinessId])
    return rows
}
async function addBook({userId, clientId, bussnessId}){
    const timestamp = Date.now()
    const sql = `insert into ${TABLE.NAME} (${TABLE.fields.USER_ID}, ${TABLE.fields.CLIENT_ID}, ${TABLE.fields.BUSSINESS_ID}, ${TABLE.fields.STATUS}, ${TABLE.fields.BOOK_TIME}) values (?, ?, ?, ${TABLE.STATUS_BOOKED}, ${timestamp})`
    const [r, fields] = await db.query(sql, [userId, clientId, bussnessId])
    return r.insertId
}
async function cancelBook({userId, clientId, bussinessId, bookeId}){
    const timestamp = Date.now()
    const sql = `update ${TABLE.NAME} set ${TABLE.fields.STATUS} = ${TABLE.STATUS_CANCELED}, ${TABLE.fields.CANCEL_TIME} = ${timestamp}  where ${TABLE.fields.USER_ID}=? and ${TABLE.fields.CLIENT_ID} = ? and ${TABLE.fields.BUSSINESS_ID} = ? and ${TABLE.fields.ID} = ?`
    const [r, fields] = await db.query(sql, [userId, clientId, bussinessId, bookeId])
}

module.exports = {
    getBooksForClient,
    finishBook,
    getBooksForUser,
    addBook,
    cancelBook,
    createTable,
}