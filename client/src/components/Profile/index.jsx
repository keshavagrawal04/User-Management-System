import { useState } from 'react';
import { Modal, Button, Form, Col, Image } from 'react-bootstrap';
import { FaCamera } from "react-icons/fa";

const Profile = ({ show, setShow, userUpdate, user, setUser }) => {
    const handleClose = () => setShow(false);
    const [file, setFile] = useState(user?.profileImage);
    console.log(file, user?.profileImage);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>User Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Col className="d-flex justify-content-center" md={12}>
                                <Image className="text-center" width="200px" height="200px" src={file??user?.profileImage} roundedCircle />
                                <label for="upload">
                                    <FaCamera size={30} />
                                </label>
                                <input src={file} type="file" id="upload" style={{ visibility: 'hidden', width: '1px', height: '1px' }} onChange={(e) => {e.preventDefault(); setFile(URL.createObjectURL(e.target.files[0])); setUser({ ...user, profileImage: e.target.files[0] }) }} />
                            </Col>
                            <Form.Label>User Id</Form.Label>
                            <Form.Control
                                type="text"
                                value={user?._id}
                                disabled
                            />
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={user?.email}
                                disabled
                            />
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={user?.fullName}
                            />
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                value={user?.age}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { setShow(false); userUpdate(); }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Profile;
