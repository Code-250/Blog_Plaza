import Sequelize from "sequelize";
import { sequelize } from "./dbSequel_config.js";

const Post = sequelize.define("posts", {
  title: {
    type: Sequelize.STRING,
  },

  description: {
    type: Sequelize.STRING,
  },
});

export default Post;
