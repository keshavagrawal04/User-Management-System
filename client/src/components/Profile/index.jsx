import { useState } from 'react';
import { Modal, Button, Form, Col, Image } from 'react-bootstrap';
import { FaCamera } from "react-icons/fa";

const Profile = ({ show, setShow, user, userUpdate }) => {
    const [filePath, setFilePath] = useState(user?.profileImage);
    const [payload, setPayload] = useState({});

    const handleClose = () => {
        setShow(false);
        setFilePath(user.profileImage);
    };

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
                                <Image className="text-center" width="200px" height="200px" src={filePath ?? user?.profileImage} roundedCircle />
                                <label htmlFor="upload">
                                    <FaCamera size={30} />
                                </label>
                                <input src={filePath} type="file" id="upload" style={{ visibility: 'hidden', width: '1px', height: '1px' }} onChange={(e) => { e.preventDefault(); setFilePath(URL.createObjectURL(e.target.files[0])); setPayload({ ...payload, profileImage: e.target.files[0] }) }} />
                            </Col>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={user?.email}
                                disabled
                            />
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={user?.fullName}
                                onChange={e => setPayload({ ...payload, fullName: e.target.value })}
                            />
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={user?.age}
                                onChange={e => setPayload({ ...payload, age: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ width: '150px' }} variant="primary" onClick={() => { setShow(false); userUpdate(payload); }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Profile;
