import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/authContext';
import { getUsersDataQuery, userDeleteQuery, userUpdateQuery, getUserByIdQuery } from '../../services/Query';
import Swal from 'sweetalert2';
import { UserTable, ProfileUpdateModal, Profile } from '../index';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            toast.error('You Must Be Logged In');
        } else {
            // fetchData();
            getUserData();
        }
    }, [isLoggedIn, navigate]);

    const getUserData = async () => {
        setLoading(true);
        let response = "";
        let userId = localStorage.getItem('userId');
        let tokens = JSON.parse(localStorage.getItem('tokens'));
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${tokens.access}`
            }
        };
        try {
            response = await getUserByIdQuery(userId, axiosConfig);
            setUser(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

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

    const userDelete = async (userId, role = 'Admin') => {
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
                    await userDeleteQuery(userId, axiosConfig);
                    await Swal.fire({
                        title: "Deleted!",
                        text: "User Account has been deleted.",
                        icon: "success",
                        footer: 'Click OK To Redirect'
                    });
                    (role == 'Admin')
                        ? fetchData()
                        : navigate('/signup'); setIsLoggedIn(false);
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
            getUserData();
            fetchData();
        } catch (error) {
            toast.error(error.response.data['message']);
        }
    }

    return (loading)
        ? (
            <div className="container mt-5 d-flex justify-content-center">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-xl-5 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                        <Spinner
                            as="span"
                            animation="border"
                            size="xl"
                            role="status"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div >
        )
        : (
            <>
                {/* <UserTable setShow={setShow} setUser={setUser} users={users} userDelete={userDelete} /> */}
                <ProfileUpdateModal show={show} setShow={setShow} user={user} userUpdate={userUpdate} />
                <Profile user={user} userDelete={userDelete} setShow={setShow} />
            </>
        );
}

export default Dashboard;
