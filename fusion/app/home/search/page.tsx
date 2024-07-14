import { BookCard } from "@/app/components/book_card";

interface SearchParams {
    q: string,
    page: number,
    type: string
}

async function searchBooks(query: string, page: number = 1, type: string) {
    const url = new URL('books', process.env.API_BASE_URL);
    url.searchParams.append('text', query);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('field', type);

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

    const query = searchParams.q ? searchParams.q : '';

    const type = searchParams.type ?? 'title'

    const searchResult = await searchBooks(
        query,
        searchParams.page,
        type
    );

    const totalPages = searchResult.totalPages;
    const currentPage = searchResult.currentPage;

    const paginationRange = Array.from({ length: totalPages }, (x, i) => i + 1);

    const pageLinks = paginationRange.map(page => {
        const params = new URLSearchParams();
        params.append('page', page.toString());

        if (searchParams.q) params.append('q', searchParams.q);
        if (searchParams.type) params.append('type', searchParams.type);

        return {
            url: '/home/search?' + params.toString(),
            page: page
        };
    });

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

    return (
        <div className="container">
            <div className="mt-16">
                <div className="text-2xl mb-4">Search for books</div>
                <form action="" className="flex gap-4">
                    <select className="select select-bordered" name="type" defaultValue={type}>
                        <option value="title">Title</option>
                        <option value="isbn">ISBN</option>
                        <option value="author">Author</option>
                    </select>
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

            <div className="join flex justify-center py-4">
                {pageLinks.map(link => {
                    let btnClass = '';
                    if (link.page === currentPage) btnClass = 'btn-primary';

                    return <a href={link.url} className={`btn join-item ${btnClass}`}>{link.page}</a>
                })}
            </div>
        </div>
    );
}