module.exports = {
  // HOST:"localhost",
    HOST: "jmeet-postgres-1",
    USER: "postgres",
    PASSWORD: "123456",
    DB: "Jmeet",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };