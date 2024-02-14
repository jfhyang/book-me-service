const mysql = require("../db/mysql");
const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;
const db = mysql(MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD).database(MYSQL_DATABASE);
module.exports = {
    query: async function(sql, params){
        return await db.query(sql, params)
    }
}