import { sequelize } from "./dbSequel_config.js";
import Sequelize from "sequelize";
const Post = sequelize.define("post", {
  title: {
    type: Sequelize.STRING,
  },

  description: {
    type: Sequelize.STRING,
  },
});
export default Post;
