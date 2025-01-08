import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiTelevision,
  mdiPlusCircleOutline,
  mdiSquareEditOutline,
  mdiDeleteOutline,
  mdiArrowLeft,
} from "@mdi/js";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchData, postData } from "../../../../api/api";
import { useUser } from "../../../../context/UserContext";

const env = import.meta.env;
const BASE_URL_ADMIN = env.VITE_BASE_URL_ADMIN;

const DetailScreen = () => {
  const { theaterId } = useParams();
  const navigate = useNavigate();
  const [screens, setScreens] = useState([]);
  const userCurrent = useUser();
  const roleCurrent = userCurrent.user?.role;

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const res = await fetchData(`/api/v1/screens/${theaterId}`);
        console.log(res);
        setScreens(res.data);
      } catch (error) {
        console.error("Error fetching screen data:", error);
      }
    };
    fetchScreens();
  }, []);

  const handleDeleteScreen = async (id) => {
    if (roleCurrent !== "admin_role") {
      Swal.fire({
        title: "Error!",
        text: "You cannot perform this operation!!",
        icon: "error",
      });
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this screen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed) {
      try {
        await deleteData(`/api/v1/screens/${id}/delete`);
        Swal.fire({
          title: "Deleted!",
          text: "Screen deleted successfully.",
          icon: "success",
        });
        setScreens(screens.filter((screen) => screen.id !== id));
      } catch (error) {
        console.error("Error deleting screen:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete screen.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="d-flex w-100 ">
        <div type="button" className="btn mr-3 " onClick={() => navigate(-1)}>
          <Icon path={mdiArrowLeft} size={2} />
        </div>
        <h1 className="text-muted mb-3"> Screens</h1>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="mb-2">
                <div className="col-sm-4">
                  <a
                    href={`${BASE_URL_ADMIN}/add-screen`}
                    className="btn btn-danger mb-2"
                  >
                    <Icon path={mdiPlusCircleOutline} size={1} /> Add Screen
                  </a>
                </div>
              </div>

              <a className="btn btn-primary" style={{color: "white"}} href={`${BASE_URL_ADMIN}/detail-screen/${theaterId}/seats`}>Seat</a>

              <div className="row">
                {screens.map((screen, index) => (
                  <div className="col-md-3 mb-4" key={index}>
                    <div className="card">
                      <div
                        className="card-img-top d-flex justify-content-center align-items-center bg-light"
                        style={{ height: "150px" }}
                      >
                        <Icon path={mdiTelevision} size={4} />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          {screen.name}
                        </h5>
                        <p className="card-text">
                          Total Seats: {screen.total_seats}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <a
                              href={`/admin/detail-screen/${screen.id}`}
                              className="btn btn-primary"
                              role="button"
                              aria-label={`Learn more about ${screen.name}`}
                            >
                              View Details
                            </a>
                          </div>
                          <div className="d-flex gap-2">
                            <a
                              href={`/admin/edit-screen/${screen.id}`}
                              className="action-icon"
                            >
                              <Icon path={mdiSquareEditOutline} size={1} />
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="action-icon"
                              onClick={() => handleDeleteScreen(screen.id)}
                            >
                              <Icon path={mdiDeleteOutline} size={1} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailScreen;
