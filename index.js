const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const apiUser = require("./apiUser.js");
const apiMovie = require("./apiMovie.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use("/user", apiUser);
app.use("/movie", apiMovie);

app.get("/", function(req, res, next) {
  res.send("home");
});

const server = app.listen(5000, function() {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
