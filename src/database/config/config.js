require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: null,
    database: process.env.DEV_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: null,
    database: process.env.TEST_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.PRO_DB_USERNAME,
    password: process.env.PRO_DB_PASSWORD,
    database: process.env.PRO_DATABASE,
    host: process.env.PRO_DB_HOST,
    dialect: "mysql",
  },
};
