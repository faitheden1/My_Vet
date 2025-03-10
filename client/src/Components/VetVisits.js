import React from "react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import AddVisit from "./Modals/AddVisit";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { getPetData } from "./Helpers/PetFunctions";

const VetVists = (props) => {
  let newData = props;
  const petId = props.petId;
  const [visits, setVisits] = useState(newData.VetVisits);
  const [existing, setExisting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClose = () => {
    setShow(false);
    getPetData(petId).then((data) => setVisits(data.VetVisits));
  };

  visits.sort(function (a, b) {
    var nameA = a.VisitDate,
      nameB = b.VisitDate;
    if (nameA < nameB)
      //sort string ascending
      return 1;
    if (nameA > nameB) return -1;
    return 0; //default return value (no sorting)
  });

  const handleAddUpdateVisit = async (e, form, cb) => {
    e.preventDefault();
    let url;
    let visitId = form.addVisitForm.visitId.value;
    const vals = {
      VisitDate: form.addVisitForm.VisitDate.value,
      VisitNotes: form.addVisitForm.VisitNotes.value,
    };

    if (existing) {
      url = `/api/updatePetVisit/${petId}/${visitId}`;
    } else {
      url = `/api/addPetVisit/${petId}`;
    }
    return cb(url, vals);
  };

  const handleDelVisit = async (e, form, cb) => {
    e.preventDefault();
    let visitId = form.addVisitForm.visitId.value;
    let vals = {};
    let url = `/api/delPetVisit/${petId}/${visitId}`;
    return cb(url, vals);
  };

  const postVisit = async (url, vals) => {
    try {
      let resp = await axios.put(url, vals, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error(err.response);
    }
  };

  /// just rerender after
  useEffect(() => {}, [handleClose]);

  const update = async (e, data) => {
    e.preventDefault();
    setModalData(data);
    setExisting(true);
    setShow(true);
  };

  const add = async (e, data) => {
    e.preventDefault();
    setExisting(false);
    setShow(true);
    setModalData(data);
  };

  return (
    <div className="card m-2 shadow rounded">
      <div className="card-body text-center ">
        <h3 className="card-title">Visits</h3>
        <div className="pet-table">
          <ul>
            {visits.map((visit) => (
              <li
                name="editVisitBtn"
                onClick={(e) => update(e, visit)}
                key={visit._id}
                className="pet-list btn w-75"
              >
                <div>
                  <Moment utc format="MM/DD/YYYY">
                    {visit.VisitDate}
                  </Moment>
                </div>
                &nbsp; {visit.VisitNotes}
              </li>
            ))}
          </ul>
        </div>
        <button
          name="addVisitBtn"
          onClick={(e) => add(e, "{_id: 0}")}
          className="edit-visis-btn btn btn-circle btn-xl"
        >
          +
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add / Edit a Vet Visit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddVisit petId={petId} data={modalData} existing={false} />
          </Modal.Body>
          <Modal.Footer>
            {existing ? (
              <Button
                variant="primary"
                onClick={(e) => handleDelVisit(e, document.forms, postVisit)}
              >
                Delete Visit
              </Button>
            ) : null}
            <Button
              variant="primary"
              onClick={(e) =>
                handleAddUpdateVisit(e, document.forms, postVisit)
              }
            >
              Submit Visit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default VetVists;
