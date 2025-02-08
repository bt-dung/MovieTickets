import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiSquareEditOutline,
  mdiDeleteOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";
import Swal from "sweetalert2";
import { useUser } from "../../../context/UserContext";
import { deleteData, fetchData } from "../../../api/api";

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [inputTxt, setInputTxt] = useState("");

  const userCurrent = useUser();
  const roleCurrent = userCurrent.user?.role;

  useEffect(() => {
    const fetchUsers = async (page = 0) => {
      try {
        const response = await fetchData(
          `/admin/users?pageNumber=${page}&limit=8`
        );
        setUsers(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteUser = async (id) => {
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
      text: "Do you really want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed) {
      try {
        await deleteData(`/admin/user/${id}/delete`);
        Swal.fire({
          title: "Deleted!",
          text: "User deleted successfully.",
          icon: "success",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user.",
          icon: "error",
        });
      }
    }
  };

  const handleSearch = () => {
    if (inputTxt !== "") {
      const searchInput = users.filter((user) => {
        return user.name.toLowerCase().includes(inputTxt.toLowerCase());
      });
      setUsers(searchInput);
    }
  };

  return (
    <>
      <h1 className="text-muted mb-3">USERS</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-sm-8">
                  <a href="/admin/add-user" className="btn btn-danger mb-2">
                    <Icon path={mdiPlusCircleOutline} size={1} /> Add User
                  </a>
                </div>
                <div className="input-group col-sm-4 d-flex">
                  <input
                    type="text"
                    placeholder="Search user"
                    value={inputTxt}
                    onChange={(e) => setInputTxt(e.target.value)}
                    onSubmit={handleSearch}
                  />
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
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Number Phone</th>
                      <th>Address</th>
                      <th>Score</th>
                      <th>Verified</th>
                      <th className="row" style={{ width: "50px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
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
                              {user.id}
                            </a>
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.numberphone}</td>
                          <td>{user.address}</td>
                          <td>{user.customer_score}</td>
                          <td>
                            {user.verified ? (
                              <span className="badge badge-success">Yes</span>
                            ) : (
                              <span className="badge badge-danger">No</span>
                            )}
                          </td>
                          <td>
                            <a href={`/admin/edit-user/${user.id}`} className="action-icon">
                              <Icon path={mdiSquareEditOutline} size={1} />
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="action-icon"
                              onClick={() => handleDeleteUser(user.id)}
                            >
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
                    className={`page-item ${currentPage === 0 ? "disabled" : ""
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
                      className={`page-item ${currentPage === index ? "active" : ""
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
                    className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""
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

export default User;
