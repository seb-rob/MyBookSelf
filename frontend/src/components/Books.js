import { useEffect, useState } from "react";
import SingleBook from "./SingleBook";
import { useDispatch, useSelector } from "react-redux";
import { setUserStates } from "../features/user/userSlice";
import axios from "axios";
import { apis } from "../helpers";


export default function Books() {
    const [books, setBooks] = useState([])
    const {loading, email, trigger, error, errorMessage } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const getBooks = async () => {
        try {
            dispatch(setUserStates({ loading: true }))
            const response = await axios.post(apis.others.getBooks, { email }) 
            const receivedBooks_array = await response.data.books
            setBooks(receivedBooks_array)
            dispatch(setUserStates({loading: false, trigger: false }))
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


    // ON RENDER GET BOOKS
    useEffect(() => {
        const fetch = async () => {
            await getBooks()
        }
        fetch()
    }, [trigger])


    
    // HIDE ERROR ALERT AFTER FEW SECONDS
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setUserStates({error: false, errorMessage: ""}))
        }, 2000)
        return () => clearTimeout(timer)
    }, [error, dispatch])


    return (
        <div className="container mt-4">
            {
                loading ? <h1>Loading....</h1> :
                    books.length === 0 ? <h1>No Books to Display</h1> :
                        <div className="row">
                            {error && <p className="alert alert-info">{errorMessage}</p>}
                            {
                                books.map((book) => {
                                    return (
                                        <div className="col-sm-12 col-md-4 col-lg-3 mb-4" key={book._id}>
                                            <SingleBook book={book} />
                                        </div>
                                    )
                                })
                            }
                        </div>
            }
        </div>
    )
}