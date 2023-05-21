import React, { useState } from "react";
import swal from "sweetalert";
import { Modal } from "antd";
// import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/user";

const InitialPage = () => {
  // const navigate = useNavigate();
  const [modalAuthOpen, setModalAuthOpen] = useState(false);
  const [clientId, setClientId] = useState("");
  const [privatekey, setPrivateKey] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (clientId !== "" && privatekey !== "") {
      const res = await authenticate(clientId, privatekey);
      window.location.reload();
      if (res === "admin") {
        // navigate("/admin", { replace: true, state: { name: "Fake Title" }})
        // navigate("/admin-home");
      } else {
        // navigate("/home");
      }
    } else {
      swal({
        text: "Please provide required data!",
        icon: "error",
        type: "error",
        dangerMode: true,
        title: "Try again with proper credentials",
      });
    }
  };

  return (
    <>
      <Modal
        style={{
          top: 20,
        }}
        open={modalAuthOpen}
        footer={null}
        closeIcon={<p></p>}
      >
        <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Prove you are authorize to enter to the network
                </h1>
              </div>

              <div className="mt-15 mb-15">
                <form>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        for="clientId"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Enter your Client Id
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="clientId"
                          name="clientId"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          onChange={(e) => {
                            setClientId(e.target.value.trim());
                          }}
                          aria-describedby="clientId-error"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="privatekey"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Enter your Private key
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="privatekey"
                          name="privatekey"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          onChange={(e) => {
                            setPrivateKey(e.target.value.trim());
                          }}
                          aria-describedby="privatekey-error"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={loginSubmit}
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Authenticate
                    </button>

                    <button
                      type="button"
                      onClick={() => setModalAuthOpen(false)}
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

      <div>
        <div className="flex items-center justify-center min-h-screen from-white via-blue-600 to-blue-500 bg-gradient-to-br">
          <div className="w-full max-w-lg px-15 py-20 mx-auto bg-white rounded-lg shadow-xl">
            <h3 className="font-bold text-2xl mb-10">
              Healthcare-Chain: Blockchain-Enabled Decentralized Trustworthy
              Network
            </h3>
            <h1 className="text-lg opacity-50">
              Please Enter To The Healthcare Network
            </h1>
            <div className="max-w-md mx-auto space-y-6 flex justify-center">
              <div
                onClick={() => setModalAuthOpen(true)}
                className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500"
              >
                <strong className="font-medium">Enter</strong>
                <svg
                  className="ml-1 rotate-180 fill-white group-hover:fill-blue-500"
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M17.6954 12.4962L21.6468 12.1467C22.5335 12.1467 23.2525 12.8727 23.2525 13.7681C23.2525 14.6635 22.5335 15.3895 21.6468 15.3895L17.6954 15.04C16.9997 15.04 16.4357 14.4705 16.4357 13.7681C16.4357 13.0645 16.9997 12.4962 17.6954 12.4962"
                  ></path>
                  <path d="M4.42637 12.5604C4.48813 12.4981 4.71885 12.2345 4.93559 12.0157C6.19989 10.6449 9.50107 8.40347 11.228 7.71751C11.4902 7.60808 12.1532 7.37512 12.5086 7.35864C12.8477 7.35864 13.1716 7.43748 13.4804 7.59279C13.8661 7.81046 14.1738 8.15403 14.3439 8.55878C14.4522 8.83882 14.6224 9.68009 14.6224 9.69539C14.7913 10.6143 14.8834 12.1086 14.8834 13.7606C14.8834 15.3325 14.7913 16.7656 14.6527 17.6999C14.6375 17.7163 14.4674 18.76 14.2821 19.1177C13.943 19.7719 13.28 20.1766 12.5704 20.1766H12.5086C12.046 20.1613 11.0742 19.7554 11.0742 19.7413C9.43931 19.0553 6.21621 16.9221 4.92044 15.5043C4.92044 15.5043 4.55455 15.1396 4.39608 14.9125C4.14904 14.5854 4.02552 14.1806 4.02552 13.7759C4.02552 13.3241 4.16419 12.904 4.42637 12.5604"></path>
                </svg>
                <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InitialPage;
