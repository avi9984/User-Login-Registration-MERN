const User = require('../models/user');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(name && email && password)) {
            return res.status(400).json({ status: false, message: "Please fill in all fields" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: "This email already register" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        return res.status(201).json({ status: true, message: "Register is successfull" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ status: false, message: "Please fill in all" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: false, message: "Invalid credencial" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Invalid credencial" })
        }
        return res.status(200).json({
            status: true, message: "Login successfull", data: {
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}


module.exports = { register, login }