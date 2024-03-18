import { Link } from "react-router-dom";

export default function Intro(){
    return (
        <div className="intro_container">
            <div className="intro_container_inner">
                <h3 className="mt-5">Introducing "MyBookshelf"</h3>
                <h6 className="mb-4">Your Personalized Literary Haven</h6>
                <p>
                    Dive into your curated collection, uploading beloved books for anytime, anywhere reading. Picture a tranquil sanctuary where the world fades, and you immerse in favorite stories, comfortably ensconced. "MyBookshelf" simplifies management with intuitive features, offering seamless access to classics, contemporary favorites, or personal creations. Explore at will, whether on the go or in quiet moments, with customizable preferences and tailored recommendations enhancing your journey. Rediscover the joy of reading, kindle your passion for literature, and embrace a space where each page turned unveils new delights. Welcome to "MyBookshelf" – your ultimate literary escape.
                </p>
                <Link to="/login" className="link">Get Started</Link>
            </div>
        </div>
    )
}