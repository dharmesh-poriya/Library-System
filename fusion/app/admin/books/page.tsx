"use client"

import AddNewBook from '@/app/components/Admin/Books/AddBook';
import UpdateBook from '@/app/components/Admin/Books/UpdateBook';
import Search from '@/app/components/Filters/serch';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Book {
    _id: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publishedDate: Date;
    date: Date;
    genre: string;
    quantity: number;
    available: number;
    categories: string;
    thumbnail: string;
    previewLink: string;
    rating: number;
}

const BookPage: React.FC = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const userToken = localStorage.getItem("userToken");
                if (!userToken) {
                    throw new Error("User token not found");
                }
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setBooks(response.data.books);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // const books = [
    //     {
    //         isbn: "978-3-16-148410-0",
    //         title: "The Great Adventure",
    //         author: "John Smith",
    //         publisher: "Adventure Publishing",
    //         publishedDate: new Date("2022-01-15"),
    //         date: new Date("2023-01-15"),
    //         genre: "Adventure",
    //         quantity: 50,
    //         available: 30,
    //         categories: "Fiction",
    //         thumbnail: "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png",
    //         previewLink: "https://example.com/preview/great-adventure",
    //         rating: 4.5,
    //     },
    //     {
    //         isbn: "978-1-23-456789-0",
    //         title: "Mystery of the Lost Island",
    //         author: "Emily Johnson",
    //         publisher: "Mystery House",
    //         publishedDate: new Date("2021-05-20"),
    //         date: new Date("2023-02-10"),
    //         genre: "Mystery",
    //         quantity: 70,
    //         available: 40,
    //         categories: "Fiction",
    //         thumbnail: "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png",
    //         previewLink: "https://example.com/preview/lost-island",
    //         rating: 4.2,
    //     },
    //     {
    //         isbn: "978-0-12-345678-9",
    //         title: "Science Today",
    //         author: "Dr. Albert Einstein",
    //         publisher: "Science Press",
    //         publishedDate: new Date("2020-11-11"),
    //         date: new Date("2023-03-05"),
    //         genre: "Science",
    //         quantity: 100,
    //         available: 80,
    //         categories: "Non-Fiction",
    //         thumbnail: "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png",
    //         previewLink: "https://example.com/preview/science-today",
    //         rating: 4.8,
    //     },
    //     {
    //         isbn: "978-9-87-654321-0",
    //         title: "Historical Figures",
    //         author: "Jane Doe",
    //         publisher: "History Books",
    //         publishedDate: new Date("2019-09-22"),
    //         date: new Date("2023-04-12"),
    //         genre: "History",
    //         quantity: 60,
    //         available: 50,
    //         categories: "Non-Fiction",
    //         thumbnail: "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png",
    //         previewLink: "https://example.com/preview/historical-figures",
    //         rating: 4.1,
    //     },
    //     {
    //         isbn: "978-4-56-789012-3",
    //         title: "Fantasy World",
    //         author: "George Martin",
    //         publisher: "Fantasy House",
    //         publishedDate: new Date("2018-03-30"),
    //         date: new Date("2023-05-20"),
    //         genre: "Fantasy",
    //         quantity: 80,
    //         available: 60,
    //         categories: "Fiction",
    //         thumbnail: "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png",
    //         previewLink: "https://example.com/preview/fantasy-world",
    //         rating: 4.7,
    //     },
    // ];


    const openModal = (book_id: any) => {
        const modal = document.getElementById(`modal_${book_id}`) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    console.log("XYZ:", books)

    return (
        <>
            <dialog id="new_book_model" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Adding New Books</h3>
                    <AddNewBook />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <div className='mt-5'>
                <Search />
            </div>
            <div className="overflow-x-auto flex flex-col justify-center">
                <table className="mx-10 table mt-4 w-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Books Name</th>
                            <th>Quantity</th>
                            <th>Purchased</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map(book =>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={book.thumbnail}
                                                        alt="book photo" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{book.title}</div>
                                                <div className="text-sm opacity-50">{book.author}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {book.quantity}
                                    </td>
                                    <td>100</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs" onClick={() => openModal(book.isbn)}>details</button>
                                    </th>
                                    <dialog id={`modal_${book.isbn}`} className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Update the <span className='text-blue-600'>{book.title}</span></h3>
                                            <p className="py-4">Press ESC key or click the button below to close</p>

                                            <div className="flex flex-col justify-center modal-action">
                                                <UpdateBook book={book} />

                                            </div>
                                        </div>
                                    </dialog>
                                </tr>
                            )
                        }

                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
                <div className="join flex justify-center mt-5">
                    <button className="join-item btn btn-outline">Previous page</button>
                    <button className="join-item btn btn-outline">Next</button>
                </div>
            </div>
        </>
    );
};

export default BookPage;