import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  // Get current logged rider
  const id = localStorage.getItem("rID");
  const [rider, setRider] = useState([]);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/riders/${id}`
      );
      setRider(data);
    };
    fatchCustomer();
  }, [rider, id]);

  // GET PARCELS
  const [parcels, setParcels] = useState([]);
  useEffect(() => {
    const fatchParcels = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/parcels"
      );
      const newParcels = data.filter((curData) => {
        return (
          (curData.picRiderID === id && curData.status === "Accepted") ||
          (curData.dlvRiderID === id && curData.status === "Ondelivery")
        );
      });
      setParcels(newParcels);
    };
    fatchParcels();
  }, [parcels, id]);

  // Logout
  const logout = () => {
    localStorage.removeItem("rToken");
    localStorage.removeItem("rID");
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar">
        <div></div>
        <div className="icons">
          <Link to="/pending-parcels">
            <div className="notification">
              <i className="ri-notification-2-line"></i>
              {parcels.length !== 0 && <span>{parcels.length}</span>}
            </div>
          </Link>
          <Link to="/profile">
            <div className="user">
              {rider.thumb ? (
                <img
                  src={process.env.REACT_APP_SERVER + "/riders/" + rider.thumb}
                  alt={rider.name}
                />
              ) : (
                <img src="/img/placeholder.png" alt={rider.name} />
              )}
              <span>{rider.name}</span>
            </div>
          </Link>
          <i className="ri-logout-circle-r-line" onClick={() => logout()}></i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
