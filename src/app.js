const express = require("express");
const app = express(); // app acts like a middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");

const notificationRoutes = require("./api/routes/notification");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); // post bodyparser middleWare
app.use(bodyParser.json());

app.use("/send-notification", notificationRoutes);

app.use((req, res, next) => {
  res.status(200);
  res.json({
    message: "server is live"
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    status: error.status || 500
  });
});
module.exports = app;
