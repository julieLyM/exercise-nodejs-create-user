const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async function(req, res, next) {
  const { data } = await axios.get(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/users/`
  );
  res.send(data);
});

router.get("/:userId", async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.get(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/users/${userId}`
  );
  res.send(data);
});

router.post("/", async function(req, res) {
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

router.put("/:userId", async function(req, res) {
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

router.patch("/:userId", async function(req, res) {
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

router.delete("/:userId", async function(req, res) {
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

module.exports = router;
