import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/authContext';
import { getUsersDataQuery, userDeleteQuery, userUpdateQuery } from '../../services/Query';
import Swal from 'sweetalert2';
import { UserTable, ProfileUpdateModal } from '../index';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            toast.error('You Must Be Logged In');
        } else {
            fetchData();
        }
    }, [isLoggedIn, navigate]);

    const fetchData = async () => {
        let response = "";
        let tokens = JSON.parse(localStorage.getItem('tokens'));
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${tokens.access}`
            }
        };
        try {
            response = await getUsersDataQuery(axiosConfig);
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
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
                let tokens = JSON.parse(localStorage.getItem('tokens'));
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

    const userUpdate = async (payload) => {
        const { fullName, age, profileImage } = payload;

        let formData = new FormData();

        if (fullName) formData.append('fullName', fullName);
        if (age) formData.append('age', age);
        if (profileImage) formData.append('profileImage', profileImage);

        let response = "";
        let tokens = JSON.parse(localStorage.getItem('tokens'));
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${tokens.access}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        try {
            response = await userUpdateQuery(user._id, formData, axiosConfig);
            toast.success(response.data['message']);
            fetchData();
        } catch (error) {
            toast.error(error.response.data['message']);
        }
    }

    return (
        <>
            <UserTable setShow={setShow} setUser={setUser} users={users} userDelete={userDelete} />
            <ProfileUpdateModal show={show} setShow={setShow} user={user} userUpdate={userUpdate} />
        </>
    );
}

export default Dashboard;
