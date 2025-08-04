import imageURL from "/assets/images/banner/banner07.jpg";
import contactURL from "/assets/images/contact/contact.jpg";
import { useState, useEffect } from "react";
import { postData } from "../../../api/api";
const Contact = () => {
    const [formData, setFormData] = useState({
        sender_name: '',
        sender_email: '',
        type: '',
        content: ''
    });
    useEffect(() => {
        console.log("Form data changed:", formData);
    }, [formData]);

    const handleSubmit = (e) => {
        const { sender_name, sender_email, type, content } = formData;
        const data = {
            sender_name,
            sender_email,
            type,
            content
        };
        try {
            const response = postData('/api/v1/notifications', data);
            if (response.status === "success") {
                Swal.fire({
                    text: 'Your message has been sent successfully!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay',
                });
                setFormData({
                    sender_name: '',
                    sender_email: '',
                    type: '',
                    content: ''
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Unexpected error occurred.';
            console.error("Error sending message:", error);
            Swal.fire({
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Okay',
            });
        }

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (<>
        <section class="main-page-header speaker-banner bg_img" style={{ backgroundImage: `url(${imageURL})` }}>
            <div class="container">
                <div class="speaker-banner-content">
                    <h2 class="title">contact us</h2>
                    <ul class="breadcrumb">
                        <li>
                            <a href="index.html">
                                Home
                            </a>
                        </li>
                        <li>
                            contact us
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="contact-section padding-top">
            <div class="contact-container">
                <div class="bg-thumb" style={{ backgroundImage: `url(${contactURL})` }}></div>
                <div class="container">
                    <div class="row justify-content-between">
                        <div class="col-md-7 col-lg-6 col-xl-5">
                            <div class="section-header-3 left-style">
                                <span class="cate">contact us</span>
                                <h2 class="title">get in touch</h2>
                                <p style={{ color: "white" }}>We are happy to hear your comments and suggestions. If you have any problem tell us by send us a message below and we’ll respond as soon as possible.</p>
                            </div>
                            <form class="contact-form" id="contact_form_submit" onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="name">Name <span>*</span></label>
                                    <input type="text" placeholder="Enter Your Full Name" name="sender_name" value={formData.sender_name} onChange={handleChange} required />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email <span>*</span></label>
                                    <input type="text" placeholder="Enter Your Email" name="sender_email" id="email" value={formData.sender_email} onChange={handleChange} required />
                                </div>
                                <select name="type">
                                    {types.length > 0 ? types.map(t => (
                                        <option key={t.name} value={t.name}>{t.display_name}</option>
                                    )) : (
                                        <option value="">No types available</option>)}
                                </select>
                                <div class="form-group">
                                    <label for="content">Message <span>*</span></label>
                                    <textarea name="content" placeholder="Enter Your Message" value={formData.content} onChange={handleChange} required></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="Send Message" />
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 col-lg-6">
                            <div className="padding-top padding-bottom contact-info">
                                <div className="info-area">
                                    <div className="info-item">
                                        <div className="info-thumb">
                                            <img src="../../../../assets/images/contact/contact01.png" alt="contact" />
                                        </div>
                                        <div className="info-content">
                                            <h6 className="title">phone number</h6>
                                            <a href="Tel:82828282034">+1234 56789</a>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-thumb">
                                            <img src="../../../../assets/images/contact/contact02.png" alt="contact" />
                                        </div>
                                        <div className="info-content">
                                            <h6 className="title">Email</h6>
                                            <a href="Mailto:info@gmail.com">starcinema@gmail.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section></>
    )
}

export default Contact;