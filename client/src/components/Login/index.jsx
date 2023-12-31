import { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userLoginQuery } from '../../services/Query';
import { AuthContext } from '../AuthContext/authContext';
import { Link } from 'react-router-dom';

function Login() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let response = "";
        try {
            response = await userLoginQuery({
                email: user.email,
                password: user.password
            });
            setIsLoggedIn(true);
            toast.success(response.data['message']);
            let tokens = JSON.stringify(response.data['tokens']);
            let userId = response.data['userId'];
            localStorage.setItem('tokens', tokens);
            localStorage.setItem('userId', userId);
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (error) {
            toast.error(error.response.data['message']);
        }
    }

    return (
        <>
            <div className="container mt-4 p-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-5 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                        <img src="https://res.cloudinary.com/di5uhy426/image/upload/v1704016525/vnwrpxfr6gyv9ovkcrla.jpg" alt="login" width="100%" />
                    </div>
                    <form className="col-xl-5 col-lg-5 col-md-8 col-sm-12 d-flex flex-column align-items-center p-xl-5 p-sm-4 pt-4" onSubmit={handleLogin}>
                        <h2 className="pt-2">Login</h2>
                        <h4 className="mb-5">Login In Your Account</h4>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, email: e.target.value })} type="email" className="form-control fs-6" placeholder="Email Address" aria-label="Email Adress" aria-describedby="basic-addon1" required />
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={e => setUser({ ...user, password: e.target.value })} type="password" className="form-control fs-6" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required autoComplete='auto' />
                        </div>
                        <div className="input-group text-right">
                            <Link to="/forgot-password" className="text-decoration-none text-black">Forgot Password ?</Link>
                        </div>
                        <button className="btn btn-primary fs-6 p-2 mt-2 px-4" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
