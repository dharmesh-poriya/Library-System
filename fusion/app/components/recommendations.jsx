import { BookCard } from "./book_card";

async function getRecommendations(type) {
    let suffix = null;
    
    switch (type) {
        case 'new_arrivals':
            suffix = 'newArrivals';
            break;

        case 'trending':
            suffix = 'trending';
            break;

        default:
            throw new Error('Unsupported recommendation type.');
    }

    console.log(process.env.NEXT_PUBLIC_API_BASE_URL+ `books/${suffix}`);
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+ `books/${suffix}`);

    if (!res.ok) {
        throw new Error(res.json().message);
    }

    const json = await res.json();

    return json.books;
}

export async function Recommendations({
    type
}) {
    let title = 'Unknown';

    if (type === 'new_arrivals') {
        title = 'New Arrivals';
    } else if (type === 'trending') {
        title = 'Trending';
    }

    const recommendedBooks = await getRecommendations(type);
    const books = recommendedBooks.map(book => {
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
                        id={book.id}
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