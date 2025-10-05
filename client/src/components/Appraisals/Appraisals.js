import React,{useState, useEffect} from 'react'

const Appraisals = () => {
    const [data, setData] = useState([{}])
    useEffect(() => {
        fetch('/appraisals')
        .then((res) => res.json())
        .then((data) => setData(data))
    }, [])

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className='bg-gre-200 p-4 rounded-lg shadow-md'>
                <h1 className='text-3xl font-bold mb-4'>Appraisals</h1>
                <table className='table-auto border-collapse border border-gray-300'>
                    <thead>
                        <tr>
                            <th className="border border-gray-300">ID</th>
                            <th className="border border-gray-300">Scout</th>
                            <th className="border border-gray-300">Subject</th>
                            <th className="border border-gray-300">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td className="border border-gray-300">{row.id}</td>
                                <td className="border border-gray-300">{row.scout_id}</td>
                                <td className="border border-gray-300">{row.subject_id}</td>
                                <td className="border border-gray-300">{row.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Appraisals