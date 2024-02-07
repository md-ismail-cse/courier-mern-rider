import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";

const EditDetails = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentThumb, setThumb] = useState("");

  // Get current logged rider
  const id = localStorage.getItem("rID");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchRider = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/riders/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("rToken"),
          },
        }
      );
      setName(data.name);
      setPhone(data.phone);
      setAddress(data.address);
      setThumb(data.thumb);
      setLoading(true);
    };
    fatchRider();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      name,
      phone,
      address,
      thumb: currentThumb,
    };
    axios
      .put(
        process.env.REACT_APP_SERVER +
          `/api/admin/riders/${id}?cthumb=${currentThumb}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("rToken"),
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => (window.location.href = "/profile"));
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
    <>
      <div className="editDetails">
        <Title title="Edit Personal Details" />
        <div className="content">
          <div className="form-box">
            {loading ? (
              <form className="form" onSubmit={submitHandler}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input type="submit" className="btnPrimary" />
              </form>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDetails;
