import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserStates } from "../features/user/userSlice";
import { apis } from "../helpers";


export default function Form() {
    const { error, errorMessage } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // signup and login form toggling
    const [isLogin, setIsLogin] = useState(true)
    // login states 
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    // signup states
    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpFirstName, setSignUpFirstName] = useState("")
    const [signUpLastName, setSignUpLastName] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("")


    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            if (!loginEmail || !loginPassword) {
                dispatch(setUserStates({ error: true, errorMessage: "Enter required fields." }))
                return
            }
            const authData = {email: loginEmail, password: loginPassword}
            const response = await axios.post(apis.auth.login, authData)
            const data = await response.data
            dispatch(setUserStates({
                first_name: data.firstName,
                email: data.email,
                token: data.token
            }))
            navigate("/books")
        } catch (err) {
            if (err.code === "ERR_NETWORK") {
                dispatch(setUserStates({ error: true, errorMessage: err.message }))
                return;
            }
            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 403) {
                dispatch(setUserStates({error: true, errorMessage: err.response.data.message}))
                return;
            }
            if (err.response.status === 500) {
                dispatch(setUserStates({error: true, errorMessage:"Server Error!!"}))
                return;
            }
            dispatch(setUserStates({ error: true, errorMessage: "something went wrong"}))
            return;
        }
    }

    const signupHandler = async (event) => {
        event.preventDefault();
        try {
            if (!signUpEmail || !signUpFirstName || !signUpLastName || !signUpPassword || !signUpConfirmPassword) {
                dispatch(setUserStates({ error: true, errorMessage: "Enter required fields." }))
                return
            }
            if (signUpPassword !== signUpConfirmPassword) {
                dispatch(setUserStates({ error: true, errorMessage: "Passwords does not match." }))
                return
            }
            const accountData = {
                email: signUpEmail,
                fname: signUpFirstName,
                lname: signUpLastName,
                password: signUpPassword
            }
            const response = await axios.post(apis.auth.signup, accountData)
            const data = await response.data
            dispatch(setUserStates({ error: true, errorMessage: data.message }))
            setTimeout(() => {
                // reset states
                setSignUpConfirmPassword("")
                setSignUpPassword("")
                setSignUpFirstName("")
                setSignUpLastName("")
                // redirect to login
                setIsLogin(true)
                navigate("/login")
            }, 3000);
        } catch (err) {
            if (err.code === "ERR_NETWORK") {
                dispatch(setUserStates({ error: true, errorMessage: err.message }))
                return;
            }
            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 403) {
                dispatch(setUserStates({error: true, errorMessage: err.response.data.message}))
                return;
            }
            if (err.response.status === 500) {
                dispatch(setUserStates({error: true, errorMessage:"Server Error!!"}))
                return;
            }
            dispatch(setUserStates({ error: true, errorMessage: "something went wrong"}))
            return;
        }
    }

    useEffect(() => {
        if (window.location.pathname === "/login") {
            setIsLogin(true)
        }
        if (window.location.pathname === "/signup") {
            setIsLogin(false)
        }
    }, [isLogin])


    // ERROR DISAPPEARS AFTER 4 SEC
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setUserStates({error: false, errorMessage: ""}))
        }, 3000)
        return () => { clearTimeout(timer) }
    }, [error, dispatch])

    return (
        <div className="form_container">
            <h3 className="form_title">{isLogin ? "Login" : "Signup"}</h3>
            {error && <p className="alert alert-info w-75 h-25">{ errorMessage }</p>}
            {
                isLogin ? 
                    // login form
                    <form className="form" onSubmit={loginHandler}>
                        <div className="form_input_container">
                            <input
                                type="email"
                                className="input"
                                placeholder="Registered Email Id"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form_input_container">
                            <input
                                type="password"
                                className="input"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form_input_container">
                            <button type="submit" className="input auth_btn">Login</button>
                        </div>
                        <Link
                            to="/signup" className="link" onClick={() => setIsLogin(!isLogin)}>Create account</Link>
                    </form> :

                    // sign up Form
                    <form className="form" onSubmit={signupHandler}>
                        <div className="form_input_container">
                            <input
                                type="text"
                                className="input"
                                placeholder="First Name"
                                value={signUpFirstName}
                                onChange={(e) => setSignUpFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form_input_container">
                            <input
                                type="text"
                                className="input"
                                placeholder="Last Name"
                                value={signUpLastName}
                                onChange={(e) => setSignUpLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form_input_container">
                            <input
                                type="email"
                                className="input"
                                placeholder="Email"
                                value={signUpEmail}
                                onChange={(e) => setSignUpEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form_input_container">
                            <input
                                type="password"
                                className="input"
                                placeholder="Create password"
                                value={signUpPassword}
                                onChange={(e) => setSignUpPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form_input_container">
                            <input
                                type="password"
                                className="input"
                                placeholder="Confirm password"
                                value={signUpConfirmPassword}
                                onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form_input_container">
                            <button type="submit" className="input auth_btn" >Create account</button>
                        </div>
                        <Link to="/login" className="link" onClick={() => setIsLogin(!isLogin)}>Already have an account?</Link>
                    </form>
            }
        </div>
    )
}