import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiSquareEditOutline, mdiDeleteOutline, mdiPlusCircleOutline } from "@mdi/js";
import { fetchData, postData } from "../../../api/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await postData(`/admin/movies?pageNumber=${currentPage}&limit=3`);
        setMovies(response.content || []);
        setTotalPages(response.totalPages || 0);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const maxPagesToShow = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  if (endPage === totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <>
      <h1 className="text-muted mb-3">MOVIES</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-sm-4">
                  <a href="add-movie.html" className="btn btn-danger mb-2">
                    <Icon path={mdiPlusCircleOutline} size={1} /> Add Movie
                  </a>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-centered table-striped dt-responsive nowrap w-100">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>Movie Name</th>
                      <th>Release Date</th>
                      <th>Rate</th>
                      <th>Poster</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.length > 0 ? (
                      movies.map((movie, index) => (
                        <tr key={movie.id}>
                          <td>{index + 1}</td>
                          <td>{movie.id}</td>
                          <td>{movie.title}</td>
                          <td>{movie.release_date}</td>
                          <td>{movie.vote_average}</td>
                          <td><img src={movie.img_poster} width={100} alt={movie.title} /></td>
                          <td>
                            <a href="#" className="action-icon">
                              <Icon path={mdiSquareEditOutline} size={1} />
                            </a>
                            <a href="#" className="action-icon">
                              <Icon path={mdiDeleteOutline} size={1} />
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No movies found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <nav className="d-flex justify-content-center">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</a>
                  </li>
                  {visiblePages.map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                      <a className="page-link" href="#" onClick={() => handlePageChange(page)}>{page}</a>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</a>
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
