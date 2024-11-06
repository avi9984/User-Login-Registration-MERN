import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
const Register = () => {
    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleRegistrationChange = (e) => {
        const { name, value } = e.target;

        setRegistrationData((preData) => ({
            ...preData,
            [name]: value
        }))
    }

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/users/register', setRegistrationData)
        try {
            const responce = await axios.post('http://localhost:3000/users/register', registrationData);
            console.log(responce.data);

            const { success, message } = responce.data
            if (success) {
                console.log("User Register Successfully")
            } else {
                console.log(message)
            }
        } catch (error) {
            console.log(error)
        }

        setRegistrationData({
            name: '',
            email: '',
            password: ''
        })
    }

    return (
        <div>
            <h1>Registration Form</h1>
            <form onSubmit={handleRegistrationSubmit}>
                <input type='text'
                    name='name'
                    placeholder='Enter your name'
                    required
                    onChange={handleRegistrationChange}
                    value={registrationData.name}
                    onChangeCapture={handleRegistrationChange}
                />
                <input type='text'
                    name="email"
                    placeholder="email"
                    required
                    value={registrationData.email}
                    onChange={handleRegistrationChange}
                />
                <input type="password"
                    name="password"
                    placeholder="password"
                    required
                    value={registrationData.password}
                    onChange={handleRegistrationChange}
                />
                <button type='submit'>Register</button>
                <p>Already Registered? <Link to="/login">Login Here</Link></p>
            </form>
        </div>
    )
}

export default Register
