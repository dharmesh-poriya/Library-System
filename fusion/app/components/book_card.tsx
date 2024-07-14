export function BookCard({
    title,
    author,
    publishedYear,
    description,
    imageUrl
}: {
    id: string,
    title: string,
    author: string,
    publishedYear: number,
    description: string,
    imageUrl: string
}) {
    return (
        <a href="#">
            <div className="flex gap-6">
                <img src={imageUrl}
                    alt={title} className="object-contain object-top"/>
                <div>
                    <div className="font-bold text-lg pb-2">{title}</div>
                    <div className="flex gap-2 pb-2">
                        <div className="text-primary">{author}</div>
                        <div>{publishedYear}</div>
                    </div>
                    <div className="text-base-content line-clamp-4">{description}</div>
                </div>
            </div>
        </a>
    );
}