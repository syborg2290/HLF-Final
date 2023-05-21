import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Table, Tag, Modal, Spin, Select } from "antd";
import { getAllPatientTreatments } from "../../services/patient";
import {
  getDoctor,
  updateMediaOfTreatment,
  updateStatusOfTreatment,
} from "../../services/doctor";
import Moralis from "moralis";

const PatientTreatments = () => {
  const [Treatments, setTreatments] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setTableIsLoading] = useState(false);
  const [openNewCommentModal, setNewCommentModal] = useState(false);
  const [openNewMediaModal, setNewMediaModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [treatmentId, setTreatmentId] = useState("");
  const [status, setStatus] = useState(0);
  const [image, setImage] = useState(null);
  // const [medias, setMedias] = useState(null);

  const statusList = [
    {
      id: 0,
      name: "Not Done",
    },
    {
      id: 1,
      name: "Started",
    },
    {
      id: 2,
      name: "Done",
    },
    {
      id: 3,
      name: "Failed",
    },
  ];

  useEffect(() => {
    getAllTreatmentsFunc();
    setTableIsLoading(false);
  }, []);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      await Moralis.start({
        apiKey: process.env.REACT_APP_MORALIS_API_KEY,

        // ...and any other configuration
      });

      let promise = new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
          const base64String = reader.result.split(",")[1];
          const abi = [
            {
              path: treatmentId + image.name,
              content: base64String,
            },
          ];

          const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });

          resolve(response.toJSON()[0].path);
        };
      });

      return promise;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllTreatmentsFunc = async () => {
    setTableIsLoading(true);
    const data = await getAllPatientTreatments();

    for (var i = 0; i < data.length; i++) {
      const doctorName = (await getDoctor(data[i].ref_doctor)).name;

      data[i].doctor_name = doctorName;
    }

    setTreatments(data);
    setTableIsLoading(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "ReportID",
      dataIndex: "report_id",
      key: "ReportID",
      render: (text) => <div>{text}</div>,
    },
    // {
    //   title: "TreatmentID",
    //   dataIndex: "treatment_id",
    //   key: "TreatmentID",
    //   render: (text) => <div>{text}</div>,
    // },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      render: (comments) => {
        return Object.keys(comments).length === 0 ? (
          <div>No comments</div>
        ) : (
          <div>{comments["0"]}</div>
        );
      },
    },

    {
      title: "Ref Doctor",
      dataIndex: "doctor_name",
      key: "doctor_name",
      render: (_, { doctor_name }) => (
        <Tag color="orange" key={doctor_name}>
          {doctor_name}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      render: (_, { Status }) =>
        Status === 0 ? (
          <Tag color="orange-inverse" key={Status}>
            Not Done
          </Tag>
        ) : Status === 1 ? (
          <Tag color="blue-inverse" key={Status}>
            Started
          </Tag>
        ) : Status === 2 ? (
          <Tag color="green-inverse" key={Status}>
            Done
          </Tag>
        ) : (
          <Tag color="red-inverse" key={Status}>
            Failed
          </Tag>
        ),
    },

    {
      title: "Actions",
      dataIndex: "treatment_id",
      key: "actions",
      render: (treatment_id, record) => (
        <div>
          <Tag
            color="red"
            className="cursor-pointer"
            onClick={() => {
              setTreatmentId(record.treatment_id);
              setNewCommentModal(true);
            }}
          >
            Update the status
          </Tag>
          {/* <Tag
            color="blue"
            className="cursor-pointer"
            onClick={() => {
              setTreatmentId(record.treatment_id);
              setNewMediaModal(true);
            }}
          >
            Add Media file
          </Tag>
          <Tag
            color="magenta-inverse"
            className="cursor-pointer"
            onClick={() => {
              setTreatmentId(record.treatment_id);
              setMedias(record.medias);
              setNewMediaModal(true);
            }}
          >
            view media
          </Tag> */}
        </div>
      ),
    },
  ];

  const searchTreatments = (text) => {
    let newArray = Treatments.filter((o) =>
      Object.keys(o).some((k) =>
        o[k].toString().toLowerCase().includes(text.toLowerCase())
      )
    );

    setFilteredTreatments(newArray);
  };

  const submitStatus = async () => {
    if (newComment !== "" && status !== "") {
      setIsLoading(true);

      const res = await updateStatusOfTreatment(
        treatmentId,
        status,
        newComment
      );
      if (res) {
        setIsLoading(false);
        setTreatmentId("");
        setStatus(0);
        setNewCommentModal(false);
        window.location.reload();
      } else {
        setIsLoading(false);
      }
    } else {
      swal({
        text: "Please provide required data!",
        icon: "error",
        type: "error",
        dangerMode: true,
        title: "Validation Error",
      });
    }
  };

  const submitMedia = () => {
    if (image !== "") {
      setIsLoading(true);
      handleUpload().then(async (url) => {
        if (url) {
          const res = await updateMediaOfTreatment(treatmentId, url);
          if (res) {
            setIsLoading(false);
            setTreatmentId("");
            setImage(null);
            setNewMediaModal(false);
            window.location.reload();
          } else {
            setIsLoading(false);
          }
        }
      });
    } else {
      swal({
        text: "Please provide required data!",
        icon: "error",
        type: "error",
        dangerMode: true,
        title: "Validation Error",
      });
    }
  };

  return (
    <>
      <Modal
        style={{
          top: 20,
        }}
        open={openNewCommentModal}
        footer={null}
        closeIcon={<p></p>}
      >
        <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Update the status of the treatment
                </h1>
              </div>

              <div>
                <label
                  for="treatment"
                  className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >
                  Update the status
                </label>
                <div className="relative">
                  <Select
                    placeholder=""
                    value={status}
                    onChange={(value) => {
                      setStatus(value);
                    }}
                    style={{
                      width: "100%",
                    }}
                    options={statusList.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                </div>
              </div>

              <div className="mt-15 mb-15">
                <form>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        for="title"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Comment
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          onChange={(e) => {
                            setNewComment(e.target.value.trim());
                          }}
                          aria-describedby="title-error"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={submitStatus}
                      className={
                        !isLoading
                          ? "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                          : "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-white text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      }
                    >
                      {isLoading ? <Spin size="large" /> : "Submit"}
                      {/* submit */}
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewCommentModal(false)}
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Modal>

      <Modal
        style={{
          top: 20,
        }}
        open={openNewMediaModal}
        footer={null}
        closeIcon={<p></p>}
      >
        <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Add media file
                </h1>
              </div>

              <div className="mt-15 mb-15">
                <form>
                  <div className="grid gap-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {image === null ? (
                            <>
                              <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Upload media file
                                </span>{" "}
                              </p>
                            </>
                          ) : (
                            <img
                              alt=""
                              className="p-20"
                              src={URL.createObjectURL(image)}
                            />
                          )}
                        </div>

                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={submitMedia}
                      className={
                        !isLoading
                          ? "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                          : "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-white text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      }
                    >
                      {isLoading ? <Spin size="large" /> : "Submit"}
                      {/* submit */}
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewMediaModal(false)}
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Modal>

      {/*  */}
      <div>
        <div className="pt-2 relative mx-auto text-gray-600 mt-10">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => {
              if (e.target.value.trim() !== "") {
                searchTreatments(e.target.value.trim());
              } else {
                setFilteredTreatments([]);
              }
            }}
          />
        </div>
        <div className="pl-10 pr-10 pb-10 pt-5">
          <Table
            columns={columns}
            dataSource={
              filteredTreatments.length > 0 ? filteredTreatments : Treatments
            }
            loading={isTableLoading}
          />
        </div>
      </div>
    </>
  );
};

export default PatientTreatments;
