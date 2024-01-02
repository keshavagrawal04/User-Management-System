import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { AuthContext } from '../AuthContext/authContext';
import { logoSrc } from '../../assets/images';

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
                    <Link className="navbar-brand" to="/">
                        <Image src={logoSrc} alt="logo" width={48} />
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex flex-row mb-2 mb-xl-0 mb-lg-0">
                        <Link to="/dashboard" className="btn btn-info">Dashboard</Link>
                    </Nav>
                    <Nav className="d-flex flex-row gap-2 ms-auto">
                        <Link to="/signup" id="sign-in" className="btn btn-warning">Sign Up</Link>
                        {isLoggedIn
                            ? (<Link to="/login" onClick={Logout} className="btn btn-success">Logout</Link>)
                            : (<Link to="/login" className="btn btn-success">Login</Link>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;