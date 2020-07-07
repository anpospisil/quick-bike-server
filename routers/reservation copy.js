const { Router } = require("express");
const router = new Router();

const Bikes = require("../models").bike
const Reservations = require("../models").reservation
const User = require("../models").user
const authMiddleware = require("../auth/middleware")


//creates new reservation with startTime, userId and bikeId
router.post("/", authMiddleware, async (req, res) => {
  try {
  const user = req.user  
  console.log(req.user);
  
    if (user === null) {
      return res.status(404).send({ message: " not found!" });
    }

    const bike = await Bikes.findByPk(req.body.bikeId);
  
    if (bike === null) {
      return res.status(404).send({ message: "bike is not found!" });
    }
    const { bikeId, startTime, reserved} = req.body
  
    const reservation = await Reservations.create({
      bikeId: bikeId,
      userId: user.id,
      startTime: startTime
    })
  } catch (error){
    console.log(error)
  }
    res.status(200).send({ reservation, bikeR })
  });
 

  //updates endTime and cost
  router.patch("/end", authMiddleware, async (req, res) => {
    const { endTime, cost } = req.body;
    const user = req.user
    const reservation = await Reservations.findByPk(user.id);
  
    await reservation.update({ endTime, cost });
  
    return res.status(200).send({ reservation });
  });

module.exports = router;
