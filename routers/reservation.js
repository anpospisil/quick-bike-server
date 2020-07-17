const { Router } = require("express");
const router = new Router();

const Bikes = require("../models").bike;
const Reservations = require("../models").reservation;
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");

//creates new reservation with startTime, userId and bikeId
router.post("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    console.log(req.user);

    if (user === null) {
      return res.status(404).send({ message: "user not found!" });
    }

    const bike = await Bikes.findByPk(req.body.bikeId);

    if (bike === null) {
      return res.status(404).send({ message: "bike is not found!" });
    }
    const { bikeId, startTime } = req.body;

    const reservation = await Reservations.create({
      bikeId: bikeId,
      userId: user.id,
      startTime: startTime,
    });
  } catch (e) {
    console.log(e);
  }
  return res.status(200).send({ message: "Reservation created", reservation });
});

//updates bike, sets reserved to true and generates lockCode
router.patch("/", authMiddleware, async (req, res) => {
  try{
  const { reserved } = req.body;
  const lockCode = Math.floor(100000 + Math.random() * 900000)
  const bike = await Bikes.findByPk(req.body.id);
  
  // console.log(lockCode)
  await bike.update({
    reserved: reserved,
    lockCode: lockCode,
  });
  } catch (e) {
    console.log(e)
  }
  return res.status(200).send({ bike });
});

//updates endTime and cost
router.patch("/end", authMiddleware, async (req, res) => {
  try{
  const { endTime, cost } = req.body;
  const user = req.user;
  const reservation = await Reservations.findOne({
    where: { userId: user.id },
    order: [["createdAt", "DESC"]],
  });

  await reservation.update({ endTime, cost });
  } catch(e){
    console.log(e)
  }
  return res.status(200).send({ reservation });
});

//updates set reserved to false
router.patch("/end/bike", authMiddleware, async (req, res) => {
  try{
  const { reserved } = req.body;
  const user = req.user
  const reservation = await Reservations.findOne({
    where: { userId: user.id },
    order: [["createdAt", "DESC"]],
  });
  const bike = await Bikes.findOne({
    where: { id: reservation.bikeId },
    order: [["createdAt", "DESC"]],
  });
 
  await bike.update({
    reserved: reserved,
  });
} catch(e){
  console.log(e)
}
  return res.status(200)
});

//Get all reservations for one user
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const user = req.user
    const reservations = await Reservations.findAll(
      {
        where: { userId: user.id },
        order: [["createdAt", "DESC"]],
      }
    )
    return res.status(200).send({ reservations })
    
  } catch (e) { 
    next(e);
  }
});

module.exports = router;
