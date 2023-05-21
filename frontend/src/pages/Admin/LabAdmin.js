import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Table, Tag, Modal, Spin } from "antd";
import { getAllLab, newLab } from "../../services/lab";

const LabAdmin = () => {
  const [Labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [openLabModal, setOpenLabModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setTableIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    getAllLabsFunc();
    setTableIsLoading(false);
  }, []);

  const getAllLabsFunc = async () => {
    setTableIsLoading(true);
    const data = await getAllLab();
    setLabs(data);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "License No",
      dataIndex: "license_no",
      key: "license_no",
      render: (_, { license_no }) => (
        <Tag color="green" key={license_no}>
          {license_no}
        </Tag>
      ),
    },
    {
      title: "Contact No",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, { created_at }) => (
        <Tag
          color="yellow"
          className="text-sm font-bold text-black"
          key={created_at}
        >
          {new Date(created_at).toDateString()}
        </Tag>
      ),
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <div>Invite {record.name}</div>
    //       <div>Delete</div>
    //     </Space>
    //   ),
    // },
  ];

  const submitLab = async () => {
    if (
      name !== "" &&
      email !== "" &&
      licenseNo !== "" &&
      phoneNumber !== "" &&
      address !== ""
    ) {
      setIsLoading(true);
      const res = await newLab(name, email, licenseNo, phoneNumber, address);
      if (res) {
        setIsLoading(false);
        setName("");
        setEmail("");
        setLicenseNo("");
        setPhoneNumber("");
        setAddress("");
        setOpenLabModal(false);
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

  const searchLabs = (text) => {
    let newArray = Labs.filter((o) =>
      Object.keys(o).some((k) =>
        o[k].toString().toLowerCase().includes(text.toLowerCase())
      )
    );

    setFilteredLabs(newArray);
  };

  return (
    <>
      <Modal
        style={{
          top: 20,
        }}
        open={openLabModal}
        footer={null}
        closeIcon={<p></p>}
      >
        <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Add new Lab to the network
                </h1>
              </div>

              <div className="mt-15 mb-15">
                <form>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        for="name"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Enter name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          onChange={(e) => {
                            setName(e.target.value.trim());
                          }}
                          aria-describedby="name-error"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="email"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Enter email
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          onChange={(e) => {
                            setEmail(e.target.value.trim());
                          }}
                          aria-describedby="email-error"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        for="licenseNo"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Enter licenseNo
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="licenseNo"
                          name="licenseNo"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          onChange={(e) => {
                            setLicenseNo(e.target.value.trim());
                          }}
                          aria-describedby="licenseNo-error"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="phoneNumber"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Enter phoneNumber
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          onChange={(e) => {
                            setPhoneNumber(e.target.value.trim());
                          }}
                          aria-describedby="phoneNumber-error"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="address"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Enter address
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          required
                          onChange={(e) => {
                            setAddress(e.target.value.trim());
                          }}
                          aria-describedby="address-error"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={submitLab}
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
                      onClick={() => setOpenLabModal(false)}
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
        <div className="pt-20 pb-1 place-items-center place-content-center">
          <button
            onClick={() => {
              setOpenLabModal(true);
            }}
            className="group rounded-2xl h-12 w-48 bg-green-600 font-bold text-sm text-white relative overflow-hidden"
          >
            Add New Lab
            <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
          </button>
        </div>
        <div className="pt-2 relative mx-auto text-gray-600 mt-10">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => {
              if (e.target.value.trim() !== "") {
                searchLabs(e.target.value.trim());
              } else {
                setFilteredLabs([]);
              }
            }}
          />
        </div>
        <div className="pl-10 pr-10 pb-10 pt-5">
          <Table
            columns={columns}
            dataSource={filteredLabs.length > 0 ? filteredLabs : Labs}
            loading={isTableLoading}
          />
        </div>
      </div>
    </>
  );
};

export default LabAdmin;
