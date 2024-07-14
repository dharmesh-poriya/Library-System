'use client'

import { useEffect, useState } from "react";

async function getBookDetails(id: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `books/${id}`);

    if (!res.ok) {
        throw new Error('Error fetching book details');
    }

    const json = await res.json();
    return json.book;
}

async function getBorrowStatus(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    });

    if (!response.ok) return null;
    
    const data = await response.json();
    return data.borrowedBooks?.some((borrowId: string) => id === borrowId);
}

export default function BookDetails({ params }: { params: { id: string } }) {
    const [details, setDetails] = useState();
    const isAuthenticated = localStorage.getItem("user") && localStorage.getItem("userToken");
    const [hasBorrowed, setHasBorrowed] = useState(false); 

    useEffect(() => {
        getBookDetails(params.id).then(details => setDetails(details));
        getBorrowStatus(params.id).then((status) => setHasBorrowed(status));
    }, []);

    const borrowButton = hasBorrowed ? (
        <button className="btn btn-disabled mt-4">Borrowed</button>
    ) : (
        <button className="btn btn-accent mt-4">Borrow</button>
    )

    return (
        <div className="container">
            {details && <div className="grid grid-cols-1 lg:grid-cols-2 my-24 gap-6">
                <div className="">
                    <img src={details.thumbnail} alt={details.title} />
                </div>
                <div>
                    <div className="mb-4">
                        <div className="mb-3">
                            <h1 className="font-bold text-3xl mb-1">{details.title}</h1>
                            <div>#{details.isbn}</div>
                        </div>
                        <div className="flex items-baseline gap-4 mb-2">
                            <div className="text-lg">{details.author}</div>
                            <div>{new Date(details.publishedDate).toLocaleDateString()}</div>
                            <div className="text-primary">{details.categories}</div>
                        </div>
                        {details.available > 0 ? (
                            <div>
                                <span className="text-lg text-success font-bold">{details.available}</span> available
                            </div>
                        ) : (
                            <div className="font-bold text-lg text-danger">Not available</div>
                        )}
                    </div>

                    <div className="line-clamp-[10]">{details.genre}</div>

                    {isAuthenticated && borrowButton}
                </div>
            </div>}
        </div>
    )
}