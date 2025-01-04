const User = require('../models/User');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const UserVerification = require('../models/UserVerification');
const Theaters = require('../models/Theater');
const Roles = require('../models/Roles')
const path = require("path");
dotenv.config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
    logger: true
})

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready for message")
        console.log(success);
    }
})

const registerUser = async (req, res) => {
    let { name, email, numberphone, date_of_birth, address, password, role } = req.body;
    name = name.trim();
    email = email.trim();
    numberphone = numberphone.trim();
    date_of_birth = date_of_birth.trim();
    address = address.trim();
    password = password.trim();
    if (!name || !email || !numberphone || !date_of_birth || !address || !password) {
        return res.json({
            status: "FAILED",
            message: "Empty input fields!",
        });
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return res.json({
            status: "FAILED",
            message: "Invalid name entered!",
        });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.json({
            status: "FAILED",
            message: "Invalid email entered!",
        });
    }
    if (!/^\d+$/.test(numberphone)) {
        return res.json({
            status: "FAILED",
            message: "Invalid numberphone entered!",
        });
    }
    const dateFormat = "YYYY-MM-DD";
    if (!dayjs(date_of_birth, dateFormat, true).isValid()) {
        return res.json({
            status: "FAILED",
            message: "Invalid date of birth entered! Use format YYYY-MM-DD.",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        name,
        email,
        numberphone,
        date_of_birth,
        address,
        password: hashedPassword,
        role_id: role || 1,
        verified: false
    };
    try {
        const newUser = await User.insertUser(userData);
        const sentEmail = sendVerificationEmail(newUser, res);
        if (sentEmail) {
            console.log("Email sending successful!!")
            return res.json({
                status: "SUCCESS",
                message: "User registered successfully! Verification email sent.",
            });
        } else {
            throw new Error("Failed to send verification email.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            status: "FAILED",
            message: error.message || "An error occurred while registering the user.",
        });
    }
};

const sendVerificationEmail = async ({ id, email }, res) => {
    try {
        console.log("Email user:", email);
        const currentUrl = "http://localhost:5000/";
        const uniqueString = uuidv4() + id;

        const hashedUniqueString = await bcrypt.hash(uniqueString, 10);

        const newVerification = new UserVerification({
            user_id: id,
            uniqueString: hashedUniqueString,
            createAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });

        await newVerification.save();

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `
                <p>Verify your email address to complete the signup and login into your account.</p>
                <p>This link <b>expires in 6 hours</b>.</p>
                <p>Press <a href=${currentUrl + "user/verify/" + id + "/" + uniqueString}>here</a> to proceed.</p>.`,
        };

        const sentEmail = await transporter.sendMail(mailOptions);
        return sentEmail;

    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
};

const checkinVerification = async (req, res) => {
    let { userId, uniqueString } = req.params;
    userId = userId.trim();
    uniqueString = uniqueString.trim();
    console.log("userID:", userId);
    console.log("uniqueString:", uniqueString);

    UserVerification
        .findOne({ where: { user_id: userId } })
        .then(result => {
            console.log(result)
            if (result) {
                const { expiresAt } = result.dataValues;
                const hashedUniqueString = result.dataValues.uniqueString;
                console.log("expiresAT:", expiresAt);
                console.log("hashedUniqueString:", hashedUniqueString);
                if (expiresAt < Date.now()) {
                    UserVerification
                        .destroy({ where: { user_id: userId } })
                        .then(() => {
                            User
                                .destroy({ where: { id: userId } })
                                .then(() => {
                                    let message = "Link has expired. Please sign up again.";
                                    res.redirect(`/verified/error=true&message=${message}`);
                                })
                                .catch((error) => {
                                    console.log(error);
                                    let message = "Clearing user with expired unique string failed!!";
                                    res.redirect(`/verified/error=true&message=${message}`);
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                            let message = "An error occurred while cleaning expired user verification record";
                            res.redirect(`/verified/error=true&message=${message}`);
                        })
                }
                else {
                    bcrypt
                        .compare(uniqueString, hashedUniqueString)
                        .then(result => {
                            if (result) {
                                User
                                    .update({ verified: true }, { where: { id: userId } })
                                    .then(() => {
                                        UserVerification
                                            .destroy({ where: { user_id: userId } })
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "../../views/verified.html"));
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                                let message = "An error occurred while finalizing successful verification!!";
                                                res.redirect(`/verified/error=true&message=${message}`);
                                            });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        let message = "An error occurred while updating user record to show verified!!";
                                        res.redirect(`/verified/error=true&message=${message}`);
                                    });

                            } else {
                                let message = "Invalid verification details passed. Check your inbox!!";
                                res.redirect(`/verified/error=true&message=${message}`);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            let message = "An error occurred while checking for existing user verification record!!";
                            res.redirect(`/verified/error=true&message=${message}`);
                        });
                }
            } else {
                let message = "Account record doesn't exist or has been verified already, Please sign up or login";
                res.redirect(`/verified/error=true&message=${message}`);
            }
        })
        .catch((error) => {
            console.log(error);
            let message = "An error occurred while checking for existing user verification record!!";
            res.redirect(`/verified/error=true&message=${message}`);
        });
};

const verified = (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/verified.html"));
};
const loginUser = async (req, res) => {
    try {
        let { email, password } = await req.body;
        console.log("EMAIL:", email);
        email = email.trim();
        password = password.trim();

        if (email == "" || password == "") {
            res.json({
                status: "Failed!!",
                message: "Empty credentials suppied",
            })
        } else {
            const user = await User.login(email, password);
            let theaterIds = null;
            if (user.role_id == 2) {
                const theaters = await Theaters.findAll({
                    where: {
                        manager_id: user.id
                    },
                    attributes: ['id']
                });
                theaterIds = theaters.map(theater => theater.id);
            }
            const role = await Roles.findByPk(user.role_id);
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email, role: role.role_name, theater_id: theaterIds },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(200).json({
                status: "Success",
                message: "Login successful",
                token,
                data: user,
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: error.message || "An error occurred during login",
        });
    }
};
const logoutUser = async (req, res) => {
    return res.status(200).json({
        status: "Success",
        message: "Logout successful",
    });
};
module.exports = { registerUser, loginUser, logoutUser, checkinVerification, verified };