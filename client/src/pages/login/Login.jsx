import React, { useState, useEffect } from "react";
import { postData } from "../../api/api";
import { useNavigate } from 'react-router-dom';
import TokenService from "../../service/TokenService";
import { useUser } from "../../context/UserContext";

const env = await import.meta.env;
const BASE_URL_WEB = (env.VITE_BASE_URL_WEB);
const BASE_URL_ADMIN = (env.VITE_BASE_URL_ADMIN);
const Login = () => {
  const { checkUserLogin } = useUser();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();


  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!account.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(account.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }
    if (!account.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {

    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const res = await postData("/api/v1/login", account);
      TokenService.setToken(res.token);
      checkUserLogin();
      let user;
      try {
        user = TokenService.decodeToken();
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
        return;
      }
      if (user.role === "user_role") {
        Navigate(`${BASE_URL_WEB}/home`);
      } else if (user.role === "admin_role" || user.role === "manager_role") {
        Navigate(`${BASE_URL_ADMIN}/dashboard`);
      }
    } catch (error) {
      console.log("Error:", error);
    }

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
                    value={account.email}
                    onChange={(e) =>
                      setAccount({ ...account, email: e.target.value })
                    }
                    type="text"
                    placeholder="Enter Your Email"
                    id="email2"
                  />
                  {errors.email && (
                    <small className="text-danger d-block mt-1">
                      * {errors.email}
                    </small>
                  )}
                </div>
                <div className="form-group ">
                  <label for="pass3">
                    Password<span>*</span>
                  </label>
                  <div className="d-flex flex-row">
                    <input
                      value={account.password}
                      onChange={(e) => setAccount({ ...account, password: e.target.value })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      id="pass3"
                      style={{ flex: 1 }}
                    />
                  </div>
                  {errors.password && (
                    <small className="text-danger d-block mt-1">
                      * {errors.password}
                    </small>
                  )}
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
