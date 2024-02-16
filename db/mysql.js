const mysql2 = require("mysql2/promise")

class MySql {
    constructor({host, port, user, password, database}){
        this.pool = mysql2.createPool({host,port,user,password,database})
    }

    close(){
        this.pool.end()
    }

    async query(sql, params){
        const s = mysql2.format(sql, params)
        console.log(s)
        return await this.pool.query(s);
    }

}


module.exports = function({host="127.0.0.1", port=3306, user="root", password, database="test"}){
    return new MySql({host, port, user, password, database})
}