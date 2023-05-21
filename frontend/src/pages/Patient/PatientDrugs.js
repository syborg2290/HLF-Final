import React, { useEffect, useState } from "react";
import { Table, Tag, Modal } from "antd";
import { getAllPatientDrugs } from "../../services/patient";
import { getDoctor } from "../../services/doctor";
import { getPharmacy } from "../../services/pharmacy";

const PatientDrugs = () => {
  const [Drugs, setDrugs] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [isTableLoading, setTableIsLoading] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [noteUrl, setNoteUrl] = useState("");

  useEffect(() => {
    getAllDrugsFunc();
    setTableIsLoading(false);
  }, []);

  const getAllDrugsFunc = async () => {
    setTableIsLoading(true);
    const data = await getAllPatientDrugs();
    for (var i = 0; i < data.length; i++) {
      const doctorName = (await getDoctor(data[i].ref_doctor)).name;
      const pharmacyName = (await getPharmacy(data[i].pharmacy_id)).name;

      data[i].doctor_name = doctorName;
      data[i].pharmacy_name = pharmacyName;
    }

    setDrugs(data);
  };

  const columns = [
    {
      title: "Report",
      dataIndex: "report_id",
      key: "report_id",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Pharmacy",
      dataIndex: "pharmacy_name",
      key: "pharmacy_name",
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
      title: "Drug Note",
      dataIndex: "drugs_id",
      key: "drugs_id",
      render: (drugs_id, record) => (
        <Tag
          color="green"
          key={record.drugs_id}
          className="cursor-pointer hover:animate-pulse p-1"
          onClick={() => {
            setNoteUrl(record.Drugs_note_media);
            setOpenNoteModal(true);
          }}
        >
          View Note
        </Tag>
      ),
    },
  ];

  const searchDrugs = (text) => {
    let newArray = Drugs.filter((o) =>
      Object.keys(o).some((k) =>
        o[k].toString().toLowerCase().includes(text.toLowerCase())
      )
    );

    setFilteredDrugs(newArray);
  };

  return (
    <>
      <Modal
        style={{
          top: 20,
        }}
        open={openNoteModal}
        footer={null}
        closeIcon={<p></p>}
      >
        <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Prescription Note
                </h1>
              </div>

              <div className="mt-15 mb-15">
                <img src={noteUrl} alt="note" className="m-1" />

                <button
                  type="button"
                  onClick={() => setOpenNoteModal(false)}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Close
                </button>
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
                searchDrugs(e.target.value.trim());
              } else {
                setFilteredDrugs([]);
              }
            }}
          />
        </div>
        <div className="pl-10 pr-10 pb-10 pt-5">
          <Table
            columns={columns}
            dataSource={filteredDrugs.length > 0 ? filteredDrugs : Drugs}
            loading={isTableLoading}
          />
        </div>
      </div>
    </>
  );
};

export default PatientDrugs;
