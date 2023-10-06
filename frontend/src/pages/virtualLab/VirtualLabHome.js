import React, { useState } from "react";
import logo from "../logo.png";
import { process } from "../../services/virtuallab";
import { Spin } from "antd";
import swal from "sweetalert";
import BarChart from "./charts/BarChart";

const VirtualLabHome = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (image) {
      setIsLoading(true);
      const data = await process(image);
      if (data.status) {
        setResult(data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        swal({
          text: data.error.toUpperCase(),
          icon: "error",
          dangerMode: true,
          title: "Oops, try again!",
        });
      }
    } else {
      swal({
        text: "Please provide an X-ray image",
        icon: "warning",
        type: "warning",
        dangerMode: false,
        title: "Oops, try again!",
      });
    }
  };

  return (
    <div className="overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 bg-gray-800">
      <div className="flex justify-center items-end text-center min-h-screen sm:block">
        <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          ​
        </span>

        {result ? (
          <div className="inline-block text-left bg-white rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle max-w-8xl w-full pl-40 pr-40">
            <div>
              <p className="mt-3 text-3xl font-semibold leading-none text-black tracking-tighter lg:text-2xl flex justify-center underline">
                Virtual Laboratory Result
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1 justify-center">
                  <div>
                    {Object.entries(result).map(([key, value]) => (
                      <div key={key} className="ml-4 m-2">
                        <strong className="text-black font-bold text-lg">
                          {key}:
                        </strong>{" "}
                        <span className="text-black opacity-50 ml-3">
                          {value}{" "}
                          <span
                            className={
                              value >= 0.5
                                ? "text-red-600 font-semibold"
                                : value > 0.3
                                ? "text-yellow-600 font-semibold"
                                : "text-green-600 font-semibold"
                            }
                          >
                            ({((value / 100) * 100).toFixed(1)} %)
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-1">
                  <BarChart data={result} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
            <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
              <div className="grid grid-cols-1">
                <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                  <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                    <div className="flex items-center justify-center">
                      <img src={logo} alt="logo" width={150} height={150} />
                    </div>
                    <p className="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                      Virtual Laboratory
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                      Upload Your X-ray Image for Processing Unit
                    </p>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {image === null ? (
                            <>
                              <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-400 animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Upload Here
                                </span>{" "}
                              </p>
                            </>
                          ) : (
                            <img
                              alt=""
                              className="p-5 w-fit h-fit"
                              src={URL.createObjectURL(image)}
                              accept="image/*"
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
                    <div
                      className="w-full mt-6"
                      onClick={() => {
                        handleUpload();
                      }}
                    >
                      <span className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {isLoading ? <Spin size="large" /> : "Process"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualLabHome;
