import React from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
}

interface PageProps {
    books: Book[];
}

const Page: React.FC<PageProps> = ({ books }) => {
    return (
        <div>
            <h1>My Books</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;