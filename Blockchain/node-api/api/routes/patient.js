const express = require("express");
const { contract } = require("../contract");

const { v4: uuidv4 } = require("uuid");
const registerUser = require("../../test-client/registerUser");
const routes = express.Router();

routes.post("/register", (req, res) => {
  const patientId = uuidv4();
  contract(
    req.body.clientId,
    "INVOKE",
    [
      "RegisterPatient",
      patientId,
      req.body.fname,
      req.body.lname,
      req.body.boodType,
      req.body.age,
      req.body.consenter,
    ],
    async (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const response = await registerUser("patient", patientId);
        if (!response) {
          res.status(500).json({ message: "Something went wrong!" });
        } else {
          const privateKey = response.credentials.privateKey;
          const privateKeyRegex =
            /-----BEGIN PRIVATE KEY-----(.*)-----END PRIVATE KEY-----/s;
          const extractedPrivateKey = privateKey
            .match(privateKeyRegex)[1]
            .trim();
          res.status(200).json({
            message: "successfully registered",
            credentials: {
              patientID: "patient-" + patientId,
              privatekey: extractedPrivateKey.replace(/[\r\n]/gm, ""),
            },
          });
        }
      }
    }
  );
});

routes.get("/all", (req, res) => {
  contract(req.query.clientId, "QUERY", ["GetAllConsents"], (err, payload) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const patients = JSON.parse(payload);
      res.status(200).json(patients);
    }
  });
});

routes.get("/patient", (req, res) => {
  contract(req.query.clientId, "QUERY", ["GetAllConsents"], (err, payload) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const patientId = req.query.clientId.split("patient-");

      const patients = JSON.parse(payload);

      var patientsArray = patients.filter(function (el) {
        return el.patient__id === patientId[1];
      });

      res.status(200).json({ data: patientsArray[0] });
    }
  });
});

routes.get("/patients-count", (req, res) => {
  contract(req.query.clientId, "QUERY", ["GetAllConsents"], (err, payload) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      const hospitals = JSON.parse(payload);
      res.status(200).json(hospitals.length);
    }
  });
});

routes.put("/giveconsent", (req, res) => {
  contract(
    req.body.clientId,
    "INVOKE",
    [
      "UpdateTempConsent",
      req.body.aadhaar,
      req.body.type,
      req.body.to,
      req.body.till,
    ],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({
          message: `successfully given consent to ${req.body.to} till ${req.body.till}`,
        });
      }
    }
  );
});

routes.put("/permconsent", (req, res) => {
  contract(
    req.body.clientId,
    "INVOKE",
    ["UpdatePermConsent", req.body.aadhaar, req.body.type, req.body.to],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({
          message: `successfully given consent to ${req.body.to} till ${req.body.till}`,
        });
      }
    }
  );
});

routes.put("/giveconsent", (req, res) => {
  contract(
    req.body.clientId,
    "INVOKE",
    [
      "UpdateTempConsent",
      req.body.aadhaar,
      req.body.type,
      req.body.to,
      req.body.till,
    ],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({
          message: `successfully given consent to ${req.body.to} till ${req.body.till}`,
        });
      }
    }
  );
});

routes.get("/tests", (req, res) => {
  const patientId = req.headers.patientid;
  contract(
    req.query.clientId,
    "QUERY",
    ["GetTestsByPatientID", patientId],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const tests = JSON.parse(payload);
        res.status(200).json(tests);
      }
    }
  );
});

routes.get("/test", (req, res) => {
  const testID = req.headers.testID;
  contract(
    req.query.clientId,
    "QUERY",
    ["GetTestByID", testID],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const test = JSON.parse(payload);
        res.status(200).json(test);
      }
    }
  );
});

routes.get("/reports", (req, res) => {
  const patientId = req.headers.patientid;
  contract(
    req.query.clientId,
    "QUERY",
    ["GetReportsByPatientID", patientId],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const reports = JSON.parse(payload);
        res.status(200).json(reports);
      }
    }
  );
});

routes.get("/report", (req, res) => {
  const reportID = req.headers.reportID;
  contract(
    req.query.clientId,
    "QUERY",
    ["GetReportByID", reportID],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const report = JSON.parse(payload);
        res.status(200).json(report);
      }
    }
  );
});

routes.get("/treatments", (req, res) => {
  const patientId = req.headers.patientid;
  contract(
    req.query.clientId,
    "QUERY",
    ["GetTreatmentsByPatientID", patientId],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const treatments = JSON.parse(payload);
        res.status(200).json(treatments);
      }
    }
  );
});

routes.get("/treatment", (req, res) => {
  const treatmentID = req.headers.treatmentID;
  contract(
    req.query.clientId,
    "QUERY",
    ["GetTreatmentByID", treatmentID],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const treatment = JSON.parse(payload);
        res.status(200).json(treatment);
      }
    }
  );
});

routes.get("/drugs", (req, res) => {
  const patientId = req.headers.patientid;
  contract(
    req.query.clientId,
    "QUERY",
    ["GetDrugsByPatientID", patientId],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const drugs = JSON.parse(payload);
        res.status(200).json(drugs);
      }
    }
  );
});

routes.get("/drug", (req, res) => {
  const drugID = req.headers.drugID;
  contract(
    req.query.clientId,
    "QUERY",
    ["GetDrugByID", drugID],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const drug = JSON.parse(payload);
        res.status(200).json(drug);
      }
    }
  );
});

module.exports = routes;
