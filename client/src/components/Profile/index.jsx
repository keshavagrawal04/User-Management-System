import { profileSrc } from '../../assets/images';

const Profile = ({ user, userDelete, setShow }) => {

    return (!user) ? (
        <></>
    ) : (
        <div className="container p-2">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-lg-5 col-md-8 col-sm-12 d-flex flex-column align-items-center p-xl-5 p-sm-4 pt-4">
                    <h2 className="pt-2">Profile</h2>
                    <div className="input-group mb-3 display-flex justify-content-center">
                        <img className="rounded-circle" src={user.profileImage} width="150px" height="150px" alt="profile" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Full Name</label>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" disabled className="form-control fs-6" value={user.fullName} aria-label="Full Name" aria-describedby="basic-addon1" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Email Address</label>
                    </div>
                    <div className="input-group mb-3">
                        <input type="email" disabled className="form-control fs-6" value={user.email} aria-label="Email Address" aria-describedby="basic-addon1" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Age</label>
                    </div>
                    <div className="input-group mb-3">
                        <input type="number" disabled className="form-control fs-6" value={user.age} aria-label="Age" aria-describedby="basic-addon1" required />
                    </div>
                    <div className="d-flex gap-3">
                        <button style={{ width: '150px' }} className="btn btn-success" onClick={() => setShow(true)}>
                            Edit Profile
                        </button>
                        <button style={{ width: '150px' }} className="btn btn-danger" onClick={() => userDelete(user.user_id, "Patient")}>
                            Delete Account
                        </button>
                    </div>
                </div>
                <div className="col-xl-5 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                    <img src={profileSrc} alt="login" width="100%" />
                </div>
            </div>
        </div >
    )
}

export default Profile;
