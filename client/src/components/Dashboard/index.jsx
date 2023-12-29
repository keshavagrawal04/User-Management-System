import React, { useState, useEffect, useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import { getUsersDataQuery, userDeleteQuery } from '../../services/Query';
import Profile from '../Profile';
import UserTable from '../UserTable';

function Dashboard() {
    const { isLoggedIn } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
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
            <UserTable users={users} userDelete={userDelete} setShow={setShow} setUser={setUser} />
            <Profile show={show} setShow={setShow} userUpdate={userUpdate} user={user} setUser={setUser} />
        </>
    );
}

export default Dashboard;
