import React,{useState, useEffect} from 'react'
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import Personnel from './components/Personnel/Personnel'
import Appraisals from './components/Appraisals/Appraisals'
import Performance from './components/Performance/Performance'
import Reports from './components/Reporting/Reporting'
import Home from './components/Home'

function App() {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch('/users')
        .then((res) => res.json())
        .then((data) => setData(data))
    }, [])
    
    // console.log(data);

    return (
        <div>
            <header>
                <Nav />
            </header>
            {/* <div className="flex flex-col items-center justify-center h-screen bg-gray-100"> */}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/personnel" element={<Personnel />} />
                    <Route path="/appraisals" element={<Appraisals />} />
                    <Route path="/performance" element={<Performance />} />
                    <Route path="/reporting" element={<Reports />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
