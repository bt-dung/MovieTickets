import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import {
  mdiSquareEditOutline,
  mdiDeleteOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";
import { fetchData } from "../../../api/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async (page = 0) => {
      try {
        const response = await fetchData(`/admin/movies?pageNumber=${page}&limit=3`);
        setMovies(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

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
                      <th style={{ width: "100px" }}>ID</th>
                      <th style={{ width: "400px" }}>Movie Name</th>
                      <th>Release Date</th>
                      <th>*Rate</th>
                      <th>Poster</th>
                      <th style={{ width: "20px" }}>Action</th>
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

              <nav className="d-flex justify-content-center">
                <ul className="pagination">
                  <li
                    className={`page-item ${currentPage === 0 ? 'disabled' : ''
                      }`}
                  >
                    <a
                      className="page-link"
                      href="javascript:void(0);"
                      aria-label="Previous"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${currentPage === index ? 'active' : ''
                        }`}
                    >
                      <a
                        className="page-link"
                        href="javascript:void(0);"
                        onClick={() => handlePageChange(index)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li
                    className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''
                      }`}
                  >
                    <a
                      className="page-link"
                      href="javascript:void(0);"
                      aria-label="Next"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
