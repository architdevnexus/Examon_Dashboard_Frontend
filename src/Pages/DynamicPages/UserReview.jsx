import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserReview = () => {
    const { id } = useParams(); // user ID
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token"); // fetch token

    const fetchUserReviews = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://194.238.18.1:3004/api/review/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // send token
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch reviews");
            }
            const data = await res.json();
            setReviews(data?.reviews || []); // adjust according to API response
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUserReviews();
    }, [id]);

    if (loading) return <div className="text-gray-700 p-4">Loading reviews...</div>;
    if (error) return <div className="text-red-600 p-4">Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Reviews Given</h1>
            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews given yet.</p>
            ) : (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">S.No.</th>
                            <th className="border px-4 py-2">Quiz/Item</th>
                            <th className="border px-4 py-2">Rating</th>
                            <th className="border px-4 py-2">Comment</th>
                            <th className="border px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, idx) => (
                            <tr key={review._id} className="hover:bg-gray-200">
                                <td className="border px-4 py-2">{idx + 1}</td>
                                <td className="border px-4 py-2">{review.quizName || review.itemName}</td>
                                <td className="border px-4 py-2">{review.rating}</td>
                                <td className="border px-4 py-2">{review.comment}</td>
                                <td className="border px-4 py-2">{new Date(review.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserReview;
