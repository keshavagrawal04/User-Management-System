import { homeSrc } from '../../assets/images';

const Home = () => {
    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-xl-5 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                    <img src={homeSrc} alt="home" width="100%" />
                </div>
            </div>
        </div >
    );
}

export default Home;
