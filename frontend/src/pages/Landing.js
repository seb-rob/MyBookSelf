import { Outlet } from "react-router-dom";

const Landing = () => {
    return (
        <div className="landing_page">
            <div className="landing_page_container">
                <Outlet />
            </div>
        </div>
    )
}

export default Landing;