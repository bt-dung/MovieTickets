import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiSofaSingleOutline } from "@mdi/js";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../../api/api";

const Seats = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState();
  const { screenId } = useParams();

  useEffect(() => {
    console.log("run")
    const fetchScreens = async () => {
      try {
        const res = await fetchData(`/api/v1/screens/${screenId}`);
        setScreen(res.data);
      } catch (error) {
        console.error("Error fetching screen data:", error);
      }
    };
    fetchScreens();
  }, [screenId]);
  console.log("screen: ", screen);

  return (
    <>
      <div className="d-flex w-100 ">
        <div type="button" className="btn mr-3" onClick={() => navigate(-1)}>
          <Icon path={mdiArrowLeft} size={2} />
        </div>
        <h1 className="text-muted mb-3">Seat</h1>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                {/* Left column for seat legend */}
                <div className="col-2 bg-warning-subtle">
                  <div className="row mb-2">
                    <div className="col-2">
                      <Icon
                        path={mdiSofaSingleOutline}
                        size={1}
                        style={{ color: "green" }}
                      />
                    </div>
                    <div className="col-10">
                      <p>Available seat</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <Icon
                        path={mdiSofaSingleOutline}
                        size={1}
                        style={{ color: "red" }}
                      />
                    </div>
                    <div className="col-10">
                      <p>Booked seat</p>
                    </div>
                  </div>
                </div>

                {/* Right column for 5x5 seat layout */}
                <div className="col-10 d-flex justify-content-center align-items-center">
                  <div>
                    {/* Display column numbers */}
                    <div className="row mb-2">
                      <div className="col-1"></div>{" "}
                      {/* Empty cell for row labels */}
                      {[...Array(7).keys()].map((colIndex) => (
                        <div
                          className="col d-flex justify-content-center font-weight-bold"
                          key={colIndex}
                        >
                          {colIndex + 1} {/* Column numbers */}
                        </div>
                      ))}
                    </div>

                    {/* Iterate rows */}
                    {[...Array(screen.total_row).keys()].map((rowIndex) => (
                      <div className="row mb-2" key={rowIndex}>
                        {/* Display row label */}
                        <div className="col-1 d-flex align-items-center font-weight-bold">
                          {String.fromCharCode(65 + rowIndex)}{" "}
                          {/* Row letters (A, B, C, ...) */}
                        </div>

                        {/* Seats in the row */}
                        {[...Array(screen.total_column).keys()].map(
                          (colIndex) => (
                            <div
                              className="col d-flex justify-content-center"
                              key={colIndex}
                            >
                              <Icon
                                path={mdiSofaSingleOutline}
                                size={1.5}
                                style={{ color: "green" }}
                              />
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seats;
