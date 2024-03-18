import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserStates } from '../features/user/userSlice';
import axios from 'axios';
import { apis } from '../helpers';
import { useEffect } from 'react';


export default function SingleBook(props) {
    const { id, title, writer, link } = props.book
    const { email, error, errorMessage, trigger } = useSelector(state => state.user)
    const dispatch = useDispatch()


    // EDIT BOOK HANDLER
    const handleEdit = async (e, receivedId) => {
        if (!receivedId) {
            dispatch(setUserStates({error: true, errorMessage: "Something went wrong! Id missing."}))
        }
        try {
            dispatch(setUserStates({error: true, errorMessage: "functionality currently not available!"}))
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



    // DELETE BOOK HANDLER
    const handleDelete = async (receivedId) => {
        if (!receivedId) {
            dispatch(setUserStates({error: true, errorMessage: "Something went wrong! Id missing."}))
        }
        try {
            const url = apis.others.deleteBook.replace(":book_id", receivedId)
            const response = await axios.put(`${url}?email=${email}`)
            console.log(response)
            if (response.data) {
                dispatch(setUserStates({trigger: true}))
            }
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

    // HIDE ERROR ALERT AFTER FEW SECONDS
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setUserStates({error: false, errorMessage: ""}))
        }, 2000)
        return () => clearTimeout(timer)
    }, [error, dispatch])


    return (
        <div className="custom_card_container">
            <div className="custome_card_container_content">
                <div className="book_image">
                    <img src={ props.book.image } alt="image" className="img-fluid w-100" />
                </div>
                <div className="book_title">
                    <figure>
                        <blockquote class="blockquote">
                            <p>{ title }</p>
                        </blockquote>
                        <figcaption class="blockquote-footer">
                            { writer }
                        </figcaption>
                    </figure>
                </div>
                <div className="row">
                    <p className="col-4 action_item" title='Read'>
                        <Link to={`/read/${id}`} className='action_item_link'>
                            <FontAwesomeIcon icon={faBookOpenReader} />
                        </Link>
                    </p>
                    <p className="col-4 action_item" title='Edit' onClick={() => handleEdit(id)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </p>
                    <p className="col-4 action_item" title='Delete' onClick={() => handleDelete(id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </p>
                </div>
            </div>
        </div>
    )
}