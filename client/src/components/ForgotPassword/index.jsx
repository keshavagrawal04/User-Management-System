import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { forgotPasswordQuery } from '../../services/Query';

const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const [alert, setAlert] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const buttonHandler = async (e) => {
        e.preventDefault();
        let response = "";
        try {
            response = await forgotPasswordQuery({ email: email });
            setAlert({ message: response.data['message'], variant: "success" });
            setShowAlert(true);
        } catch (error) {
            if (error?.response) {
                setShowAlert(true);
                return setAlert({ message: error?.response?.data['message'], variant: "warning" });
            }
            setShowAlert(true);
            setAlert({ message: error.message, variant: "warning" });
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
                        <h2 className="pt-2">Forgot Password</h2>
                        <h4 className="mb-5">Retrieve Your Password</h4>
                        <div className="input-group mb-3">
                            <input onChange={e => setEmail(e.target.value)} type="email" className="form-control fs-6 outline-none" placeholder="Enter Your Email Address" aria-label="Full Name" aria-describedby="basic-addon1" required />
                        </div>
                        {showAlert && (
                            <Alert className="w-100" variant={alert.variant} onClose={() => setShowAlert(false)} dismissible>
                                {alert.message}
                            </Alert>
                        )}
                        <button style={{ width: "100%" }} className="btn btn-primary fs-6 p-2 mt-2 px-4" type="submit">Send Verification Email</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
