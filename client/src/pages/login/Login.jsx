import React, { useState } from "react";
import { postData } from "../../api/api";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(user);
    const res = await postData("/api/v1/login", body);
    const data = res.json();
    console.log(data);
    // try {
    //   const res = await fetch("http://localhost:5000/api/v1/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(user),
    //   });

    //   const data = await res.json();
    //   console.log("Response:", data);
    // } catch (error) {
    //   console.error("Error during fetch:", error);
    // }
  };

  return (
    <>
      <section
        className="account-section bg_img"
        data-background="assets/images/account/account-bg.jpg"
      >
        <div className="container">
          <div className="padding-top padding-bottom">
            <div className="account-area">
              <div className="section-header-3">
                <span className="cate">Start Movies</span>
                <h2 className="title">welcome back</h2>
              </div>
              <form className="account-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label for="email2">
                    Email<span>*</span>
                  </label>
                  <input
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    type="text"
                    placeholder="Enter Your Email"
                    id="email2"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="pass3">
                    Password<span>*</span>
                  </label>
                  <input
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    type="password"
                    placeholder="Password"
                    id="pass3"
                    required
                  />
                </div>
                <div className="form-group checkgroup">
                  <input type="checkbox" id="bal2" required checked />
                  <label for="bal2">remember password</label>
                  <a href="#0" className="forget-pass">
                    Forget Password
                  </a>
                </div>
                <div className="form-group text-center">
                  <input type="submit" value="log in" />
                </div>
              </form>
              <div className="option">
                Don't have an account? <a href="sign-up.html">sign up now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
