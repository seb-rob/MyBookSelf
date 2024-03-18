import { Outlet } from "react-router-dom";
import Header from "../components/Header";


export default function Home() {
    return(
        <div className="home">
            <div className="row">
                <div className="col-sm-2">
                    <Header />
                </div>
                <div className="col-sm">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}