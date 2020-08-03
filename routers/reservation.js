const { Router } = require("express");
const router = new Router();

const Bikes = require("../models").bike;
const Reservations = require("../models").reservation;
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");
const nodemailer = require('nodemailer');

//creates new reservation with startTime, userId and bikeId & updates bike to reserved
router.post("/", authMiddleware, async (req, res, next) => {
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
    const { bikeId, startTime, reserved, name } = req.body;

    const reservation = await Reservations.create({
      bikeId: bikeId,
      userId: user.id,
      startTime: startTime,
    });

    const lockCode = Math.floor(100000 + Math.random() * 900000);

    await bike.update({
      reserved: reserved,
      lockCode: lockCode,
    });

    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      // host: 'smtp.ethereal.email',
      // port: 587,
      auth: {
          user: 'quickbike2020@outlook.com',
          pass: 'quickbike123'
      }
  });
  const mailOptions = {
      from: `quickbike2020@outlook.com`,
      to: user.email,
      subject: `Reservation Made - Quick Bike`,
      text: `Good Day, ${user.name}! Your reservation was made! Pick up ${name} at the location you selected.
      Here is your lockcode: ${lockCode}`,
      replyTo: `quickbike2020@outlook.com`
    }
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', res)
      }
  })

    // delete bike.dataValues["lockCode"];
    return res
      .status(200)
      .send({ message: "Reservation created", reservation, bike });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// //updates bike, sets reserved to true and generates lockCode
// router.patch("/", authMiddleware, async (req, res, next) => {
//   try{
//   const { reserved } = req.body;
//   const lockCode = Math.floor(100000 + Math.random() * 900000)
//   const bike = await Bikes.findByPk(req.body.id);

//   console.log(lockCode)
//   await bike.update({
//     reserved: reserved,
//     lockCode: lockCode,
//   });
//   return res.status(200).send({ bike });
//   } catch (e) {
//     next(e)
//   }
// });

//updates endTime and cost & updates bike to not reserved
router.patch("/end", authMiddleware, async (req, res, next) => {
  try {
    const { reserved } = req.body;
    const user = req.user;
    const endTime = new Date()
    let reservation = await Reservations.findOne({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });

    //defines cost depedant on start/end time
    const startTimestamp = reservation.startTime.getTime()
    console.log("endtime", endTime.getTime())
    const endTimestamp = endTime.getTime()

    function timeDiff(startTime, endTime ){
      let diffInMilliSeconds = Math.abs(startTime - endTime) / 1000;
      const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
      diffInMilliSeconds -= hours * 3600;
      console.log(hours)
      return hours
    }

    const totalHours = timeDiff(startTimestamp, endTimestamp)

    const cost = totalHours <= 12 ? 2 : 3;

    reservation = await reservation.update({ endTime, cost });

    //sends end reservation email
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      // host: 'smtp.ethereal.email',
      // port: 587,
      auth: {
          user: 'quickbike2020@outlook.com',
          pass: 'quickbike123'
      }
  });
  const mailOptions = {
      from: `quickbike2020@outlook.com`,
      to: user.email,
      subject: `Reservation Ended - Quick Bike`,
      text: `Hey there, ${user.name}! Your reservation has ended. Thank you for using Quick Bike!`,
      replyTo: `quickbike2020@outlook.com`
    }
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', res)
      }
  })

    // update bike to reserved 
    const bike = await Bikes.findOne({
      where: { id: reservation.bikeId },
      order: [["createdAt", "DESC"]],
    });

    await bike.update({
      reserved: reserved,
    });
    return res.status(200).send({ reservation, bike });
  } catch (e) {
    next(e);
  }
});

//Get current reservation for user
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const user = req.user;
    const reservation = await Reservations.findOne({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).send({ reservation });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
