import swal from "sweetalert";
// eslint-disable-next-line
import axios, * as others from "axios";

export const newPatient = (fname, lname, boodType, age, consenter) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/patient/register",
        {
          clientId: localStorage.getItem("health-user-id"),
          fname: fname,
          lname: lname,
          boodType: boodType,
          age: age,
          consenter: consenter,
        },
        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          swal({
            text: res.data.message.toUpperCase(),
            title: "Successfully done!",
            tesxt: `Patient ID : ${res.data.credentials.patientID} \n Private Key : ${res.data.credentials.privatekey}`,
            position: "center",
            icon: "success",
            showConfirmButton: false,
            timer: 10000,
          });
          resolve(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          swal({
            text: err.response.data.message.toUpperCase(),
            icon: "error",
            type: "error",
            dangerMode: true,
            title: "Oops, try again!",
          });
        }
      });
  });
};

export const getAllPatients = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/patient/all" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),

        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          console.log(res.data);
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          swal({
            text: err.response.data.message.toUpperCase(),
            icon: "error",
            type: "error",
            dangerMode: true,
            title: "Oops, try again!",
          });
        }
      });
  });
};

export const getLoggedPatient = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/patient/patient" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),

        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
          },
        }
      )
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          swal({
            text: err.response.data.message.toUpperCase(),
            icon: "error",
            type: "error",
            dangerMode: true,
            title: "Oops, try again!",
          });
        }
      });
  });
};

export const getAllPatientsTransactionsCount = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/doctor/doctors-count" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),

        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
          },
        }
      )
      .then((res) => {
        if (res.data) {
          resolve(res.data * 6);
        } else {
          resolve(0);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          swal({
            text: err.response.data.message.toUpperCase(),
            icon: "error",
            type: "error",
            dangerMode: true,
            title: "Oops, try again!",
          });
        }
      });
  });
};

export const getAllPatientReports = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/patient/reports" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),
        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
            patientId: localStorage
              .getItem("health-user-id")
              .split("patient-")[1],
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          swal({
            text: err.response.data.message.toUpperCase(),
            icon: "error",
            type: "error",
            dangerMode: true,
            title: "Oops, try again!",
          });
        }
      });
  });
};

export const getAllPatientTests = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/patient/tests" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),
        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
            patientId: localStorage
              .getItem("health-user-id")
              .split("patient-")[1],
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          swal({
            text: err.response.data.message.toUpperCase(),
            icon: "error",
            type: "error",
            dangerMode: true,
            title: "Oops, try again!",
          });
        }
      });
  });
};

export const getAllPatientTreatments = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/patient/treatments" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),
        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
            patientId: localStorage
              .getItem("health-user-id")
              .split("patient-")[1],
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          swal({
            text: err.response.data.message.toUpperCase(),
            icon: "error",
            type: "error",
            dangerMode: true,
            title: "Oops, try again!",
          });
        }
      });
  });
};

export const getAllPatientDrugs = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/patient/drugs" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),
        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
            patientId: localStorage
              .getItem("health-user-id")
              .split("patient-")[1],
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          resolve(res.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          swal({
            text: err.response.data.message.toUpperCase(),
            icon: "error",
            type: "error",
            dangerMode: true,
            title: "Oops, try again!",
          });
        }
      });
  });
};
