import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "@mdi/react";
import {
    mdiSquareEditOutline,
    mdiDeleteOutline,
    mdiCalendarRange,
    mdiArrowLeft
} from "@mdi/js";
import Swal from "sweetalert2";
import { deleteData, fetchData } from "../../../api/api";

const Invoices = () => {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const { theaterId } = useParams();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchShowtime = async (page = 0) => {
            try {
                console.log("date::", selectedDate);
                const invoiceData = await fetchData(`/api/v1/invoices/${theaterId}/${selectedDate}?pageNumber=${page}&limit=8`);
                console.log(invoiceData);
                setInvoices(invoiceData.data);
                setTotalPages(invoiceData.totalPages);
            } catch (error) {
                console.log("Error fetching invoices:", error);
            }
        };
        fetchShowtime(currentPage);
    }, [currentPage, theaterId, selectedDate]);
    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDeleteInvoice = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this invoice?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (isConfirmed) {
            try {
                await deleteData(`/api/v1/invoice/${id}/delete`);
                Swal.fire({
                    title: "Deleted!",
                    text: "Invoice deleted successfully.",
                    icon: "success",
                });
                const invoiceData = await fetchData(
                    `/api/v1/invoices/${theaterId}/${selectedDate}?pageNumber=${currentPage}&limit=8`
                );
                setInvoices(invoiceData.data);
                setTotalPages(showtimes.totalPages);
            } catch (error) {
                console.error("Error deleting Invoice:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete invoice.",
                    icon: "error",
                });
            }
        }
    };

    return (
        <>
            <div className="d-flex w-100 ">
                <div type="button"
                    className="btn mr-3 "
                    onClick={() => navigate(-1)}
                >
                    <Icon path={mdiArrowLeft} size={2} />
                </div>
                <h1 className="text-muted mb-3" > Invoice</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col d-flex justify-content-between align-items-center">
                                    <div className="form-group mb-0">
                                        <div className="input-group rounded">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => { setSelectedDate(date) }}
                                                className="form-control"
                                                dateFormat="yyyy/MM/dd"
                                            />
                                            <span
                                                className="input-group-text bg-primary border-primary text-white"
                                            >
                                                <i className="font-13">
                                                    <Icon path={mdiCalendarRange} size={1} />
                                                </i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="table-responsive">
                                <table
                                    className="table table-centered table-striped dt-responsive nowrap w-100"
                                    id="products-datatable"
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20px" }}></th>
                                            <th>ID</th>
                                            <th>User ID</th>
                                            <th>Purchase Date</th>
                                            <th>Total Amount</th>
                                            <th>Payment Status</th>
                                            <th className="row" style={{ width: "50px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoices.length > 0 ? (
                                            invoices.map((invoice, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id={`customCheck${index}`}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor={`customCheck${index}`}
                                                            >
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="text-body font-weight-semibold"
                                                        >
                                                            {invoice.id}
                                                        </a>
                                                    </td>
                                                    <td>{invoice.user_id}</td>
                                                    <td>{invoice.purchase_date}</td>
                                                    <td>{invoice.TotalAmount}</td>
                                                    <td><span className={
                                                        invoice.PaymentStatus === "Paid" ? "badge bg-success" :
                                                            invoice.PaymentStatus === "Pending" ? "badge bg-warning text-dark" :
                                                                invoice.PaymentStatus === "Cancelled" ? "badge bg-danger" : "badge bg-secondary"
                                                    }>
                                                        {invoice.PaymentStatus}
                                                    </span></td>
                                                    <td>
                                                        <a href={`/admin/edit-invoice/${invoice.id}`} className="action-icon">
                                                            <Icon path={mdiSquareEditOutline} size={1} />
                                                        </a>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="action-icon"
                                                            onClick={() => handleDeleteInvoice(invoice.id)}
                                                        >
                                                            <Icon path={mdiDeleteOutline} size={1} />
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    No invoice today.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <nav className="d-flex justify-content-center">
                                <ul className="pagination">
                                    <li
                                        className={`page-item ${currentPage === 0 ? "disabled" : ""
                                            }`}
                                    >
                                        <a
                                            className="page-link"
                                            href="javascript:void(0);"
                                            aria-label="Previous"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${currentPage === index ? "active" : ""
                                                }`}
                                        >
                                            <a
                                                className="page-link"
                                                href="javascript:void(0);"
                                                onClick={() => handlePageChange(index)}
                                            >
                                                {index + 1}
                                            </a>
                                        </li>
                                    ))}
                                    <li
                                        className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""
                                            }`}
                                    >
                                        <a
                                            className="page-link"
                                            href="javascript:void(0);"
                                            aria-label="Next"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        >
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Invoices;
