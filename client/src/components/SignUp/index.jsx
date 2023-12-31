import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { userRegisterQuery } from '../../services/Query';

function SignUp() {
    const [user, setUser] = useState({});

    let formData = new FormData();
    formData.append('fullName', user.name);
    formData.append('email', user.email);
    formData.append('age', user.age);
    formData.append('profileImage', user.profileImage);
    formData.append('contactNumber', user.contactNumber);
    formData.append('password', user.password);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        } catch (error) {
            toast.error(error.response.data['message']);
        }
    }

    return (
        <>
            <div><Toaster
                position="top-center"
                autoClose={1000}
                theme="dark"
            /></div>
            <div className="container mt-4 p-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-5 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                        <img src="./images/signup.jpg" alt="signup" width="100%" />
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
                            <input onChange={e => setUser({ ...user, password: e.target.value })} type="password" className="form-control fs-6" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, profileImage: e.target.files[0] })} type="file" className="form-control fs-6" id="inputGroupFile02" />
                        </div>
                        <button className="btn btn-primary fs-6 p-2 mt-2 px-4" type="submit">SignUp</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
