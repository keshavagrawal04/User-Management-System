import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/authContext';
import Swal from 'sweetalert2'
import { getUsersDataQuery, userDeleteQuery } from '../../services/Query';

function Dashboard() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    let tokens;
    let i = 0;

    useEffect(() => {
        if (!isLoggedIn) {
            if (i === 0) {
                toast.error('You Must Be Logged In');
                navigate('/login');
                i++;
            }
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        let response = "";
        tokens = JSON.parse(localStorage.getItem('tokens'));
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${tokens.access}`
            }
        };
        try {
            console.log()
            response = await getUsersDataQuery(axiosConfig);
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const userUpdate = async (e) => {
        e.preventDefault();
    }

    const userDelete = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                tokens = JSON.parse(localStorage.getItem('tokens'));
                const axiosConfig = {
                    headers: {
                        'Authorization': `Bearer ${tokens.access}`
                    }
                };
                try {
                    await userDeleteQuery(e.target.id, axiosConfig);
                    Swal.fire({
                        title: "Deleted!",
                        text: "User data has been deleted.",
                        icon: "success"
                    });
                    fetchData();
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: error.response.data['message'],
                        icon: "warning"
                    });
                }
            }
        });
    }

    return (
        <>
            <div><Toaster
                position="top-center"
                autoClose={1000}
                theme="dark"
            /></div>
            <div className="container">
                <div className="row p-2 d-flex justify-content-center flex-row">
                    <div className="p-4 pb-0 col-lg-10 col-md-12 border rounded bg-dark" style={{ maxHeight: 265, overflow: 'auto' }}>
                        <table className="table table-striped table-dark">
                            <caption className="text-white"></caption>
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col">Profile</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Email</th>
                                    <th className="text-center" scope="col">Edit</th>
                                    <th className="text-center" scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td className="text-center">
                                            <img alt="profile" src={user.profileImage} className="rounded-2" width="34px" height="34px" />
                                        </td>
                                        <td>{user._id}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.age}</td>
                                        <td>{user.email}</td>
                                        <td className="text-center"><Link to="#" className="edit text-center" onClick={userUpdate}><i id={user._id} className='fs-5 bx bxs-pencil border p-1 rounded bg-warning text-white'></i></Link></td>
                                        <td className="text-center"><Link to="#" className="delete" onClick={userDelete}><i id={user._id} className='fs-5 bx bxs-trash border p-1 rounded bg-danger text-white'></i></Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
