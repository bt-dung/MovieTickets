import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import {
  mdiTheater, mdiPlusCircleOutline, mdiSquareEditOutline, mdiDeleteOutline
} from '@mdi/js';
import Swal from 'sweetalert2';
import { fetchData, deleteData } from '../../../api/api';
import { useUser } from '../../../context/UserContext';

const env = import.meta.env;
const BASE_URL_ADMIN = (env.VITE_BASE_URL_ADMIN);

const Theater = () => {
  const [theaters, setTheaters] = useState([]);
  const userCurrent = useUser();
  const roleCurrent = userCurrent.user?.role;

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

  const handleDeleteTheater = async (id) => {
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
      text: 'Do you really want to delete this theater?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (isConfirmed) {
      try {
        await deleteData(`/api/v1/theaters/${id}/delete`);
        Swal.fire({
          title: 'Deleted!',
          text: 'Theater deleted successfully.',
          icon: 'success',
        });
        window.location.reload();
      } catch (error) {
        console.error('Error deleting Theater:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete Theater.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <>
      <h1 className="text-muted mb-3">THEATERS</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="mb-2">
                <div className="col-sm-4">
                  <a href={`${BASE_URL_ADMIN}/add-theater`} className="btn btn-danger mb-2">
                    <Icon path={mdiPlusCircleOutline} size={1} /> Add Theater
                  </a>
                </div>
              </div>

              <div className="row">
                {theaters.map((theater, index) => (
                  <div className="col-md-3 mb-4" key={index}>
                    <div className="card">
                      <div className="card-img-top d-flex justify-content-center align-items-center bg-light" style={{ height: '150px' }}>
                        <Icon path={mdiTheater} size={4} />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-primary">{theater.name}</h5>
                        <p className="card-text">{theater.address}</p>
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <a
                              href={`/admin/detail-theater/${theater.id}`}
                              className="btn btn-primary"
                              role="button"
                              aria-label={`Learn more about ${theater.name}`}>
                              Detail more
                            </a>
                          </div>
                          <div class="d-flex gap-2">
                            <a href={`/admin/edit-theater/${theater.id}`} className="action-icon">
                              <Icon path={mdiSquareEditOutline} size={1} />
                            </a>
                            <a href="javascript:void(0);" className="action-icon" onClick={() => handleDeleteTheater(theater.id)}>
                              <Icon path={mdiDeleteOutline} size={1} />
                            </a>
                          </div>
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

export default Theater;
