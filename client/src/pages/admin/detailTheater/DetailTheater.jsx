import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import "./DetailTheater.css";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "@mdi/react";
import {
    mdiArrowLeft,
    mdiSquareEditOutline,
    mdiDeleteOutline,
} from "@mdi/js";

const DetailTheater = () => {
    const [movies, setMovies] = useState([]);
    const { theaterId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [totalScreens, setTotalScreens] = useState(0);
    const [totalSeats, setTotalSeats] = useState(0);

    useEffect(() => {
        const getTheater = async () => {
            try {
                const res = await fetchData(`/api/v1/theaters/${theaterId}`);
                setName(res.name);
                setAddress(res.address);
                setTotalScreens(res.total_screens);
                setTotalSeats(res.total_seats);

                // const datatheater = await fetchData(`api/v1/theaters`)
            } catch (error) {
                console.error("Error fetching theater data:", error);
            }
        };
        getTheater();
    }, [theaterId]);

    return (
        <>  <div className="d-flex w-100 ">
            <div
                type="button"
                className="btn mr-3"
                onClick={() => navigate(-1)}
            >
                <Icon path={mdiArrowLeft} size={2} />
            </div>
            <h1 className="text-muted mb-3">Theater Details</h1>
        </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="clearfix">
                                <div className="float-left mb-3">
                                    <h1 className="text-purple-400 font-weight-bold">{name}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2">
                                    <p className="text-primary">Address</p>
                                    <p className="text-primary">Total Seats</p>
                                    <p className="text-primary">Total Screens</p>
                                </div>

                                <div className="col-sm-2">
                                    <p>: {address}</p>
                                    <p>: {totalScreens}</p>
                                    <p>: {totalSeats}</p>
                                </div>
                            </div>

                            <div className="p-2 bg-light border rounded mt-5">
                                <h2 className="text-muted mb-3 ">Movies Showing</h2>
                                <div className="table-responsive">
                                    <table
                                        className="table table-centered table-striped dt-responsive nowrap w-100"
                                        id="products-datatable"
                                    >
                                        <thead>
                                            <tr>
                                                <th style={{ width: "20px" }}></th>
                                                <th style={{ width: "100px" }}>ID</th>
                                                <th style={{ width: "400px" }}>Movie Name</th>
                                                <th>Release Date</th>
                                                <th>*Rate</th>
                                                <th>Poster</th>
                                                <th style={{ width: "20px" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {movies.length > 0 ? (
                                                movies.map((movie, index) => (
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
                                                                {movie.id}
                                                            </a>
                                                        </td>
                                                        <td>{movie.title}</td>
                                                        <td>{movie.release_date}</td>
                                                        <td>{movie.vote_average}</td>
                                                        <td><img src={movie.img_poster} width={100} /></td>
                                                        <td>
                                                            <a href="" className="action-icon">
                                                                <Icon path={mdiSquareEditOutline} size={1} />
                                                            </a>
                                                            <a href="" className="action-icon">
                                                                <Icon path={mdiDeleteOutline} size={1} />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">
                                                        No users found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailTheater;
