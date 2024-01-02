import { pageNotFoundSrc } from "../../assets/images";

const PageNotFound = () => {
    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="row d-flex justify-content-center mt-2">
                <div className="col-xl-4 col-lg-5 mt-lg-5 mt-xl-0 col-md-8 col-sm-12">
                    <img src={pageNotFoundSrc} alt="home" width="100%" />
                    <h1 style={{fontWeight: '800'}} className="text-center">PAGE NOT FOUND</h1>
                </div>
            </div>
        </div >
    );
};

export default PageNotFound;
