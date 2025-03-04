import axios from "axios";
import UserContext from "../../Context/UserContext";
import PetContext from "../../Context/PetContext";
import React, { useContext, useEffect, useState } from "react";

const ConfirmDelete = (props) => {
  const { userData } = useContext(UserContext);
  const { newPetData, setNewPetData } = useContext(PetContext);
  const { petId, setPetId } = useContext(PetContext);
  const [pets, setUserPets] = useState([]);
  const [user] = useState(userData.user?.id);

  useEffect(() => {
    loadUserPets(user);
  }, [user, newPetData, petId]);

  const loadUserPets = async (user) => {
    console.log(user);
    let url = `/api/getpetbyuser/${user}`;
    let token = localStorage.getItem("auth-token");
    console.log(url);
    console.log(token);
    try {
      const { data } = await axios.get(url, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      data && setUserPets(data);
      setNewPetData(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePet = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const { data } = await axios.delete(`/api/pet/${petId}`, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      setPetId("");
      loadUserPets(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="confirmDelete" className="modal fade">
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header flex-column">
            <div className="icon-box">
              <i className="material-icons">&#xE5CD;</i>
            </div>
            <h4 className="modal-title w-100">Are you sure?</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>
              Do you really want to delete these records? This process cannot be
              undone.
            </p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <div
              onClick={deletePet}
              className="modal-footer"
              data-bs-dismiss="modal"
            >
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
