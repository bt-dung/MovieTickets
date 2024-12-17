import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    
  }

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
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value })}
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
                    onChange={(e) => setUser({...user, password: e.target.value })}
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
