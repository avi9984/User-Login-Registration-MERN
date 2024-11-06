import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' })

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((preData) => ({
            ...preData,
            [name]: value
        }))
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const responce = await axios.post('http://localhost:3000/users/login', loginData);
            const { success, message } = responce.data
            if (success) {
                console.log("Login success")
            } else {
                console.log(message)
            }
        } catch (error) {
            console.log(error)
        }

        setLoginData({
            email: '',
            password: ''
        })
    }
    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleLoginSubmit}>
                <input type="text"
                    name="email"
                    placeholder="email"
                    required
                    value={loginData.email}
                    onChange={handleLoginChange}
                />
                <input type="password"
                    name="password"
                    placeholder="password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                />
                <button type="submit">Login</button>
                <p>Not register yet? <Link to='/register'>Register Now</Link></p>
            </form>
        </div>
    )
}

export default Login
