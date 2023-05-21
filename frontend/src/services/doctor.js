import swal from "sweetalert";
// eslint-disable-next-line
import axios, * as others from "axios";

export const newDoctor = (
  name,
  email,
  licenseNo,
  specialty,
  phoneNumber,
  address
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/doctor/doctor",
        {
          clientId: localStorage.getItem("health-user-id"),
          name: name,
          email: email,
          specialty: specialty,
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

export const updateTestResult = (test_id, result) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "http://localhost:4000/doctor/test/UpdateResultTest",
        {
          clientId: localStorage.getItem("health-user-id"),
          testID: test_id,
          result: result,
        },
        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          // swal({
          //   text: res.data.message.toUpperCase(),
          //   title: "Successfully done!",
          //   position: "center",
          //   icon: "success",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
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

export const updateTestStatus = (test_id, status) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "http://localhost:4000/doctor/test/UpdateStatusTest",
        {
          clientId: localStorage.getItem("health-user-id"),
          testID: test_id,
          status: status,
        },
        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          // swal({
          //   text: res.data.message.toUpperCase(),
          //   title: "Successfully done!",
          //   position: "center",
          //   icon: "success",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
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

export const updateReportStatus = (report_id, status) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "http://localhost:4000/doctor/report/updateStatus",
        {
          clientId: localStorage.getItem("health-user-id"),
          report_id: report_id,
          status: status,
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

export const newCommentToReport = (report_id, comment) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "http://localhost:4000/doctor/report/addcomment",
        {
          clientId: localStorage.getItem("health-user-id"),
          report_id: report_id,
          comment: comment,
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

export const updateStatusOfTreatment = (treatment_id, status, comment) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "http://localhost:4000/doctor/treatment/updateStatus",
        {
          clientId: localStorage.getItem("health-user-id"),
          treatment_id: treatment_id,
          comment: comment,
          status: status,
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

export const updateMediaOfTreatment = (treatment_id, media_no, media) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "http://localhost:4000/doctor/treatment/updateMediaFile",
        {
          clientId: localStorage.getItem("health-user-id"),
          treatment_id: treatment_id,
          media_no: media_no,
          mediaFileLocation: media,
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

export const newTreatmentToReport = (report_id, ref_doctor, name) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/doctor/report/reftreatment",
        {
          clientId: localStorage.getItem("health-user-id"),
          patient_id: localStorage
            .getItem("health-user-id")
            .split("patient-")[1],
          report_id: report_id,
          ref_doctor: ref_doctor,
          name: name,
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

export const newTestToReport = (report_id, ref_doctor, name, labID) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/doctor/report/reftest",
        {
          clientId: localStorage.getItem("health-user-id"),
          patient_id: localStorage
            .getItem("health-user-id")
            .split("patient-")[1],
          report_id: report_id,
          ref_doctor: ref_doctor,
          name: name,
          labID: labID,
          type_of_test: 1,
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

export const newDrugToReport = (report_id, ref_doctor, pharamacyID, url) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:4000/doctor/report/presdrugs",
        {
          clientId: localStorage.getItem("health-user-id"),
          patient_id: localStorage
            .getItem("health-user-id")
            .split("patient-")[1],
          reportID: report_id,
          refDoctor: ref_doctor,
          pharamacyID: pharamacyID,
          drugs_note_media: url,
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

export const getAllDoctors = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/doctor/doctors" +
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

export const getAllDoctorsTransactionsCount = () => {
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

export const getDoctor = (doctorId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:4000/doctor/doctor" +
          "?clientId=" +
          localStorage.getItem("health-user-id"),

        {
          headers: {
            Authorization: localStorage.getItem("health-user-privatekey"),
            doctorID: doctorId,
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
