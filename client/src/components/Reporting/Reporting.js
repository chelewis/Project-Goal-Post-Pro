import React,{useState, useEffect} from 'react'

const Reporting = () => {
    const [data, setData] = useState([{}])
    useEffect(() => {
        fetch('/appraisals')
        .then((res) => res.json())
        .then((data) => setData(data))
    }, [])

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className='bg-gre-200 p-4 rounded-lg shadow-md'>
                <h1 className='text-3xl font-bold mb-4'>Reports</h1>
                
            </div>
        </div>
    )
}

export default Reporting