import swal from "sweetalert";
// eslint-disable-next-line
import axios, * as others from "axios";

export const process = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/generate/xray-process", formData)
      .then((res) => {
        if (res.data.error === undefined) {
          resolve({ status: true, data: res.data });
        } else {
          resolve({ status: false, error: res.data.error });
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          swal({
            text: err.response.data.error.toUpperCase(),
            icon: "error",
            dangerMode: true,
            title: "Oops, try again!",
          });
        } else {
          reject(err);
        }
      });
  });
};
