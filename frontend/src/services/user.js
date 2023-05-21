import swal from "sweetalert";
// eslint-disable-next-line
import axios, * as others from "axios";

export const registerUser = (client) => {
  axios
    .post("http://localhost:4000/user/register", {
      client: client,
    })
    .then((res) => {
      //   localStorage.setItem("token", res.data.token);
      //   localStorage.setItem("user_id", res.data.id);
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        swal({
          text: err.response.data.message.toUpperCase(),
          icon: "error",
          type: "error",
          dangerMode: true,
          title: "Warning! Please contact your administrator!",
        });
      }
    });
};

export const authenticate = (clientId, privateKey) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/user/login", {
        id: clientId,
        privateKey: privateKey,
      })
      .then((res) => {
        if (res.data.id) {
          localStorage.setItem("health-user-id", res.data.id);
          localStorage.setItem("health-user-privatekey", privateKey);
          if (res.data.id === "admin") {
            localStorage.setItem("health-user-type", "admin");
            resolve("admin");
          } else {
            localStorage.setItem("health-user-type", "client");
            resolve("client");
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          swal({
            text: err.response.data.message.toUpperCase(),
            icon: "error",
            type: "error",
            dangerMode: true,
            title: "Warning! Please contact your administrator!",
          });
        }
      });
  });
};

export const logout = () => {
  localStorage.removeItem("health-user-id");
  localStorage.removeItem("health-user-privatekey");
  localStorage.removeItem("health-user-type");
  window.location.reload();
};
