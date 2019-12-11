const express = require("express");
const router = express.Router();
const axios = require("axios");

///////////////////////////////////
//router middleware

router.use("*", (req, res, next) => {
  const requestId = Date.now();
  console.log(req);
  const { data } = axios.post(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/query/${requestId}`,
    {
      verb: `${req.method}`,
      params: `${JSON.stringify(req.params)}`,
      body: `${JSON.stringify(req.body)}`,
      ip: `${req.ip}`
    },
    { headers: { "Content-type": "application/json" } }
  );
  next();
});

///////////////////////////////////
////callback cascade

async function verifyMovie(req, res, next) {
  const movieId = req.params.movieId;
  const {
    data: { result }
  } = await axios.get(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/${movieId}`
  );
  !!result ? next() : res.redirect(`/error/movie/${movieId}`);
}

router.get("/error/movie/:movieId", (req, res) => {
  res.status(404).send(`Not existing with id ${req.params.movieId}`);
});

///////////////////////////////////////
///async callback

const asyncRoute = asyncFunction => async (req, res, next) => {
  try {
    await asyncFunction(req, res, next);
  } catch (e) {
    next();
  }
};

router.get(
  "/",
  asyncRoute(async (req, res) => {
    throw new Error("error");
    // const data = await axios.get(
    //   `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie`
    // );
    // res.send(data);
  })
);

router.get("/", async function(req, res) {
  const { data } = await axios.get(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/`
  );
  res.send(data);
});

router.get("/:movieId", verifyMovie, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.get(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/${movieId}`
  );
  res.send(data);
});

router.post("/", async function(req, res) {
  const movieId = Date.now();
  const {
    data
  } = await axios.post(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/${movieId}`,
    req.body,
    { headers: { "Content-type": "application/json" } }
  );
  res.send(data);
});

router.put("/:movieId", verifyMovie, async function(req, res) {
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

router.patch("/:movieId", verifyMovie, async function(req, res) {
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

router.delete("/:movieId", verifyMovie, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.delete(
    `https://www.jsonstore.io/3d82e7229d2aae283944b8cb8cf20ae94f1c88542df3a475507422ded9a5f393/movie/${movieId}`
  );
  res.send(data);
});

module.exports = router;
