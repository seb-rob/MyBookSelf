import { Link } from "react-router-dom";

export default function Invalid(){
    return (
        <div>
            <h1 className="mt-5">Requested Page Not Found</h1>
            <Link to="/" className="link">Go to Home</Link>
        </div>
    )
}