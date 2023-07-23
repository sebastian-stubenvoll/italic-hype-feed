function completed(arr) {
    let filtered_arr = arr.map( x => {
        const entry = {
            title : x.book.title,
            authors : x.book.authors,
            cover : x.book.cover_image_url,
            pages: x.book.page_count,
            completed : x.finished_reading_at ? x.finished_reading_at : null,
            rating : x.user_review?.rating ? x.user_review.rating : null,
            url: x.book.book_detail_url,
        };
        return entry;
    });
    //filtered_arr.sort(function(a, b) {
        //return (a.completed < b.completed) ? -1 : ((a.completed > b.completed) ? 1 : 0);
    //});
    filtered_arr = filtered_arr.reverse();
    let breakpoints = [{ null : null}];
    for (let i = 1; i < 12; i++) {
        breakpoints.push(monthsAgo(i));
    }
    for (let i = 1; i < 11; i++) {
        breakpoints.push(yearsAgo(i));
    }
    let breakpoint = breakpoints.pop();
    let output_arr = [];
    let byMonth = Array(12).fill(0);

    filtered_arr.forEach((book, index) => {
        if (book.completed === null) {
            output_arr.push(book);
            return
        }
        //does redundant checks but isn't performance sensitive so it's fine
        let month = checkThisYear(book.completed);
        if (month !== null) {
            byMonth[month] += 1;
        }
        if (book.completed > breakpoint.date) {
            while (book.completed > breakpoints[breakpoints.length - 1].date) {
                breakpoint = breakpoints.pop();
            }
            output_arr.push({ 'separator' : true, 'label' : breakpoint.label })
            breakpoint = breakpoints.pop()
        }
        output_arr.push(book);
    });
    if ('separator' in output_arr[0]) {
        output_arr.shift();
    }
    if (!( 'separator' in output_arr[output_arr.length -1] )) {
        output_arr.push({ 'separator' : true, 'label' : 'Recently' });
    }
    let BreakException = {};
    try {
        output_arr.forEach((item, index) => {
            if ('separator' in item) {
                if (output_arr[index-1].completed === null) {
                    item.label = 'Some unknown amount of time ago';
                }
                throw BreakException;
            }
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }
    return [output_arr.reverse(), byMonth];
}

function current(arr) {
    const filtered_arr = arr.map( x => {
        const entry = {
            title : x.book.title,
            authors : x.book.authors,
            cover : x.book.cover_image_url,
            pages: x.book.page_count,
            at_page: x.current_page_number,
            url: x.book.book_detail_url,
        };
        return entry;
    });
    return filtered_arr;
}

const numbers = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven' ]

function monthsAgo(n) {
    const date = new Date();
    date.setMonth(date.getMonth() - n);
    return { 'date' : date.toISOString(), 'label' : `Over ${numbers[n-1]} month${n > 1 ? 's' : ''} ago` }
}


function yearsAgo(n) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - n);
    return { 'date' : date.toISOString(), 'label' : `Over ${numbers[n-1]} year${n > 1 ? 's' : ''} ago` }
}

function checkThisYear(d) {
    const date = new Date(d);
    const currentYear = new Date().getFullYear();

    if (date.getFullYear() === currentYear) {
        return date.getMonth();
    }
    return null;
}

module.exports = { completed, current };
