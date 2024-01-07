import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const UserTable = ({ setShow, setSelectedUser, users, userDelete }) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="container">
                <div className="row p-2 d-flex justify-content-center flex-row">
                    <div className="p-4 pb-0 col-lg-10 col-md-12 border rounded bg-dark">
                        <table className="table table-striped table-dark">
                            <caption className="text-white"></caption>
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col">Profile</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Email</th>
                                    <th className="text-center" scope="col">Edit</th>
                                    <th className="text-center" scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td className="text-center">
                                            <img alt="profile" src={user.profileImage} className="rounded-2" width="34px" height="34px" />
                                        </td>
                                        <td>{user._id}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.age}</td>
                                        <td>{user.email}</td>
                                        <td className="text-center"><Link className="edit text-center" onClick={(e) => { e.preventDefault(); setShow(true); setSelectedUser(user); }}><i id={user._id} className='fs-5 bx bxs-pencil border p-1 rounded bg-warning text-white'></i></Link></td>
                                        <td className="text-center"><Link className="delete" onClick={(e) => { e.preventDefault(); userDelete(user._id, "Admin") }}><i className='fs-5 bx bxs-trash border p-1 rounded bg-danger text-white'></i></Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserTable;
