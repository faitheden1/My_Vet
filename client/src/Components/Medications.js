import React from "react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import AddMeds from "./Modals/AddMeds";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { getPetData } from "./Helpers/PetFunctions";

const Medications = (props) => {
  const petId = props.petId;
  const [meds, setMeds] = useState(props.meds);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [existing, setExisting] = useState(false);

  const handleClose = () => {
    setShow(false);
    getPetData(petId).then((data) => setMeds(data.Medications));
  };
  const handleShow = () => setShow(true);

  useEffect(() => {}, [meds]);

  //sort descending so the newest one on the top
  meds.sort(function (a, b) {
    var nameA = a.DueDate,
      nameB = b.DueDate;
    if (nameA < nameB)
      //sort string ascending
      return 1;
    if (nameA > nameB) return -1;
    return 0; //default return value (no sorting)
  });

  const handleAddUpdateMed = async (e, form, cb) => {
    e.preventDefault();
    //do the calclations and add the medications
    let url;

    let medName = form.addMedForm.medication.value;
    let medDate = form.addMedForm.startDate.value;
    // these can be made available if we want the user to add medications that are needed for example monthly
    // let medFreq = form.addMedForm.frequency.value;
    // let medNmDoses = form.addMedForm.numDoses.value;
    let medDose = form.addMedForm.dose.value;

    const vals = {
      MedicationName: medName,
      DueDate: medDate,
      Dose: medDose,
    };

    if (existing) {
      url = `/api/updatePetMed/${petId}/${form.addMedForm.medId.value}`;
    } else {
      url = `/api/addpetmed/${petId}`;
    }

    return cb(url, vals);
  };

  const handleDelMed = async (e, form, cb) => {
    e.preventDefault();
    let vals = {};
    const medId = form.addMedForm.medId.value;
    const url = `/api/delPetMed/${petId}/${medId}`;
    console.log(url, vals, medId);

    return cb(url, vals);
  };

  const postMed = async (url, vals, petId) => {
    try {
      await axios.put(url, vals, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error({ message: err.message });
    }
  };

  const update = async (e, data) => {
    e.preventDefault();
    setModalData(data);
    setExisting(true);
    setShow(true);

    console.log("button to update med", data);
  };

  const add = (e, data) => {
    e.preventDefault();
    setModalData(data);
    setExisting(false);
    setShow(true);

    console.log("button to add med", data);
  };

  return (
    <div className="card m-2 shadow rounded">
      <div className="card-body text-center ">
        <h3 className="card-title">Medications</h3>
        <div className="pet-table">
          <ul>
            {meds.map((med) => (
              <li
                onClick={(e) => update(e, med)}
                key={med._id}
                className="pet-list btn w-75"
              >
                {med.MedicationName}
                Next Dose:{" "}
                <Moment utc format="MM/DD/YYYY">
                  {med.DueDate}
                </Moment>
                {med.Dose}
              </li>
            ))}
          </ul>
        </div>
        <button
          name="addMedBtn"
          onClick={(e) => add(e, "{_id: 0}")}
          className="edit-medications-btn btn btn-circle btn-xl"
        >
          +
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add / Edit Medication</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddMeds petId={petId} data={modalData} existing={false} />
          </Modal.Body>
          <Modal.Footer>
            {existing ? (
              <Button
                variant="primary"
                onClick={(e) => handleDelMed(e, document.forms, postMed)}
              >
                Delete
              </Button>
            ) : null}
            <Button
              variant="primary"
              onClick={(e) => handleAddUpdateMed(e, document.forms, postMed)}
            >
              Submit Form
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Medications;
