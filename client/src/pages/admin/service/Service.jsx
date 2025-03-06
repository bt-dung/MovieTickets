import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import {
  mdiTheater, mdiPlusCircleOutline, mdiSquareEditOutline, mdiDeleteOutline
} from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../../api/api';
import { useUser } from '../../../context/UserContext';

const env = import.meta.env;
const BASE_URL_ADMIN = (env.VITE_BASE_URL_ADMIN);

const Service = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const userCurrent = useUser();
  const roleCurrent = userCurrent.user?.role;

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetchData('/api/v1/services');
        console.log(res);
        setServices(res);
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };
    fetchService();
  }, [navigate]);

  const handleDeleteService = async (id) => {
    if (roleCurrent !== 'admin_role') {
      Swal.fire({
        title: 'Error!',
        text: 'You cannot perform this operation!!',
        icon: 'error',
      });
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this service?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (isConfirmed) {
      try {
        await deleteData(`/api/v1/service/${id}/delete`);
        Swal.fire({
          title: 'Deleted!',
          text: 'Service deleted successfully.',
          icon: 'success',
        });
        window.location.reload();
      } catch (error) {
        console.error('Error deleting service:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete service.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <>
      <h1 className="text-muted mb-3">SERVICES</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <div className="col-sm-4">
                  <a href={`${BASE_URL_ADMIN}/add-service`} className="btn btn-danger mb-2">
                    <Icon path={mdiPlusCircleOutline} size={1} /> Add Service
                  </a>
                </div>
              </div>

              <div className="row">
                {services.map((service, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <div className="card h-100 container">
                      <div className="row no-gutters align-items-center">
                        <div className="col-md-4">
                          <img src={service.img} className="card-img h-100 object-fit-contain" alt="..." />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <h5 className="card-title text-body">{service.name}</h5>
                            <p className="card-text">Category: {service.category}</p>
                            <p className="card-text">Inventory: {service.inventory}</p>
                            <p className="card-text text-truncate " style={{ height: '20px' }}>{service.description}</p>
                            <p className="card-text"><small class="text-muted">Price: {service.price} </small></p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex flex-column justify-content-between">
                          <a href={`/admin/edit-service/${service.id}`} className="action-icon mb-3">
                            <Icon path={mdiSquareEditOutline} size={1} />
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="action-icon"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Icon path={mdiDeleteOutline} size={1} />
                          </a>
                        </div>
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
};


export default Service;