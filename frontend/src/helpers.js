export const apis = {
    auth: {
        signup: `${process.env.REACT_APP_BACKEND_URI}/api/sign-up`,                    // POST
        login: `${process.env.REACT_APP_BACKEND_URI}/api/login`,                       // POST
        changepass: `${process.env.REACT_APP_BACKEND_URI}/api/change-password`         // POST
    },
    others: {
        uploadBook: `${process.env.REACT_APP_BACKEND_URI}/api/upload-book`,             // POST
        getBooks: `${process.env.REACT_APP_BACKEND_URI}/api/get-books`,                 // POST
        updateBook: `${process.env.REACT_APP_BACKEND_URI}/api/update-book/:book_id`,    // PUT  
        deleteBook: `${process.env.REACT_APP_BACKEND_URI}/api/delete/:book_id`          // PUT
    }
}