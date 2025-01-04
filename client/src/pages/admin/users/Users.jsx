import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiSquareEditOutline,
  mdiDeleteOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <>
      <h1 className="text-muted mb-3">USERS</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-sm-4">
                  <a href="/admin/add-user" className="btn btn-danger mb-2">
                    <Icon path={mdiPlusCircleOutline} size={1} /> Add User
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
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Number Phone</th>
                      <th>Address</th>
                      <th>Score</th>
                      <th>Verified</th>
                      <th style={{ width: "75px" }}>Action</th>
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

export default User;
