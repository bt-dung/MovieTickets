import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const CartBill = ({ selectedSeats, showtime, selectedService, setSelectedService, totalAmount, setAmount }) => {
    const navigate = useNavigate();
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = { day: '2-digit', month: 'short', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleString('en-US', options).replace(',', '').toUpperCase();
    };
    useEffect(() => {
        const totalSeatsPrice = selectedSeats.reduce((total, seat) => total + Number(seat.seat_price), 0);
        const totalProductsPrice = Object.keys(selectedService).reduce((total, category) => {
            return total + selectedService[category].reduce((categoryTotal, product) => categoryTotal + product.total_price, 0);
        }, 0);

        const newTotalAmount = totalSeatsPrice + totalProductsPrice;
        setAmount(newTotalAmount);
    }, [selectedSeats, selectedService]);
    const handleDelete = (productId, category) => {
        setSelectedService((prev) => {
            if (!prev[category]) return prev;

            const updatedCategory = prev[category].filter(product => product.id !== productId);

            if (updatedCategory.length === 0) {
                const { [category]: _, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [category]: updatedCategory,
            };
        });
    };
    const onClickBookedSeat = async (e) => {
        e.preventDefault();
        if (selectedSeats.length === 0) {
            Swal.fire({
                text: 'Please select a seat before proceeding to the next step.',
                icon: 'warning',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Okay',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/starcinema/home");
                }
            });

            return;
        }
        const showtimeId = showtime?.id ?? '';
        navigate(`/starcinema/final-invoice/${showtimeId}`);
    };
    return (<>
        <div class="col-lg-4">
            <div class="booking-summery bg-one">
                <h4 className="title">booking summery</h4>
                <ul>
                    <li>
                        <h6 class="subtitle">Movie: {showtime?.movie?.title}</h6>
                        <span class="info">English-2d</span>
                    </li>
                    <li>
                        <h6 class="subtitle"><span>Number of seats</span><span>{selectedSeats?.length}</span></h6>
                        <div class="info"><span>{formatDateTime(Date.now())}</span> <span>{selectedSeats.map(seat => seat.seat_name).join(", ")}</span></div>
                    </li>
                    <li>
                        <h6 class="subtitle mb-0"><span>Tickets  Price</span><span>{selectedSeats.reduce((total, seat) => total + Number(seat.seat_price), 0).toLocaleString()}Đ</span></h6>
                    </li>
                </ul>
                <ul className="side-shape">
                    {Object.keys(selectedService).length === 0 ? (
                        <li>
                            <span>No products</span>
                        </li>
                    ) : (
                        Object.keys(selectedService).map((category) => (
                            <li key={category}>
                                <h6 className="subtitle">
                                    <span>{category}</span>
                                    <span>{selectedService[category].reduce((total, product) => total + product.total_price, 0).toLocaleString()} Đ</span>
                                </h6>
                                {selectedService[category].map((product) => (
                                    <span className="info">
                                        <span>{product.quantity} * {product.name}</span>
                                        <span className="delete-icon" onClick={() => handleDelete(product.id, category)}>x</span>
                                    </span>
                                ))}
                            </li>
                        ))
                    )}
                </ul>


                <ul>
                    <li>
                        <span class="info"><span>price</span><span>{Number(totalAmount).toLocaleString()} Đ</span></span>
                        <span class="info"><span>vat</span><span>15%</span></span>
                    </li>
                </ul>
            </div>
            <div class="proceed-area  text-center">
                <h6 class="subtitle"><span>Amount Payable</span><span>{Number(totalAmount * 115 / 100).toLocaleString()} Đ</span></h6>
                <div className="custom-button" onClick={onClickBookedSeat}>proceed</div>
            </div>
            <div class="note">
                <h5 class="title">Note :</h5>
                <p>Please give us 15 minutes for F& B preparation  once you're at the cinema</p>
            </div>
        </div>
    </>);
};

export default CartBill;