const express = require("express");
const { contract } = require("../contract");
routes = express.Router();

routes.get("/test", (req, res) => {
  contract(
    req.query.clientId,
    "QUERY",
    ["GetTest", req.headers.test_id, req.headers.requester],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(JSON.parse(payload));
      }
    }
  );
});
routes.get("/report", (req, res) => {
  contract(
    req.query.clientId,
    "QUERY",
    ["GetReport", req.headers.report_id, req.headers.requester],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(JSON.parse(payload));
      }
    }
  );
});

routes.get("/treatment", (req, res) => {
  contract(
    req.query.clientId,
    "QUERY",
    ["GetTreatment", req.headers.treatment_id, req.headers.requester],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(JSON.parse(payload));
      }
    }
  );
});

routes.get("/drug", (req, res) => {
  contract(
    req.query.clientId,
    "QUERY",
    ["GetDrugs", req.headers.drug_id, req.headers.requester],
    (err, payload) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(JSON.parse(payload));
      }
    }
  );
});

routes.post("/admin-login", async (req, res) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "../../wallet") + `/admin.id`,
      "utf-8"
    );

    const privateKey = JSON.parse(data)["credentials"]["privateKey"];

    const privateKeyRegex =
      /-----BEGIN PRIVATE KEY-----(.*)-----END PRIVATE KEY-----/s;
    const extractedPrivateKey = privateKey.match(privateKeyRegex)[1].trim();
    if (extractedPrivateKey === req.body.privateKey) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(500).json("Unauthorize!");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = routes;
