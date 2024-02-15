const mysql = require("../db/mysql");
const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;
console.log(`mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}`)
const db = mysql({host:MYSQL_HOST, port:MYSQL_PORT, user:MYSQL_USER, password:MYSQL_PASSWORD, database:MYSQL_DATABASE});

async function query(sql, params){
    return await db.query(sql, params)
}

module.exports = {
    books: {
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
    },
    createBooks: async function(){
        const sql = `create table if not exists ${this.books.NAME} (
            ${this.books.fields.ID} int auto_increment primary key,
            ${this.books.fields.USER_ID} varchar(32) not null,
            ${this.books.fields.CLIENT_ID} varchar(32) not null,
            ${this.books.fields.BUSSINESS_ID} varchar(32) not null,
            ${this.books.fields.STATUS} int not null,
            ${this.books.fields.BOOK_TIME} bigint not null,
            ${this.books.fields.FINISH_TIME} bigint,
            ${this.books.fields.CANCEL_TIME} bigint
        )`
        return await db.query(sql)
    },
    query
}