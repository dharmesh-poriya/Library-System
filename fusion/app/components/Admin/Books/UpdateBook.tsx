"use client"
import React, { useState } from "react"

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

type Props = {
    book: Book;
};

const UpdateBook: React.FC = ({book}: Props) => {

    const [updatedBook, setUpdatedBook] = useState<Book>(book);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdatedBook({ ...updatedBook, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // onUpdate(updatedBook);
        // Close modal here if needed
    };

    const closeModal = (book_id: any) => {
        const modal = document.getElementById(`modal_${book_id}`) as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                    ISBN
                </label>
                <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={updatedBook.isbn}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={updatedBook.title}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={updatedBook.author}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
                    Publisher
                </label>
                <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    value={updatedBook.publisher}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">
                    Published Date
                </label>
                <input
                    type="date"
                    id="publishedDate"
                    name="publishedDate"
                    value={updatedBook.publishedDate.toISOString().substr(0, 10)} // Format date as yyyy-mm-dd
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={updatedBook.genre}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={updatedBook.quantity.toString()}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                    Categories
                </label>
                <input
                    type="text"
                    id="categories"
                    name="categories"
                    value={updatedBook.categories}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                    Thumbnail
                </label>
                <input
                    type="text"
                    id="thumbnail"
                    name="thumbnail"
                    value={updatedBook.thumbnail}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="previewLink" className="block text-sm font-medium text-gray-700">
                    Preview Link
                </label>
                <input
                    type="text"
                    id="previewLink"
                    name="previewLink"
                    value={updatedBook.previewLink}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                    Rating
                </label>
                <input
                    type="text"
                    id="rating"
                    name="rating"
                    value={updatedBook.rating}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="btn btn-primary w-auto mx-5">
                    Update
                </button>
                <button className="btn mx-5" onClick={() => closeModal(book.isbn)}>Close</button>
                {/* <button className="btn">Close</button> */}
            </div>
        </form>
    );
}

export default UpdateBook;