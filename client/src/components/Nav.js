import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Personnel} from './Personnel/Personnel';

export function Nav() {
    const [data, setData] = useState([{}]);
    const [active_link, setActiveLink] = useState('home');
    const [active, setActive] = useState(false);

    useEffect(() => {
        fetch('/users')
        .then((res) => res.json())
        .then((data) => setData(data))
    }, [])

    return (
        //side nav bar
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4 text-xl font-bold">
                <li key={'home'} className='hover:bg-sky-700'><Link to="/">Home</Link></li>
                {/* <li key={'personnel'}><Link to="/Personnel">Personnel</Link></li> */}
                <li key={'personnel_management'} className='hover:bg-sky-700'><Link to="/personnel">Personnel</Link></li>
                <li key={'personnel_appraisal'} className='hover:bg-sky-700'><Link to="/appraisals">Appraisals</Link></li>
                <li key={'personnel_performance'} className='hover:bg-sky-700'><Link to="/performance">Performance</Link></li>
                <li key={'reports'} className='hover:bg-sky-700'><Link to="/reporting">Reports</Link></li>
                {/* organization name displayed at far right */}
                <div className="flex-grow ml-4 text-right">
                    <li key={'organization_name'} className="pr-1">Your Organization</li>
                </div>
            </ul>
        </nav>
    )
}

