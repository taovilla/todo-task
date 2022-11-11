const express = require("express");
const { json } = require("express");
const router = require('./routing/todoRouter')

const app = express()
app.use(json());

app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});