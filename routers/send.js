const { Router } = require("express");
const router = new Router();
const authMiddleware = require("../auth/middleware");
const nodemailer = require('nodemailer');

router.post('/', authMiddleware, async (req, res, next) => {
    try{
        const { name } = req.body
        const user = req.user;
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'waylon.yost@ethereal.email',
                pass: 'eU6F6GhwSZ83mTx1Sx'
            }
        });
        const mailOptions = {
            from: `${req.body.email}`,
            to: user.email,
            subject: `Reservation Made - Quick Bike`,
            text: `Good Day, ${user.name}! Your reservation was made! Pick up ${name} at the location you selected`,
            replyTo: `waylon.yost@ethereal.email`
          }
          transporter.sendMail(mailOptions, function(err, res) {
            if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('here is the res: ', res)
            }
        })
        return res.status(200).send({ message: "confirmation email sent!" });
    } catch (e) { 
        next(e);
      }
    });

    router.post('/end', authMiddleware, async (req, res, next) => {
      try{
          const user = req.user;
          const transporter = nodemailer.createTransport({
              host: 'smtp.ethereal.email',
              port: 587,
              auth: {
                  user: 'waylon.yost@ethereal.email',
                  pass: 'eU6F6GhwSZ83mTx1Sx'
              }
          });
          const mailOptions = {
              from: `${req.body.email}`,
              to: user.email,
              subject: `Reservation Ended - Quick Bike`,
              text: `Hey there, ${user.name}! Your reservation has ended. Thank you for using Quick Bike!`,
              replyTo: `waylon.yost@ethereal.email`
            }
            transporter.sendMail(mailOptions, function(err, res) {
              if (err) {
                console.error('there was an error: ', err);
              } else {
                console.log('here is the res: ', res)
              }
          })
          return res.status(200).send({ message: "confirmation email sent!" });
      } catch (e) { 
          next(e);
        }
      });

module.exports = router;
