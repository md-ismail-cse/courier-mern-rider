import { Avatar, Button } from "@mui/material";
import Title from "../../components/title/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const Profile = () => {
  // Get current logged rider
  const id = localStorage.getItem("rID");
  const [rider, setRider] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchRider = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/riders/${id}`
      );
      setRider(data);
      setLoading(true);
    };
    fatchRider();
  }, [rider, id]);

  return (
    <div>
      <div className="profile">
        <Title title="Profile" />
        <div className="content">
          <div className="profileBox">
            {loading ? (
              <table>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      {rider.thumb ? (
                        <Avatar
                          alt={rider.name}
                          src={
                            process.env.REACT_APP_SERVER +
                            "/riders/" +
                            rider.thumb
                          }
                        />
                      ) : (
                        <Avatar alt={rider.name} src="/img/placeholder.png" />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Name:</th>
                    <td>{rider.name}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{rider.email}</td>
                  </tr>
                  <tr>
                    <th>Phone:</th>
                    <td>{rider.phone}</td>
                  </tr>
                  <tr>
                    <th>Address:</th>
                    <td>{rider.address}</td>
                  </tr>
                  <tr>
                    <th>Joinging Date:</th>
                    <td>12/24/2022, 1:14:50 PM</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Button
                        href="/profile/edit-details"
                        variant="contained"
                        size="small"
                      >
                        Edit Details
                      </Button>
                      <Button
                        href="/profile/change-picture"
                        variant="contained"
                        size="small"
                      >
                        Change Picture
                      </Button>
                      <Button
                        href="/profile/change-password"
                        variant="contained"
                        size="small"
                      >
                        Change Password
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
