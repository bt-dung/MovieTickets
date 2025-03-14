import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiSofaSingleOutline } from "@mdi/js";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../../api/api";

const Seats = () => {
  const navigate = useNavigate();
  const [total_row, setRow] = useState(0);
  const [total_column, setColumn] = useState(0);
  const { screenId } = useParams();

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const res = await fetchData(`/api/v1/screen/${screenId}`);
        const seats = await fetchData(`api/v1/seats/${screenId}`);
        console.log(seats);
        setRow(res.total_row);
        setColumn(res.total_column);
      } catch (error) {
        console.error("Error fetching screen data:", error);
      }
    };
    fetchScreens();
  }, [screenId]);

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

                <div className="col-10 d-flex justify-content-center align-items-center">
                  <div>
                    <div className="row mb-2">
                      <div className="col-1"></div>{" "}
                      {[...Array(total_column).keys()].map((colIndex) => (
                        <div
                          className="col d-flex justify-content-center font-weight-bold"
                          key={colIndex}
                        >
                          {colIndex + 1}
                        </div>
                      ))}
                    </div>

                    {[...Array(total_row).keys()].map((rowIndex) => (
                      <div className="row mb-2" key={rowIndex}>
                        <div className="col-1 d-flex align-items-center font-weight-bold">
                          {String.fromCharCode(65 + rowIndex)}{" "}
                        </div>

                        {[...Array(total_column).keys()].map(
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
