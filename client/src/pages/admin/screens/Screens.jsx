import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../api/api';

const Screens = () => {
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const res = await fetchData('/api/v1/theaters');
                setTheaters(res.data);
            } catch (error) {
                console.error('Error fetching theater data:', error);
            }
        };
        fetchTheaters();
    }, []);


    return (
        <>
            <h1 className="text-muted mb-3">SCREENS</h1>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-2">
                                <p className='.fs-3 fst-italic text-warning'>*Select theater</p>
                            </div>
                            <div className="row mt-3">
                                {theaters.map((theater, index) => (
                                    <div className="col-md-3 mb-4" key={index}>
                                        <div className="card border-primary border">
                                            <div className="card-body">
                                                <h5 className="card-title text-primary">{theater.name}</h5>
                                                <p className="card-text">ID: {theater.id}</p>
                                                <p className='card-text'>Address: {theater.address}</p>
                                                <div className='d-flex justify-content-between'>
                                                    <p className='card-text'>Screens: {theater.total_screens}</p>
                                                    <p className='card-text'>Seats: {theater.total_seats}</p>
                                                </div>
                                                <a href={`/admin/detail-screen/${theater.id}`} className="btn btn-primary btn-sm">View Details</a>
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
    );
}

export default Screens;