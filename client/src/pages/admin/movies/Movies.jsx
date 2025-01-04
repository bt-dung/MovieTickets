import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import {
  mdiSquareEditOutline,
  mdiDeleteOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);
  console.log(movies);

  return (
    <>
      <h1 className="text-muted mb-3">MOVIES</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-sm-4">
                  <a href="add-user.html" className="btn btn-danger mb-2">
                    <Icon path={mdiPlusCircleOutline} size={1} /> Add Movie
                  </a>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  className="table table-centered table-striped dt-responsive nowrap w-100"
                  id="products-datatable"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "20px" }}></th>
                      <th>ID</th>
                      <th style={{ width: "30px" }}>Movie Name</th>
                      <th>Release Date</th>
                      <th>Vote</th>
                      <th>Poster</th>
                      <th style={{ width: "75px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.length > 0 ? (
                      movies.map((movie, index) => (
                        <tr key={index}>
                          <td>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`customCheck${index}`}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`customCheck${index}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="text-body font-weight-semibold"
                            >
                              {movie.id}
                            </a>
                          </td>
                          <td>{movie.title}</td>
                          <td>{movie.release_date}</td>
                          <td>{movie.vote_average}</td>
                          <td><img src={movie.img_poster} width={100} /></td>
                          <td>
                            <a href="" className="action-icon">
                              <Icon path={mdiSquareEditOutline} size={1} />
                            </a>
                            <a href="" className="action-icon">
                              <Icon path={mdiDeleteOutline} size={1} />
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
