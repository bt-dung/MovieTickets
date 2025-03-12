import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useCurrentSeat } from "../../../context/SeatContext";
import { updateData, deleteData } from "../../../api/api";
import Swal from 'sweetalert2';

const CountDownHandle = () => {
    const { endTime, setEndTime, setSelectedSeats, invoice, setInvoice } = useCurrentSeat();

    useEffect(() => {
        if (Date.now() >= endTime) {
            setSelectedSeats([]);
            setInvoice(null);
        }
    }, [endTime]);

    const handleTimeout = async () => {
        if (invoice) {
            try {
                const data = {
                    PaymentStatus: "Cancelled"
                }
                const response = await updateData(`/api/v1/invoice/${invoice.id}/update`, data);
                if (response.ok) {
                    const deleteInvoice = await deleteData(`/api/v1/invoice/${invoice.id}/delete`);
                    if (deleteInvoice) {
                        await Swal.fire({
                            text: 'Your current transaction has been canceled due to timeout. Please select your seats again and book your tickets!!',
                            icon: 'info',
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Okay',
                        });

                        return;
                    };
                } else {
                    console.error("Lỗi khi hủy hóa đơn");
                }
            } catch (error) {
                console.error("Lỗi kết nối API:", error);
            }
        };
        setEndTime(null);
        setSelectedSeats([]);
        setInvoice(null);
    };

    const renderer = ({ minutes, seconds }) => {
        return (
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
        );
    };

    return (
        <div className="countdown-box">
            <h5 className="title">
                <Countdown date={parseInt(endTime, 10)} onComplete={handleTimeout} renderer={renderer} />
            </h5>
        </div>
    );
};

export default CountDownHandle;