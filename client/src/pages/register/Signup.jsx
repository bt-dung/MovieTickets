import React, { useState, useEffect } from "react";
import { postData } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import bgImage from "/assets/images/account/account-bg.jpg";

const env = await import.meta.env;
const BASE_URL_WEB = env.VITE_BASE_URL_WEB;

const Signup = () => {
    const [account, setAccount] = useState({
        name: "",
        email: "",
        password: "",
        numberphone: "",
        date_of_birth: "",
        address: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const Navigate = useNavigate();

    const validate = () => {
        let isValid = true;
        const newErrors = { email: "", password: "", name: "", numberphone: "" };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

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

        if (!account.name) {
            newErrors.name = "Name is required.";
            isValid = false;
        }

        if (!account.numberphone) {
            newErrors.numberphone = "Phone number is required.";
            isValid = false;
        } else if (!phoneRegex.test(account.numberphone)) {
            newErrors.numberphone = "Phone number must be exactly 10 digits.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    const showSuccessPopup = () => {
        Modal.success({
            title: "Signup Successful",
            content: "Your account has been created successfully! User verification has been sent to your email. Please complete it before logging into the system. StarsCinema thanks you!",
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            const res = await postData("/api/v1/register", account);
            if (res.status === "SUCCESS") {
                showSuccessPopup()
                Navigate(`${BASE_URL_WEB}/login`)
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };
    return (
        <>
            <>
                <section
                    className="account-section bg_img"
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    <div className="container">
                        <div className="padding-top padding-bottom">
                            <div className="account-area">
                                <div className="section-header-3">
                                    <span className="cate">Stars Cinema</span>
                                    <h2 className="title">Sign up</h2>
                                </div>
                                <form className="account-form" onSubmit={handleLogin}>
                                    <div className="form-group">
                                        <label for="name2">
                                            Name<span>*</span>
                                        </label>
                                        <input
                                            value={account.name}
                                            onChange={(e) =>
                                                setAccount({ ...account, name: e.target.value })
                                            }
                                            type="text"
                                            placeholder="Enter Your Username"
                                            id="name2"
                                            style={{
                                                background: "white",
                                                padding: "5px",
                                                borderRadius: "5px",
                                            }}
                                        />
                                        {errors.name && (
                                            <small className="text-danger d-block mt-1">
                                                * {errors.name}
                                            </small>
                                        )}
                                    </div>
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
                                            style={{
                                                background: "white",
                                                padding: "5px",
                                                borderRadius: "5px",
                                            }}
                                        />
                                        {errors.email && (
                                            <small className="text-danger d-block mt-1">
                                                * {errors.email}
                                            </small>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone2">
                                            Phone Number<span>*</span>
                                        </label>
                                        <input
                                            value={account.numberphone}
                                            onChange={(e) =>
                                                setAccount({ ...account, numberphone: e.target.value })
                                            }
                                            type="text"
                                            placeholder="Enter Your Phone Number"
                                            id="phone2"
                                            style={{
                                                background: "white",
                                                padding: "5px",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </div>
                                    <div className="form-group ">
                                        <label for="pass3">
                                            Password<span>*</span>
                                        </label>
                                        <div className="d-flex flex-row">
                                            <input
                                                value={account.password}
                                                onChange={(e) =>
                                                    setAccount({ ...account, password: e.target.value })
                                                }
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                id="pass3"
                                                style={{
                                                    background: "white",
                                                    padding: "5px",
                                                    borderRadius: "5px",
                                                }}
                                            />
                                        </div>
                                        {errors.password && (
                                            <small className="text-danger d-block mt-1">
                                                * {errors.password}
                                            </small>
                                        )}
                                    </div>
                                    <div className="form-group text-center">
                                        <input type="submit" value="Sign up" />
                                    </div>
                                </form>
                                <div className="option">
                                    Have an account? <a href="./login">sign in</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </>
    );
};

export default Signup;