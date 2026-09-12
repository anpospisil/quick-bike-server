const { Router } = require("express");
const router = new Router();

router.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

router.head("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;