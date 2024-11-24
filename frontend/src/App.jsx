import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';



function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route
                            path='/'
                            element={<Home />}
                        />
                        <Route
                            path='/new'
                            element={<Create />}
                        />
                        <Route
                            path='/edit/:id'
                            element={<Edit />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App
