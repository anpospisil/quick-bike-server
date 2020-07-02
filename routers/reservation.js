const { Router } = require("express");
const router = new Router();

const Bikes = require("../models").bike
const Reservations = require("../models").reservation
const User = require("../models").user
const authMiddleware = require("../auth/middleware")


//creates new reservation with startTime, userId and bikeId
router.post("/:id", authMiddleware, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    console.log(user);
  
    if (user === null) {
      return res.status(404).send({ message: " not found!" });
    }
  
    if (!user.userId === req.user.id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this page!" });
    }
  
    const bike = await Bikes.findByPk(req.params.id);
    console.log(bike);
  
    if (bike === null) {
      return res.status(404).send({ message: "bike is not found!" });
    }
  
    if (!bike.userId === req.user.id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this page!" });
    }
  
    const { userId, bikeId } = req.body
  
    const reservation = await Reservations.create({
      userId: user.id,
      bikeId: bike.id
    })
  
    res.status(200).send({ reservation })
  });
 

  //updates endTime and cost
  router.patch("/:id", authMiddleware, async (req, res) => {
    const { endTime, cost } = req.body;
    const reservation = await Reservations.findByPk(req.params.id);
  
    await reservation.update({ endTime, cost });
  
    return res.status(200).send({ reservation });
  });

module.exports = router;
