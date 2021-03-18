import { sequelize } from "./dbSequel_config.js";
import Sequelize from "sequelize";

const User = sequelize.define("users", {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
export default User;
