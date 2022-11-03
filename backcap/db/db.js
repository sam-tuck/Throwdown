const mysql = require("mysql2");
const {mysqlConfig} = require("../config");
const db = mysql.createPool({
    host:mysqlConfig.host,
    user:mysqlConfig.user,
    password:mysqlConfig.password,
    database:mysqlConfig.database
});

module.exports={
    db
}