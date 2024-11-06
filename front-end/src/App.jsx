
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
