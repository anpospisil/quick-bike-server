const { Router } = require("express");
const router = new Router();
const Bikes = require("../models").bike
const Reservations = require("../models").reservation
const authMiddleware = require("../auth/middleware")

//get all bikes
router.get("/", async (req, res, next) => {
    try {
      const limit = Math.min(req.query.limit || 25, 500);
      const offset = req.query.offset || 0;
      const bikes = await Bikes.findAll()
      .then((result) =>
        res.send({ bikes: result })
      );
    } catch (e) { 
      next(e);
    }
  });

  //updates bike to unlocked
  router.patch("/unlock", authMiddleware, async (req, res, next) => {
    try{
    const { locked, lockCode } = req.body;
    const user = req.user;
    const reservation = await Reservations.findOne({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });

    const bike = await Bikes.findOne({
      where: { id: reservation.bikeId },
      order: [["createdAt", "DESC"]],
    });
    console.log(lockCode)
    if (lockCode !== bike.lockCode) {
      return res.status(400).send({
        message: "(´◕ ︵ ◕`✿) Sorry, that was not the right lock code" });
    }
    await bike.update({
      locked: locked,
    });
    return res.status(200).send({ bike });
  } catch(e){
    next(e)
  } 
  });

  //updates bike to locked
  router.patch("/lock", authMiddleware, async (req, res, next) => {
    try{
    const { locked } = req.body;
    const user = req.user;
    const reservation = await Reservations.findOne({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });

    const bike = await Bikes.findOne({
      where: { id: reservation.bikeId },
      order: [["createdAt", "DESC"]],
    });

    await bike.update({
      locked: locked,
    });
  
    return res.status(200).send({ bike });
  } catch(e){
    next(e)
  } 
  });

module.exports = router;
