const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.get("/", function(req, res) {
  res.send("home movie");
});

app.get("/movie", async function(req, res) {
  const { data } = await axios.get(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/`
  );
  res.send(data);
});

app.get("/movie/:movieId", async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.get(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/${movieId}`
  );
  res.send(data);
});

app.post("/movie", async function(req, res) {
  const movieId = Date.now();
  const {
    data
  } = await axios.post(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/${movieId}`,
    req.body,
    { headers: { "Content-type": "application/json" } }
  );
  res.send(data);
});

app.put("/movie/:movieId", async function(req, res) {
  const movieId = req.params.movieId;
  const {
    data
  } = await axios.put(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/${movieId}`,
    req.body,
    { headers: { "Content-type": "application/json" } }
  );
  res.send(data);
});

app.patch("/movie/:movieId", async function(req, res) {
  const movieId = req.params.movieId;
  const {
    data
  } = await axios.put(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/${movieId}/${req.body.title}`,
    `"${req.body.value}"`,
    { headers: { "Content-type": "application/json" } }
  );
  res.send(data);
});

app.delete("/movie/:movieId", async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.delete(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/${movieId}`
  );
  res.send(data);
});

const server = app.listen(5001, function() {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
