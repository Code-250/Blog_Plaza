import {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect as _dialect,
  pool as _pool,
} from "../Services/system/db_config.js";
import Sequelize from "sequelize";

export const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  _pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle,
  },
});
