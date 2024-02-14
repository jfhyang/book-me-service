const mysql = require("mysql2/promise")

class MySql{
    constructor(host, port, user, password){
        this.host = host
        this.port = port
        this.user = user
        this.password = password
    }

    database(name){
        return new MySqlDB(this, name)
    }
}

class MySqlDB {
    constructor(mysql, database){
        this.mysql = mysql
        this.database = database
    }

    #createPool(){
        this.pool = mysql.createPool({
            host: this.mysql.host,
            port: this.mysql.port,
            user: this.mysql.user,
            password: this.mysql.password,
            database: this.database
        })
    }

    #getPool(){
        if(!this.pool){
            this.#createPool()
        }
        return this.pool
    }

    close(){
        if(this.pool){
            this.pool.end()
        }
    }

    async query(sql, params){
        const pool = this.#getPool()
        const result = await pool.query(mysql.format(sql, params));
        return result
    }

}


module.exports = function(host="127.0.0.1", port=3306, user="root", password=undefined){
    return new MySql(host, port, user, password)
}