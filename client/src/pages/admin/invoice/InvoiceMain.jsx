import React, { useEffect, useState } from 'react';
import { fetchData, deleteData } from '../../../api/api';
const InvoiceMain = () => {
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const res = await fetchData('/api/v1/theaters');
                console.log(res);
                setTheaters(res.data);
            } catch (error) {
                console.error('Error fetching theater data:', error);
            }
        };
        fetchTheaters();
    }, []);

    return (
        <>
            <h1 className="text-muted mb-3">INVOICES</h1>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-2">
                                <p className='.fs-3 fst-italic text-danger'>*Select theater</p>
                            </div>
                            <div className="row mt-3">
                                {theaters.map((theater, index) => (
                                    <div className="col-md-3 mb-4" key={index}>
                                        <div className="card border-warning border">
                                            <div className="card-body">
                                                <h5 className="card-title text-warning">{theater.name}</h5>
                                                <p className="card-text">ID:{theater.id}</p>
                                                <p className='card-text'>Address: {theater.address}</p>
                                                <a href={`/admin/detail-invoice/${theater.id}`} class="btn btn-warning btn-sm text-white">Check Invoice</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoiceMain;