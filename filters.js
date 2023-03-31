function completed(arr) {
    const filtered_arr = arr.map( x => {
        const entry = {
            title : x.book.title,
            authors : x.book.authors,
            cover : x.book.cover_image_url,
            completed : x.finished_reading_at,
            rating : x.user_review.rating,
        };
        return entry;
    });
    return filtered_arr;
}


module.exports = { completed };
