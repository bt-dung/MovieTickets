import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormatDate, formatHour } from "../../../utils/formatDateHelper";
import imageURL from "/assets/images/banner/banner04.jpg";
import { fetchData } from "../../../api/api";
const DetailOrder = () => {
    const navigate = useNavigate();
    const { invoiceId } = useParams();
    const [invoice, setInvoice] = useState('');
    const [showtime, setShowtime] = useState('');
    const [theater, setTheater] = useState('');
    useEffect(() => {
        const fetchInvoiceData = async (invoiceId) => {
            const invoiceData = await fetchData(`/api/v1/invoice/${invoiceId}`);
            console.log(invoiceData);
            setInvoice(invoiceData);
        }
        fetchInvoiceData(invoiceId);
    }, [invoiceId]);
    useEffect(() => {
        if (invoice) {
            const fetchShowtimeandThreater = async () => {
                console.log(invoice?.tickets[0]?.showtime_id);
                const showtimeData = await fetchData(`/api/v1/showtime/${invoice?.tickets[0]?.showtime_id}`);
                console.log("showtime", showtimeData);
                setShowtime(showtimeData.data);
                const theaterData = await fetchData(`/api/v1/theaters/${invoice?.theater_id}`);
                console.log(theaterData);
                setTheater(theaterData);
            }
            fetchShowtimeandThreater();
        }
    }, [invoice]);

    return (<>
        <section className="banner-section">
            <div
                className="banner-bg bg_img bg-fixed"
                style={{ backgroundImage: `url(${imageURL})` }}
            ></div>

            <div className="title-page-ticket">
                TICKETS
            </div>
            <div className="container-xxl" style={{ alignItems: "center", position: "relative", zIndex: "5" }}>
                <div class="page-title-area">
                    <div className="item md-order-1">
                        <button className="custom-button back-button" onClick={() => navigate("/starcinema/orders/order-tracking")}>
                            <i className="flaticon-double-right-arrows-angles" style={{ fontSize: "20px" }}></i> Back
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-xl order-list-gruop">
                <div className="content-order">
                    <h3>Order Code:   #{invoice?.id}</h3>
                    <div className="order-main">
                        <div className="order-section">
                            <div className="order-child">
                                <p><span style={{ display: "inline-block", minWidth: "150px" }}>Email :</span>  {invoice?.email}</p>
                                <p><span style={{ display: "inline-block", minWidth: "150px" }}>Create at :</span> {FormatDate(invoice?.purchase_date)} at {formatHour(invoice?.purchase_date)}</p>
                                <p><span style={{ display: "inline-block", minWidth: "150px" }}>Theater :</span> {theater?.name} </p>
                                <p><span style={{ display: "inline-block", minWidth: "150px" }}>Address :</span> {theater?.address} </p>
                            </div>
                            <div className="order-booked">
                                <h4>Ticket booked</h4>
                                <p><span style={{ display: "inline-block", minWidth: "100px" }}>Seats :</span> x{invoice?.tickets?.length}   {invoice?.tickets?.map(ticket => ticket.seat?.seat_name).join(", ")}</p>
                                <p><span style={{ display: "inline-block", minWidth: "100px" }}>Price :</span> {Math.floor(
                                    invoice?.tickets?.reduce((total, ticket) => total + (+ticket?.seat?.seat_type?.price || 0), 0)
                                ).toLocaleString()} VND</p>
                                {invoice?.invoice_services?.length !== 0 && (<>
                                    <h4>Service</h4>
                                    {invoice?.invoice_services?.map((service) => (<>
                                        <p><span style={{ display: "inline-block", minWidth: "100px" }}>{service?.service?.name}</span>x{service?.quantity} {Math.floor(service?.total_price).toLocaleString()} VND</p>
                                    </>
                                    ))}
                                </>)}
                            </div>
                        </div>
                        <div className="order-section">
                            <div className="order-child">
                                <p><span style={{ display: "inline-block", minWidth: "100px" }}>Movie :</span> <span style={{ color: "red" }}>  {showtime?.movie?.title}</span></p>
                                <p><span style={{ display: "inline-block", minWidth: "100px" }}>Show at :</span> {FormatDate(showtime?.date_time)} at {formatHour(showtime?.start_time)} </p>
                                <p><span style={{ display: "inline-block", minWidth: "100px" }}>Screen :</span> {showtime?.screen?.name}</p>
                            </div>
                            <div className="order-child">
                                <h4>TOTAL PRICE : {Math.floor(invoice?.TotalAmount).toLocaleString()} VND</h4>
                                <h4>Status: <span style={{ color: "green" }}>{invoice?.PaymentStatus}</span></h4>
                            </div>
                        </div></div>
                </div>
            </div>
        </section>
    </>);
};
export default DetailOrder;