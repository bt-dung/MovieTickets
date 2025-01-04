import React, { useEffect, useState } from "react";

const User = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/admin/users") // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data
      })
      .then((data) => setUsers(data)) // Set the received data to state
      .catch((error) => console.error("Fetch error:", error)); // Handle errors
  }, []);
  console.log(users);
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-sm-4">
                  <div
                    variant="danger"
                    href="add-user.html"
                    className="btn mb-2"
                  >
                    <i className="mdi mdi-plus-circle mr-2"></i> Add User
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <div className="table table-striped table-bordered table-hover table-responsive"> 
                  <thead>
                    <tr>
                      <th style={{ width: "20px" }}>
                        <div className="form-check" type="checkbox" id="customCheck1" />
                      </th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Phone Number</th>
                      <th>Role</th>
                      <th style={{ width: "75px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-check" type="checkbox" id="customCheck2" />
                      </td>
                      <td>
                        <a
                          href="javascript:void(0);"
                          className="text-body font-weight-semibold"
                        >
                          Abc
                        </a>
                      </td>
                      <td>Abc</td>
                      <td>0989999999</td>
                      <td>Admin</td>
                      <td>
                        <a href="javascript:void(0);" className="action-icon">
                          <i className="mdi mdi-square-edit-outline"></i>
                        </a>
                        <a href="javascript:void(0);" className="action-icon">
                          <i className="mdi mdi-delete"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
