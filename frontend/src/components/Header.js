import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleHalfStroke,
    faBookBookmark,
    faPlus,
    faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../features/theme/themeSlice';
import { useEffect, useState } from 'react';
import { setUserStates } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apis } from '../helpers';


export default function Header() {
    const [screenSize, setScreenSize] = useState("");
    const [showModal, setShowModal] = useState(false);
    const mode = useSelector((state) => state.theme.isLight);
    const { email, error, loading, errorMessage, trigger } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [pages, setPages] = useState("");
    const [pdf, setPdf] = useState("");


    const uploadFile = async (receivedFile) => {
        const data = new FormData()
        data.append("file", receivedFile)
        data.append("upload_preset", "pdfPreset")
        try {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
            let resourceType = "auto"
            let cloudinaryAPI = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
            const response = await axios.post(cloudinaryAPI, data)
            const { secure_url } = response.data
            return secure_url
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                dispatch(setUserStates({ error: true, errorMessage: error.message }));
            } else if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 403)) {
                dispatch(setUserStates({ error: true, errorMessage: error.response.data.error.message }));
            } else if (error.response && error.response.status === 500) {
                dispatch(setUserStates({ error: true, errorMessage: "Server Error!!" }));
            } else {
                dispatch(setUserStates({ error: true, errorMessage: "Something went wrong" }));
            }
        }
    }



    // UPLOAD HANDLER
    const uploadHandler = async (e) => {
        e.preventDefault();
        dispatch(setUserStates({ loading: true }))
        if (!title || !writer || !pages || !pdf) {
            dispatch(setUserStates({ error: true, errorMessage: "Enter required fields." }));
            return;
        }
        try {
            const link = await uploadFile(pdf)
            const bookData = {
                email,
                title,
                writer,
                book_length: pages,
                link
            };
            const response = await axios.post(apis.others.uploadBook, bookData);
            const data = await response.data;
            dispatch(setUserStates({ error: true, errorMessage: data.message }));

            // RESET STATES
            setTitle("")
            setWriter("")
            setPages("")
            setPdf("")
            dispatch(setUserStates({ loading: false, trigger: true }))
        } catch (error) {
            dispatch(setUserStates({ loading: false, trigger: true }))
            if (error.code === "ERR_NETWORK") {
                dispatch(setUserStates({ error: true, errorMessage: error.message }));
            } else if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 403)) {
                dispatch(setUserStates({ error: true, errorMessage: error.response.data.message }));
            } else if (error.response && error.response.status === 500) {
                dispatch(setUserStates({ error: true, errorMessage: "Server Error!!" }));
            } else {
                dispatch(setUserStates({ error: true, errorMessage: "Something went wrong" }));
            }
        }
    };


    // HANDLE LOGOUT
    const handleLogout = () => {
        dispatch(setUserStates({ first_name: "", token: "", email: "" }));
        navigate("/login");
    };


    // HIDE ERROR ALERT AFTER FEW SECONDS
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setUserStates({error: false, errorMessage: ""}))
        }, 2000)
        return () => clearTimeout(timer)
    }, [error, dispatch])


    // SCREEN SIZE
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 576) {
                setScreenSize('sm'); // Small screens
            } else if (window.innerWidth < 768) {
                setScreenSize('md'); // Medium screens
            } else if (window.innerWidth < 992) {
                setScreenSize('lg'); // Large screens
            } else {
                setScreenSize('xl'); // Extra large screens
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [screenSize]);



    return (
        <div className={`header d-flex flex-md-column px-2 py-3 align-items-center ${screenSize === "md" || screenSize === "lg" || screenSize === "xl" ? "vh-100 justify-content-around" : "justify-content-between"}`}>
            <div className="logo item px-2 d-flex pt-md-3 mt-md-3" title="MyBookself">
                <FontAwesomeIcon icon={faBookBookmark} />
                <span className='mx-2 d-none d-md-block'>MyBookshelf</span>
            </div>
            <div title="Add Book" className='item px-2 d-flex pt-md-3 mt-md-3' onClick={() => setShowModal(!showModal)} >
                <FontAwesomeIcon icon={faPlus} />
                <span className='mx-3 d-none d-md-block'>Add Book</span>
            </div>
            <div title="toggle theme" className='item px-2 d-flex pt-md-3 mt-md-3' onClick={() => dispatch(changeTheme())}>
                <FontAwesomeIcon icon={faCircleHalfStroke} />
                <span className='mx-3 d-none d-md-block'>{mode ? "Dark mode" : "Light Mode"}</span>
            </div>
            <div title="Log out" className='item px-2 d-flex pt-md-3 mt-md-3' onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span className='mx-3 d-none d-md-block'>Log out</span>
            </div>

            {/* JSX FOR MODAL */}
            {showModal &&
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                        <div className="modal_additional modal-content">
                            <div className="modal-header">
                                {
                                    error ?
                                        <span className='alert alert-info w-75'>{errorMessage}</span> :
                                        <h5 className="modal-title">Upload Book</h5>
                                }
                                <button
                                    type="button"
                                    className="btn-close close_btn"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form className="form" onSubmit={uploadHandler}>
                                    <div className="form_input_container">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Book Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form_input_container">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Writers Name"
                                            value={writer}
                                            onChange={(e) => setWriter(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form_input_container">
                                        <input
                                            type="number"
                                            className="input"
                                            placeholder="Number of Pages"
                                            value={pages}
                                            onChange={(e) => setPages(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form_input_container">
                                        <input
                                            type="file"
                                            className="input"
                                            onChange={(e) => setPdf(e.target.files[0])}
                                            required
                                        />
                                    </div>
                                    <div className="form_input_container">
                                        <button
                                            type="submit"
                                            className={`input auth_btn ${loading && "disabled"}`}
                                        >
                                            {loading ? "Loading..." : "Upload Book"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
