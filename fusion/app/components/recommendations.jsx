import { BookCard } from "./book_card";

import dummyData from "@/data/data.json";

export function Recommendations({
    type
}) {
    let title = 'Unknown';

    if (type === 'new_arrivals') {
        title = 'New Arrivals';
    } else if (type === 'trending') {
        title = 'Trending';
    }

    const books = dummyData.books.map(book => {
        return {
            id: book._id,
            title: book.title,
            description: book.genre,
            publishedYear: new Date(book.date).getFullYear(),
            author: book.author,
            imageUrl: book.thumbnail
        }
    });

    return (
        <div>
            <h2 className="text-2xl mb-8 font-bold">{title}</h2>
            <div className="flex flex-col gap-6">
                {books.map(book => (
                    <BookCard
                        title={book.title}
                        author={book.author}
                        publishedYear={book.publishedYear}
                        description={book.description}
                        imageUrl={book.imageUrl}
                        key={book.id} />
                ))}
            </div>
        </div>
    );
}