import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { userRegisterQuery } from '../../services/Query';
import Spinner from 'react-bootstrap/Spinner';
import { signUpSrc } from '../../assets/images';

const SignUp = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let formData = new FormData();
    formData.append('fullName', user.name);
    formData.append('email', user.email);
    formData.append('age', user.age);
    formData.append('profileImage', user.profileImage);
    formData.append('contactNumber', user.contactNumber);
    formData.append('password', user.password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = document.querySelector('#add-form');
        form.reset();
        const axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        let response = "";
        try {
            response = await userRegisterQuery(formData, axiosConfig);
            toast.success(response.data['message']);
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            if (error?.response) {
                return toast.error(error.response.data['message']);
            }
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="container mt-4 p-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-5 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                        <img src={signUpSrc} alt="signUp" width="100%" />
                    </div>
                    <form id="add-form" className="col-xl-5 col-lg-5 col-md-8 col-sm-12 d-flex flex-column align-items-center p-xl-5 pt-xl-0 p-sm-4 pt-4" onSubmit={handleSubmit}>
                        <h2 className="pt-2">Sign Up</h2>
                        <h4 className="mb-5">Create Your Account</h4>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, name: e.target.value })} type="text" className="form-control fs-6 outline-none" placeholder="Full Name" aria-label="Full Name" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, email: e.target.value })} type="email" className="form-control fs-6" placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, contactNumber: e.target.value })} type="contactNumber" className="form-control fs-6" placeholder="Contact Number" aria-label="Contact Number" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, age: e.target.value })} type="number" className="form-control fs-6" placeholder="Age" aria-label="Age" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, password: e.target.value })} type="password" className="form-control fs-6" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required autoComplete='auto' />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, profileImage: e.target.files[0] })} type="file" className="form-control fs-6" id="inputGroupFile02" required />
                        </div>
                        <button className="btn btn-primary fs-6 p-2 mt-2 px-4" type="submit">
                            {loading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                'SignUp'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
