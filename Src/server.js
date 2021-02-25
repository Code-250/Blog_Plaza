const express = require("express");

const cors = require("cors");

const app = express();
// express request of content

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./Database/Models");

db.sequelize.sync({force: true}).then(() => {});

app.get("/", (request, response) => {
  response.json({ message: "Hello world this is richard" });
});

// set listener for request
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is up and running on ${port}`);
});
