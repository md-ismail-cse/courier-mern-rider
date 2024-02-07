import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";

const SingleParsel = () => {
  // GET PARCEL DETAILS
  const { id } = useParams();
  const [parcel, setParcel] = useState({});
  const [customerID, setCustomerID] = useState("");
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/parcels/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("rToken"),
          },
        }
      );
      setParcel(data);
      setCustomerID(data.customerID);
      setLoading(true);
    };
    fatchCustomer();
  }, [parcel, id]);

  // GET CUSTOMER DETAILS
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/customers/${customerID}`,
        {
          headers: {
            Authorization: localStorage.getItem("rToken"),
          },
        }
      );
      setCustomer(data);
    };
    fatchCustomer();
  }, [customer, customerID]);

  // GET RIDER DETAILS
  const [picRider, setPicRider] = useState({});
  const [dlvRider, setDlvRider] = useState({});
  useEffect(() => {
    if (parcel.picRiderID !== "NaN") {
      const fatchPicRider = async () => {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER +
            `/api/admin/riders/${parcel.picRiderID}`,
          {
            headers: {
              Authorization: localStorage.getItem("rToken"),
            },
          }
        );
        setPicRider(data);
      };
      fatchPicRider();
    }
    if (parcel.dlvRiderID !== "NaN") {
      const fatchDlvRider = async () => {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER +
            `/api/admin/riders/${parcel.dlvRiderID}`,
          {
            headers: {
              Authorization: localStorage.getItem("rToken"),
            },
          }
        );
        setDlvRider(data);
      };
      fatchDlvRider();
    }
  }, [picRider, parcel.picRiderID, dlvRider, parcel.dlvRiderID]);

  // UPDATE PARCEL
  const submitHandler = (status) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        let updateData = {
          status,
        };
        axios
          .put(
            process.env.REACT_APP_SERVER + `/api/admin/parcels/${id}`,
            updateData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("rToken"),
              },
            }
          )
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Parcel updated successfull.",
              showConfirmButton: false,
              timer: 1000,
            }) /*.then(() => (window.location.href = "/parcels"))*/;
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Parcel update field!",
            });
          });
      }
    });
  };

  // Delivery OTP System
  const [otp, setOtp] = useState("");

  // OTP sender

  const [otpLoading, setOtpLoading] = useState(false);
  const otpSender = (e) => {
    e.preventDefault();
    setOtpLoading(true);
    let data = {
      id,
    };
    axios
      .put(process.env.REACT_APP_SERVER + "/api/delivery-otp", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("rToken"),
        },
      })
      .then((response) => {
        setOtpLoading(false);
        if (response.data.message === "OTP has been send to your email!") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  const otpSubmit = (e) => {
    e.preventDefault();
    setOtpLoading(true);
    let data = {
      id,
      otp,
    };
    axios
      .put(process.env.REACT_APP_SERVER + "/api/delivery-otp", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("rToken"),
        },
      })
      .then((response) => {
        setOtpLoading(false);
        if (response.data.message === "OTP verification successfull.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  return (
    <div>
      <div className="singleParcel">
        <Title title="Parcel Details" />
        <div className="content">
          {laoding ? (
            <div className="parcelInner">
              <div className="parcelBox">
                <h4>Customer Detais</h4>
                <div className="profileBox">
                  <table>
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          {customer.thumb ? (
                            <Avatar
                              alt={customer.name}
                              src={
                                process.env.REACT_APP_SERVER +
                                "/customers/" +
                                customer.thumb
                              }
                            />
                          ) : (
                            <Avatar
                              alt={customer.name}
                              src="/img/placeholder.png"
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Name:</th>
                        <td>{customer.name}</td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>
                          <Link to={"mailto:" + customer.email}>
                            {customer.email}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th>Phone:</th>
                        <td>
                          <Link to={"tel:" + customer.phone}>
                            {customer.phone}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th>Gender:</th>
                        <td>{customer.gender}</td>
                      </tr>
                      <tr>
                        <th>Address:</th>
                        <td>{customer.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="parcelBox">
                <h4>Parcel Detais</h4>
                <div className="profileBox">
                  <table>
                    <tbody>
                      <tr>
                        <th>Type:</th>
                        <td>{parcel.type}</td>
                      </tr>
                      <tr>
                        <th>Note:</th>
                        <td>
                          <span className="note bold">{parcel.note}</span>
                        </td>
                      </tr>
                      <tr>
                        <th>Weight:</th>
                        <td>{parcel.weight} kg</td>
                      </tr>
                      <tr>
                        <th>Length:</th>
                        <td>{parcel.length} inch</td>
                      </tr>
                      <tr>
                        <th>Total price:</th>
                        <td>{parcel.totalPrice} ৳</td>
                      </tr>
                      <tr>
                        <th>Payment:</th>
                        <td>{parcel.payment}</td>
                      </tr>
                      <tr>
                        <th>Status:</th>
                        <td>
                          <span className={parcel.status}>{parcel.status}</span>
                        </td>
                      </tr>
                      <tr>
                        <th>Order Date:</th>
                        <td>{new Date(parcel.orderDate).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <th>Accept Date:</th>
                        <td>
                          {parcel.acceptTime
                            ? new Date(parcel.acceptTime).toLocaleString()
                            : "NaN"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="parcelBox">
                <h4>Delivery Detais</h4>
                <div className="profileBox">
                  <table>
                    <tbody>
                      <tr>
                        <th>Name:</th>
                        <td>{parcel.recName}</td>
                      </tr>
                      <tr>
                        <th>Phone:</th>
                        <td>
                          <Link to={"tel:" + parcel.recPhone}>
                            {parcel.recPhone}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>
                          <Link to={"mailto:" + parcel.recEmail}>
                            {parcel.recEmail}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th>Address:</th>
                        <td>{parcel.recAddress}</td>
                      </tr>
                      <tr>
                        <th>Send:</th>
                        <td>{parcel.sendLocation}</td>
                      </tr>
                      <tr>
                        <th>End:</th>
                        <td>{parcel.endLocation}</td>
                      </tr>
                      <tr>
                        <th>Duration:</th>
                        <td>{parcel.duration} Days</td>
                      </tr>
                      <tr>
                        <th>Map:</th>
                        <td className="tableAction">
                          <Link
                            to={`https://www.google.com/maps/dir/${parcel.sendLocation}/${parcel.recAddress}/`}
                            className="view"
                            target="_blank"
                          >
                            <i class="ri-road-map-fill"></i>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {parcel.picRiderID !== "NaN" && (
                <div className="parcelBox">
                  <h4>Pickup Man</h4>
                  <div className="profileBox">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2}>
                            {picRider.thumb ? (
                              <Avatar
                                src={
                                  process.env.REACT_APP_SERVER +
                                  "/riders/" +
                                  picRider.thumb
                                }
                                alt={picRider.name}
                              />
                            ) : (
                              <Avatar
                                alt={picRider.name}
                                src="/img/placeholder.png"
                              />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Name:</th>
                          <td>{picRider.name}</td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>{picRider.email}</td>
                        </tr>
                        <tr>
                          <th>Phone:</th>
                          <td>{picRider.phone}</td>
                        </tr>
                        <tr>
                          <th>Gender:</th>
                          <td>{picRider.gender}</td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td>{picRider.address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {parcel.dlvRiderID !== "NaN" && (
                <div className="parcelBox">
                  <h4>Delivery Man</h4>
                  <div className="profileBox">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2}>
                            {dlvRider.thumb ? (
                              <Avatar
                                src={
                                  process.env.REACT_APP_SERVER +
                                  "/riders/" +
                                  dlvRider.thumb
                                }
                                alt={dlvRider.name}
                              />
                            ) : (
                              <Avatar
                                alt={dlvRider.name}
                                src="/img/placeholder.png"
                              />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Name:</th>
                          <td>{dlvRider.name}</td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>{dlvRider.email}</td>
                        </tr>
                        <tr>
                          <th>Phone:</th>
                          <td>{dlvRider.phone}</td>
                        </tr>
                        <tr>
                          <th>Gender:</th>
                          <td>{dlvRider.gender}</td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td>{dlvRider.address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {localStorage.getItem("rID") === parcel.picRiderID &&
                parcel.status === "Accepted" && (
                  <div className="parcelBox">
                    <h4>Actions</h4>
                    <div className="form-box">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => submitHandler("Ondelivery")}
                      >
                        Pickup
                      </Button>
                    </div>
                  </div>
                )}
              {(localStorage.getItem("rID") === parcel.dlvRiderID &&
                parcel.status) === "Ondelivery" && (
                <div className="parcelBox">
                  <h4>Actions</h4>
                  <div className="form-box">
                    <>
                      {parcel.deliveryVerification === false ? (
                        <form className="form" onSubmit={otpSubmit}>
                          <TextField
                            required
                            fullWidth
                            label="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                          />

                          <input type="submit" className="btnPrimary" />
                          {otpLoading ? (
                            <Loader />
                          ) : (
                            <Link className="btnPrimary" onClick={otpSender}>
                              Re-sent
                            </Link>
                          )}
                        </form>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => submitHandler("Delivered")}
                        >
                          Delivery
                        </Button>
                      )}
                    </>
                  </div>
                  <div className="form-box"></div>
                </div>
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleParsel;
