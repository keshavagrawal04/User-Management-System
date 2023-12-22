import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../AuthContext/authContext';

function Navbar() {
    let { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const Logout = (e) => {
        setIsLoggedIn(false);
        toast.success("User Logged Out Successfully");
        localStorage.clear();
    }
    return (
        <>
            <div><Toaster
                position="top-center"
                autoClose={1000}
                theme="dark"
            /></div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-lg-5 px-md-5 px-sm-2">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">UserManagement</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex gap-2">
                            <Link to="/signup" id="sign-in" className="btn btn-outline-warning my-2 my-sm-0">Sign Up</Link>
                            {isLoggedIn
                                ? (<Link to="/login" onClick={Logout} className="btn btn-outline-success my-2 my-sm-0">Logout</Link>)
                                : (<Link to="/login" className="btn btn-outline-success my-2 my-sm-0">Login</Link>)
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;