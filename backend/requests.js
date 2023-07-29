const e = require('./errors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//Request handler
async function obtainData(token) {
    const queues = await getQueues(token);
    return { 'queues' : queues, 'profile' : null };
}

//Request functions
async function getQueues(token) {
    try {
        const endpoint = 'https://www.italictype.com/api/bookqueueitems/?queue=';
        //Queue 1 and 2 are "currently reading" and "completed" respectively
        const accumulated_results = await Promise.all([1,2].map(async x => {
            let url = endpoint + x;
            let results = [];
            while (url !== null) {
                const response = await getRequest(url, token, 200, 0);
                const content = await response.json();
                results = [...results, ...content.results];
                url = content.next;
            }
            return results;
        }));
        return accumulated_results;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

//sends GET requests recursively if 429 is received
//waiting <delay> ms between each successive request
//always panics on the 100th iteration
async function getRequest(url, token, delay, recc) {
    if (recc > 99) {
        throw new e.RequestError("100 successive requests returned 429. Aborting...");
    }
    const response = await fetch(url, {
        method: 'GET',
        headers : {
            'Authorization' : 'Token ' + token ,
        }
    });
    if (response.status === 429) {
        await new Promise(r => setTimeout(r, delay));
        return getRequest(url, token, delay, recc+1);
    }
    if (response.ok) {
        return response;
    } else {
        throw new e.RequestError(`Request failed with status: ${response.status}!`)
    }
}

module.exports = { obtainData };
