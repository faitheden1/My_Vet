import React from "react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import AddReminder from "./Modals/AddReminder";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { getPetData } from "./Helpers/PetFunctions";

const Reminders = (props) => {
  let newData = props;
  const petId = props.petId;
  const [reminders, setReminders] = useState(newData.Reminders);
  const [existing, setExisting] = useState(false);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClose = () => {
    setShow(false);
    getPetData(petId).then((data) => setReminders(data.Reminders));
  };

  reminders.sort(function (a, b) {
    var nameA = a.Date,
      nameB = b.Date;
    if (nameA < nameB)
      //sort string ascending
      return 1;
    if (nameA > nameB) return -1;
    return 0; //default return value (no sorting)
  });

  const handleAddUpdateReminder = async (e, form, cb) => {
    e.preventDefault();
    console.log("from click", form.addReminderForm);
    let url;
    let reminderId = form.addReminderForm.reminderId.value;
    const vals = {
      Date: form.addReminderForm.Date.value,
      Title: form.addReminderForm.Title.value,
      Note: form.addReminderForm.Note.value,
    };

    if (existing) {
      url = `/api/updatePetReminder/${petId}/${reminderId}`;
    } else {
      url = `/api/addPetReminder/${petId}`;
    }

    return cb(url, vals);
  };

  const handleDelReminder = async (e, form, cb) => {
    e.preventDefault();
    let reminderId = form.addReminderForm.reminderId.value;
    let vals = {};
    let url = `/api/delPetReminder/${petId}/${reminderId}`;
    return cb(url, vals);
  };

  const postReminder = async (url, vals) => {
    try {
      let resp = await axios.put(url, vals, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      handleClose();
      console.log(resp);
    } catch (err) {
      console.log(err);
      toast.error(err.response);
    }
  };

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
        <h3 className="card-title">Reminders</h3>
        <div className="pet-table">
          <ul>
            {reminders.map((rem) => (
              <li
                onClick={(e) => update(e, rem)}
                key={rem._id}
                className="pet-list btn w-75"
              >
                <div>
                  <Moment format="MM/DD/YYYY">{rem.Date}</Moment>
                </div>
                <div>{rem.Title}</div>
                &nbsp; {rem.Note}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={(e) => add(e, "{_id: 0}")}
          className="edit-reminders-btn btn btn-circle btn-xl"
        >
          +
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reminders</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddReminder petId={petId} data={modalData} existing={false} />
          </Modal.Body>
          <Modal.Footer>
            {existing ? (
              <Button
                variant="danger"
                onClick={(e) =>
                  handleDelReminder(e, document.forms, postReminder)
                }
              >
                Delete Reminder
              </Button>
            ) : null}
            <Button
              variant="primary"
              onClick={(e) =>
                handleAddUpdateReminder(e, document.forms, postReminder)
              }
            >
              Submit Form
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Reminders;
