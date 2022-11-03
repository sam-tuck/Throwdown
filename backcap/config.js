module.exports = {
    mysqlConfig: {
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "my_db",
    },
    jwtConfig:{
    secret:"mystuff",
    audience:"apitester",
    issuer:"issuer",
    algorithms: ["HS256"],
    expiresIn:"1h"
    },
    mongodbConfig: {
        host: "127.0.0.1",
        dbName: "ndb",
        user: "admin",
        pass: "password",
      },
};