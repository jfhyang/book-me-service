const mysql = require("../../db/mysql")

test("create test table", async () => {
    const db = mysql().database("test")
    const r= await db.query("CREATE TABLE IF NOT EXISTS test (id INT, name VARCHAR(255))")
    db.close()
    console.log(r)
})