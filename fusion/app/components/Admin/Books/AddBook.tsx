"use client"

import React, { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

const AddNewBook: React.FC = () => {

    // const userToken = localStorage.getItem("userToken");
    // if (!userToken) {
    //     console.error("User token not found");
    //     return;
    // }

    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        publishedDate: '',
        date: '',
        genre: '',
        quantity: 0,
        available: 0,
        categories: '',
        thumbnail: '',
        previewLink: '',
        rating: 0,
        addedBy: '', // Assuming this will be set based on the logged-in user
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const toastId = toast.loading("Sending data..");
        try {
            // Replace with your API endpoint
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/books`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            });
            // console.log('Book added successfully:', response.data);
            toast.success(response.data.message, {
                id: toastId,
            });
        } catch (error: any) {
            toast.error(error.response.data.message, {
                id: toastId,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-4">
                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                    ISBN
                </label>
                <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
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
                    value={formData.title}
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
                    value={formData.author}
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
                    value={formData.publisher}
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
                    value={formData.publishedDate} // Format date as yyyy-mm-dd
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
                    value={formData.genre}
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
                    value={formData.quantity.toString()}
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
                    value={formData.categories}
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
                    value={formData.thumbnail}
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
                    value={formData.previewLink}
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
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            {/* <input type="hidden" name="addedBy" value={formData.addedBy} /> */}

            <div className="flex justify-center">
                <button type="submit" className="btn btn-primary">Add Book</button>
                {/* <button className="btn">Close</button> */}
            </div>
        </form>
    );

}

export default AddNewBook;