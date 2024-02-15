const mysql = require("../../db/mysql")

test("create test table", async () => {
    const db = mysql().database("test")
    var r= await db.query("CREATE TABLE IF NOT EXISTS test (id INT AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))")
    console.log(r)
    r = await db.query("INSERT INTO test (name) VALUES ('test')")
    console.log(r)
    const [rows, fields] = await db.query("SELECT * FROM test")
    console.log(rows)
    console.log(fields)
    db.close()
})