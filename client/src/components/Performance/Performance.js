import React,{useState, useEffect} from "react";

const Performance = () => {
    const [data, setData] = useState([{}]);
    useEffect(() => {
        fetch("/personnel_drills")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-gre-200 p-4 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Performance Management</h1>
                <table className="table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300">ID</th>
                            <th className="border border-gray-300">Drill/Test</th>
                            <th className="border border-gray-300">Examinee</th>
                            <th className="border border-gray-300">Score</th>
                            <th className="border border-gray-300">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td className="border border-gray-300">{row.id}</td>
                                <td className="border border-gray-300">{row.drill_id}</td>
                                <td className="border border-gray-300">{row.personnel_id}</td>
                                <td className="border border-gray-300">{row.score}</td>
                                <td className="border border-gray-300">{row.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Performance;