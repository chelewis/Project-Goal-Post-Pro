import React,{useState, useEffect} from 'react'

const Personnel = () => {
    const [data, setData] = useState([{}])
    useEffect(() => {
        fetch('/personnel')
        .then((res) => res.json())
        .then((data) => setData(data))
    }, [])

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className='bg-gre-200 p-4 rounded-lg shadow-md'>
                <h1 className='text-3xl font-bold mb-4'>Personnel Management</h1>
                <table className='table-auto border-collapse border border-gray-300' >
                    <thead className='bg-blue-200'>
                        <tr>
                            <th className='border border-gray-300 w-1/4 text-center'>ID</th>
                            <th className='border border-gray-300 w-2/4 text-left'>Name</th>
                            <th className='border border-gray-300 w-1/4 text-left'>Type</th>
                            <th className='border border-gray-300 w-1/4 text-left'>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id} className='hover:bg-blue-100'>
                                <td className='border border-gray-300 text-center'>{row.id}</td>
                                <td className='border border-gray-300 text-left'>{row.first_name + ' ' + row.last_name}</td>
                                <td className='border border-gray-300 text-left'>{row.personnel_type}</td>
                                <td className='border border-gray-300 text-right'>{row.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Personnel