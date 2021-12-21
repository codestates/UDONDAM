require('dotenv').config()
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME ,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "UDONDAM",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT || "3306",
    dialect: "mysql",
    timezone: "+09:00"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
