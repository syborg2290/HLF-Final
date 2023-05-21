import swal from "sweetalert";
// eslint-disable-next-line
import axios, * as others from "axios";

export const newHospital = (name, email, licenseNo, phoneNumber, address) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/hospital/create-hospital",
        {
          clientId: localStorage.getItem("health-user-id"),
          name: name,
          email: email,
          licenseNo: licenseNo,
          phoneNumber: phoneNumber,
          address: address,
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
            position: "center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
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

export const newReport = (hospital_id, doctor_id, title) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/hospital/createreport",
        {
          clientId: localStorage.getItem("health-user-id"),
          patient_id: localStorage
            .getItem("health-user-id")
            .split("patient-")[1],
          hospitalID: hospital_id,
          ref_doctor: doctor_id,
          title: title,
        },
        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          swal({
            text: res.data.message.toUpperCase(),
            title: "Successfully done!",
            position: "center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
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

export const getAllHospital = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/hospital/hospitals" +
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

export const getAllHospitalsCount = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/hospital/hospitals-count" +
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
          resolve(res.data * 4);
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

export const getHospital = (hospitalId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/hospital/hospital" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),

        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
            "hospitalID": hospitalId,
          },
        }
      )
      .then((res) => {
        resolve(res.data);
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
