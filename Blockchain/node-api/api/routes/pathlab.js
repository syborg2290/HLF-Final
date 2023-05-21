const express = require("express");
const { v4: uuidv4 } = require("uuid");
const isAuthorize = require("../util/isAuthorizedAdmin");
const { contract } = require("../contract");

routes = express.Router();

routes.put("/dotest", (req, res) => {
  contract(
    req.body.clientId,
    "INVOKE",
    [
      "DoTest",
      req.body.test_id,
      req.body.test_result,
      req.body.supervisor,
      req.body.no_of_mediafile,
    ],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(JSON.parse(payload));
      }
    }
  );
});

// createLab route
routes.post("/lab", async (req, res) => {
  const isAuthorizedToAccess = await isAuthorize(req.headers.authorization);
  if (isAuthorizedToAccess) {
    contract(
      req.body.clientId,
      "INVOKE",
      [
        "CreateLab",
        uuidv4(),
        req.body.name,
        req.body.email,
        req.body.licenseNo,
        req.body.phoneNumber,
        req.body.address,
      ],
      (err, payload) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({
            message: `Successfully created lab ${req.body.name}`,
            data: payload,
          });
        }
      }
    );
  } else {
    res.status(500).json({ message: "unauthorized!" });
  }
});

// getAllHospitals route
routes.get("/labs", (req, res) => {
  contract(req.query.clientId, "QUERY", ["GetAllLabs"], (err, payload) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const doctors = JSON.parse(payload);
      res.status(200).json(doctors);
    }
  });
});

routes.get("/labs-count", (req, res) => {
  contract(req.query.clientId, "QUERY", ["GetAllLabs"], (err, payload) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      if (payload) {
        const hospitals = JSON.parse(payload);
        res.status(200).json(hospitals.length);
      }
    }
  });
});

routes.get("/lab", (req, res) => {
  const labID = req.headers.labid;
  contract(
    req.query.clientId,
    "QUERY",
    ["GetLabByID", labID],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const lab = JSON.parse(payload);
        res.status(200).json(lab);
      }
    }
  );
});

module.exports = routes;
