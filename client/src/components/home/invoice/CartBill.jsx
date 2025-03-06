import React, { useEffect, useState } from "react";
const CartBill = ({ selectedSeats, showtime, invoice, selectedService }) => {
    const [totalAmount, setAmount] = useState(0);
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
                        <div class="info"><span>{formatDateTime(invoice?.purchase_date)}</span> <span>{selectedSeats.map(seat => seat.seat_name).join(", ")}</span></div>
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
                                    <div key={product.id}>
                                        <span className="info">
                                            <span>{product.quantity} * {product.name}</span>
                                        </span>
                                    </div>
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
                <a href="#0" class="custom-button back-button">proceed</a>
            </div>
            <div class="note">
                <h5 class="title">Note :</h5>
                <p>Please give us 15 minutes for F& B preparation  once you're at the cinema</p>
            </div>
        </div>
    </>);
};

export default CartBill;