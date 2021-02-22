const dbConfig = require("../Services/db_config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases:false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.posts = require("./posts.model.js")(sequelize, Sequelize);

module.exports = db;
