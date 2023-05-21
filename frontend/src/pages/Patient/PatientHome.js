import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { getLoggedPatient } from "../../services/patient";
import { getAllPatientReports } from "../../services/patient";
const { faker } = require("@faker-js/faker");

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const PatientHome = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const [negativeValue, setNegativeValue] = useState(0);
  const [positiveValue, setPositiveValue] = useState(0);

  useEffect(() => {
    getPatientFunc();
    getReports();
  }, []);

  const data = {
    datasets: [
      {
        label: "Negative Reports",
        data: Array.from({ length: 50 }, () => ({
          x: faker.datatype.number({ min: -negativeValue, max: negativeValue }),
          y: faker.datatype.number({ min: -negativeValue, max: negativeValue }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Positive Reports",
        data: Array.from({ length: 50 }, () => ({
          x: faker.datatype.number({ min: -positiveValue, max: positiveValue }),
          y: faker.datatype.number({ min: -positiveValue, max: positiveValue }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const getPatientFunc = async () => {
    const data = await getLoggedPatient();
    setPatient(data);
  };

  const getReports = async () => {
    const data = await getAllPatientReports();
    var positiveArray = data.filter(function (el) {
      return el.status === "1";
    });
    var negativeArray = data.filter(function (el) {
      return el.status === "2";
    });
    setPositiveValue(positiveArray.length);
    setNegativeValue(negativeArray.length);
  };

  return (
    <section className="text-gray-600 body-font bg-gray-50 h-screen flex justify-center items-center">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-4xl py-10 opacity-40 font-bold">
          Patient Portal Of Healthcare Network
        </h1>

        <div class="grid grid-cols-2 gap-2 cursor-pointer">
          <div>
            <div
              className="flex flex-wrap -m-4 text-center"
              onClick={() => {
                navigate("/patient-treatments");
              }}
            >
              <div className="p-4 lg:w-2/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                  <div>
                    <h2 className="text-gray-900 text-3xl font-bold">
                      Patient Treatments
                    </h2>
                  </div>
                  <div className="bg-gradient-to-tr from-yellow-500 to-yellow-400 w-32 h-32  rounded-full shadow-2xl shadow-yellow-400 border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-5xl">TR</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-wrap -m-4 text-center cursor-pointer"
              onClick={() => {
                navigate("/patient-tests");
              }}
            >
              <div className="p-4 lg:w-2/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                  <div>
                    <h2 className="text-gray-900 text-3xl font-bold">
                      Patient Tests
                    </h2>
                  </div>
                  <div className="bg-gradient-to-tr from-blue-500 to-blue-400 w-32 h-32  rounded-full shadow-2xl shadow-blue-400 border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-5xl">TE</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-wrap -m-4 text-center cursor-pointer"
              onClick={() => {
                navigate("/patient-drugs");
              }}
            >
              <div className="p-4  lg:w-2/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                  <div>
                    <h2 className="text-gray-900 text-3xl font-bold">
                      Patient Drugs
                    </h2>
                  </div>
                  <div className="bg-gradient-to-tr from-red-500 to-red-400 w-32 h-32  rounded-full shadow-2xl shadow-red-400 border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-5xl">DR</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-wrap -m-4 text-center cursor-pointer"
              onClick={() => {
                navigate("/patient-reports");
              }}
            >
              <div className="p-4  lg:w-2/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                  <div>
                    <h2 className="text-gray-900 text-3xl font-bold">
                      Patient Reports
                    </h2>
                  </div>
                  <div className="bg-gradient-to-tr from-blue-500 to-blue-400 w-32 h-32  rounded-full shadow-2xl shadow-blue-400 border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-5xl">RE</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-10">
              <div className="mb-10">
                <div>
                  <span className="text-lg font-bold">Name : </span>
                  <span className="text-xl">
                    {patient.patient__fname} {patient.patient__lname}
                  </span>
                </div>
                <div>
                  <span className="text-lg font-bold">Age : </span>
                  <span className="text-xl">{patient.patient__dob}</span>
                </div>
                <div>
                  <span className="text-lg font-bold">Blood Type : </span>
                  <span className="text-xl">{patient.patient__bloodtype}</span>
                </div>
              </div>

              <div className="pt-1 pl-1 pr-1 pb-1">
                <h1 className="opacity-50 text-bold text-lg">
                  Patient Health Condition
                </h1>
                <Bubble options={options} data={data} />;
              </div>

              <div className="pt-10 pb-5 place-items-center place-content-center">
                <button
                  onClick={() => {
                    navigate("/virtuallab");
                  }}
                  className="group rounded-2xl h-12 w-48 bg-orange-600 font-bold text-sm text-white relative overflow-hidden"
                >
                  Virtual Lab
                  <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientHome;
