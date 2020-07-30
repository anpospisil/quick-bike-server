const express = require("express");
const corsMiddleWare = require("cors");
const loggerMiddleWare = require("morgan");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const reservationRouter = require("./routers/reservation.js");
const bikeRouter = require("./routers/bike");
const sendRouter = require("./routers/send");
const authMiddleWare = require("./auth/middleware");

const app = express();

//MiddleWare
app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);
app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

// Routes

app.use("/", authRouter);
app.use("/reservation", reservationRouter);
app.use("/bike", bikeRouter);
app.use("/send", sendRouter)

// Listen for connections on specified port (default is port 4000)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
