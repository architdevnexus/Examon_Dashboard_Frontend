import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserQuiz = () => {
    const { id } = useParams(); // user ID
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token")
    const fetchUserQuiz = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://194.238.18.1:3004/api/user/quizzes/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // pass token in headers
                },
            });
            if (!res.ok) {
                throw new Error("Failed to fetch quizzes");
            }
            const data = await res.json();
            setQuizzes(data?.quizzes || []); // adjust according to API response
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserQuiz();
    }, [id]);

    if (loading) return <div className="text-gray-700 p-4">Loading quizzes...</div>;
    if (error) return <div className="text-red-600 p-4">Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Attempted Quizzes</h1>
            {quizzes.length === 0 ? (
                <p className="text-gray-500">No quizzes attempted yet.</p>
            ) : (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">S.No.</th>
                            <th className="border px-4 py-2">Quiz Name</th>
                            <th className="border px-4 py-2">Score</th>
                            <th className="border px-4 py-2">Date Attempted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.map((quiz, idx) => (
                            <tr key={quiz._id} className="hover:bg-gray-200">
                                <td className="border px-4 py-2">{idx + 1}</td>
                                <td className="border px-4 py-2">{quiz.name}</td>
                                <td className="border px-4 py-2">{quiz.score}</td>
                                <td className="border px-4 py-2">
                                    {new Date(quiz.attemptedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserQuiz;
