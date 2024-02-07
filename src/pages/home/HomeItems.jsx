import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const HomeItems = () => {
  const id = localStorage.getItem("rID");
  // GET PARCELS
  const [parcels, setParcels] = useState([]);
  const [pendingParcels, setPendingParcels] = useState([]);
  const [completeParcels, setCompleteParcels] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchParcels = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/parcels",
        {
          headers: {
            Authorization: localStorage.getItem("rToken"),
          },
        }
      );
      const newParcels = data.filter((curData) => {
        return curData.picRiderID === id || curData.dlvRiderID === id;
      });
      const pendingParcel = data.filter((curData) => {
        return (
          (curData.picRiderID === id && curData.status === "Accepted") ||
          (curData.dlvRiderID === id && curData.status === "Ondelivery")
        );
      });
      const completeParcel = data.filter((curData) => {
        return (
          (curData.picRiderID === id || curData.dlvRiderID === id) &&
          curData.status === "Delivered"
        );
      });
      setParcels(newParcels);
      setPendingParcels(pendingParcel);
      setCompleteParcels(completeParcel);
      setLoading(true);
    };
    fatchParcels();
  }, [parcels, id]);

  return (
    <>
      {laoding ? (
        <div className="dashboardItems">
          <Link to="/pending-parcels">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Pending Parcels</h4>
                <span>{pendingParcels.length}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-time-line"></i>
              </span>
            </div>
          </Link>
          <Link to="/complete-parcels">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Complete Parcels</h4>
                <span>{completeParcels.length}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-check-double-line"></i>
              </span>
            </div>
          </Link>
          <Link to="/parcels">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Total Parcel</h4>
                <span>{parcels.length}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-shake-hands-fill"></i>
              </span>
            </div>
          </Link>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HomeItems;
