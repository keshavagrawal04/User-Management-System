import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { resetPasswordQuery } from '../../services/Query';

const ResetPassword = () => {
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const { resetPasswordToken } = useParams();
    const navigate = useNavigate();

    const buttonHandler = async (e) => {
        e.preventDefault();
        let response = "";
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${resetPasswordToken}`
            }
        };
        try {
            if (password === confirmPassword) {
                response = await resetPasswordQuery({ password: password }, axiosConfig);
                navigate('/login');
                toast.success(response.data['message']);
            } else {
                toast.error("Password And Confirm Password Mismatch");
            }
        } catch (error) {
            navigate('/login');
            toast.error(error.response.data['message']);
        }
    }

    return (
        <>
            <div className="container mt-4 p-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-5 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                        <img src="https://res.cloudinary.com/di5uhy426/image/upload/v1704016525/dre67wynkhy1jaktx5pm.jpg" alt="signup" width="100%" />
                    </div>
                    <form id="add-form" className="col-xl-5 col-lg-5 col-md-8 col-sm-12 d-flex flex-column align-items-center p-xl-5 p-sm-4 pt-4" onSubmit={buttonHandler}>
                        <h2 className="pt-2">Reset Password</h2>
                        <h4 className="mb-5">Reset Your Password</h4>
                        <div className="input-group mb-3">
                            <input onChange={e => setPassword(e.target.value)} type="password" className="form-control fs-6 outline-none" placeholder="Enter New Password" aria-label="Password" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setConfirmPassword(e.target.value)} type="password" className="form-control fs-6 outline-none" placeholder="Confirm New Password" aria-label="Confirm Password" aria-describedby="basic-addon1" required />
                        </div>
                        <button style={{ width: "100%" }} className="btn btn-primary fs-6 p-2 mt-2 px-4" type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
