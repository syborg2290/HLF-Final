import React from "react";
import logo from "./logo.png";
import { logout } from "../services/user";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="text-gray-600 body-font bg-gray-50 h-screen flex justify-center items-center">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex items-center justify-center">
            <img src={logo} alt={"logo"} width={150} height={150} />
          </div>
          <h1 className="text-4xl py-10 opacity-40 font-bold">
            Patient Portal Of Healthcare Network
          </h1>
          <div className="flex items-center justify-center">
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-2xl font-bold">Patients</h2>

                  <button
                    onClick={() => {
                      navigate("/patient-home");
                    }}
                    className="text-sm mt-6 px-4 py-2 bg-red-400  text-white rounded-lg  tracking-wider hover:bg-red-500 outline-none"
                  >
                    Enter
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-red-500 to-red-400 w-32 h-32  rounded-full shadow-2xl shadow-red-400 border-white  border-dashed border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white text-2xl">Patient</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            class="mt-10 group rounded-2xl h-12 w-48 bg-red-500 font-bold text-sm text-white relative overflow-hidden"
            onClick={logout}
          >
            Logout
            <div class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
