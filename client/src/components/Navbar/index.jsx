import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Navbar, Nav } from 'react-bootstrap';
import { AuthContext } from '../AuthContext/authContext';

const NavBar = () => {
    let { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const Logout = (e) => {
        setIsLoggedIn(false);
        toast.success("User Logged Out Successfully");
        localStorage.clear();
    }
    
    return (
        <>
            <Toaster
                position="top-center"
                autoClose={1000}
                theme="dark"
            />
            <Navbar className="px-4" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>
                    <Link className="navbar-brand" to="/">UserManagement</Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className="p-2">
                    <Nav className="d-flex gap-2 ms-auto">
                        <Link to="/signup" id="sign-in" className="btn btn-outline-warning">Sign Up</Link>
                        {isLoggedIn
                            ? (<Link to="/login" onClick={Logout} className="btn btn-outline-success my-2 my-sm-0">Logout</Link>)
                            : (<Link to="/login" className="btn btn-outline-success my-2 my-sm-0">Login</Link>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;