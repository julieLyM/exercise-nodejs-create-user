const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json()); // for parsing application/json

app.get("/", function(req, res) {
  res.send("home");
});

app.post("/user", async function(req, res) {
  console.log(req.body);
  const userId = Date.now();
  const { data } = await axios.post(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/users/${userId}`,
    req.body,
    {
      headers: { "Content-type": "application/json" }
    }
  );
  res.send(data);
});

app.get("/user", async function(req, res) {
  const { data } = await axios.get(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/users/`
  );
  res.send(data);
});

app.get("/user/:userId", async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.get(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/users/${userId}`
  );
  res.send(data);
});

app.put("/user/:userId", async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.put(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/users/${userId}`,
    req.body,
    {
      headers: { "content-type": "application/json" }
    }
  );
  res.send(data);
});

app.patch("/user/:userId", async function(req, res) {
  console.log(req.body);
  const userId = req.params.userId;
  const { data } = await axios.put(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/users/${userId}/${req.body.field}`,
    `"${req.body.value}"`,
    {
      headers: { "content-type": "application/json" }
    }
  );
  res.send(data);
});

app.delete("/user/:userId", async function(req, res) {
  console.log(req.body);
  const userId = req.params.userId;
  const { data } = await axios.delete(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/users/${userId}`,
    {
      headers: { "content-type": "application/json" }
    }
  );
  res.send(data);
});

const server = app.listen(5000, function() {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
