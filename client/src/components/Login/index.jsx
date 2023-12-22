import { useState, useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext/authContext';

function Login() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const [user, checkUser] = useState();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let response = "";
        try {
            response = await axios.post("http://localhost:8000/api/user/login", {
                email: user.email,
                password: user.password
            })
            setIsLoggedIn(true);
            toast.success(response.data['message']);
            let tokens = JSON.stringify(response.data['tokens'])
            localStorage.setItem('tokens', tokens)
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
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
            <div className="container mt-5 p-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-5 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                        <img src="./images/login.jpg" alt="signup" width="100%" />
                    </div>
                    <form className="col-xl-5 col-lg-5 col-md-8 col-sm-12 d-flex flex-column align-items-center p-xl-5 p-sm-4 pt-4" onSubmit={handleLogin}>
                        <h2 className="pt-2">Login</h2>
                        <h4 className="mb-5">Login In Your Account</h4>
                        <div className="input-group mb-3">
                            <input onChange={e => checkUser({ ...user, email: e.target.value })} type="email" className="form-control fs-6" placeholder="Email Address" aria-label="Email Adress" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => checkUser({ ...user, password: e.target.value })} type="password" className="form-control fs-6" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required />
                        </div>
                        <button className="btn btn-primary fs-6 p-2 mt-2 px-4" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
