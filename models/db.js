const mysql = require("../db/mysql");
const books = require("./books");
const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;
console.log(`mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}`)
const db = mysql({host:MYSQL_HOST, port:MYSQL_PORT, user:MYSQL_USER, password:MYSQL_PASSWORD, database:MYSQL_DATABASE});

async function query(sql, params){
    return await db.query(sql, params)
}

module.exports = {
    query
}