
async function getBookDetails(id: string) {
    const res = await fetch(process.env.API_BASE_URL + `books/${id}`);
    
    if (!res.ok) {
        throw new Error('Error fetching book details');
    }

    const json = await res.json();
    return json.book;
}

export default async function BookDetails({ params }: { params: { id: string } }) {
    const details = await getBookDetails(params.id);

    return (
        <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 my-24 gap-6">
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
                            <div>{details.publishedDate}</div>
                            <div className="text-primary">{details.categories}</div>
                        </div>
                        <div>
                            <span className="text-lg">{details.available}</span> Available
                        </div>
                    </div>

                    <div>{details.description}</div>

                    <button className="btn btn-accent mt-4">Borrow</button>
                </div>

                
            </div>
        </div>
    )
}