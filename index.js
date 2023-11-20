require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.SERVER_PORT || 5050;

app.use(cors());
app.use(express.json());

const pocketsRoutes = require("./routes/pockets-routes");

app.use((_req, _res, next) => {
  console.log("Logging a request from middleware");
  next();
});

app.use("/pockets", pocketsRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
