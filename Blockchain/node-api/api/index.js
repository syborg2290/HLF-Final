const express = require("express");
const cors = require("cors");

const patient = require("./routes/patient");
const hospital = require("./routes/hospital");
const doctor = require("./routes/doctor");
const pathlab = require("./routes/pathlab");
const pharmacies = require("./routes/pharmacies");
const general = require("./routes/general");
const user = require("./routes/user");

PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/patient", patient);
app.use("/hospital", hospital);
app.use("/doctor", doctor);
app.use("/pathlab", pathlab);
app.use("/pharmacy", pharmacies);
app.use("/user", user);
app.use("/", general);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
