import swal from "sweetalert";
// eslint-disable-next-line
import axios, * as others from "axios";

export const getAllLabsTransactionCount = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/pathlab/labs-count" +
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
          resolve(res.data * 3);
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

export const newLab = (name, email, licenseNo, phoneNumber, address) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/pathlab/lab",
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

export const getAllLab = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/pathlab/labs" +
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

export const getLab = (labId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/pathlab/lab" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),

        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
            labID: labId,
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
