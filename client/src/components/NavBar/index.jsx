import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { AuthContext } from '../AuthContext/authContext';
import { avatarSrc } from '../../assets/images';

const NavBar = () => {
    let { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const Logout = () => {
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
                    <Nav>
                        <Link to="/dashboard" className="btn btn-outline-warning" style={{ width: '120px' }}>Dashboard</Link>
                    </Nav>
                    <Nav className="d-flex gap-2 ms-auto">
                        <Link to="/signup" id="sign-in" className="btn btn-outline-warning">Sign Up</Link>
                        {isLoggedIn
                            ? (<Link to="/login" onClick={Logout} className="btn btn-outline-success my-2 my-sm-0">Logout</Link>)
                            : (<Link to="/login" className="btn btn-outline-success my-2 my-sm-0">Login</Link>)
                        }
                        <Image width="42px" height="42px" src={avatarSrc} roundedCircle />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;