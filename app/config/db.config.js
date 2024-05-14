module.exports = {
  // HOST: "localhost", //for mycom
  HOST: "jmeet-postgres-1",// for docker
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