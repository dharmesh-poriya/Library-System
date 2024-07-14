import { BookCard } from "@/app/components/book_card";

interface SearchParams {
    q: string,
    page: number
}

async function searchBooks(query: string, page: number = 1) {
    const url = new URL('books', process.env.API_BASE_URL);
    url.searchParams.append('text', query);
    url.searchParams.append('page', page.toString());

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Error fetching books.');
    }

    const json = await res.json();
    return json;
}

export default async function Search({ searchParams }: {
    searchParams: SearchParams
}) {
    let books = [];
    let totalPages = 0;
    let currentPage = 0;
    let paginationRange = null;

    const query = searchParams.q ? searchParams.q : '';

    if (searchParams.q) {
        const searchResult = await searchBooks(searchParams.q, searchParams.page);

        totalPages = searchResult.totalPages;
        currentPage = searchResult.currentPage;

        paginationRange = Array.from({ length: totalPages }, (x, i) => i + 1);

        books = searchResult.books.map(book => {
            return {
                id: book._id,
                title: book.title,
                description: book.genre,
                publishedYear: new Date(book.date).getFullYear(),
                author: book.author,
                imageUrl: book.thumbnail
            }
        });
    }

    return (
        <div className="container">
            <div className="mt-16">
                <div className="text-2xl mb-4">Search for books</div>
                <form action="" className="flex gap-4">
                    <input type="search" name="q" className="input input-bordered w-full" placeholder="Type your query" defaultValue={query} />
                    <button className="btn btn-accent">Search</button>
                </form>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
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