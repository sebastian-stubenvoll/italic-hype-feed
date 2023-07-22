const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//Request handler
async function obtainData(token) {
    const queues = await getQueues(token);
    //const profile = await getProfile(token);
    return { 'queues' : queues, 'profile' : null };
}

//Request functions
async function getQueues(token) {
    const endpoint = 'https://www.italictype.com/api/bookqueueitems/?queue=';
    //Queue 1 and 2 are "currently reading" and "completed" respectively
    const accumulated_results = await Promise.all([1,2].map(async x => {
        let url = endpoint + x;
        let results = [];
        while (url !== null) {
            const response = await fetch(url, {
                method: 'GET',
                headers : {
                   'Authorization' : 'Token ' + token ,
                }
            });
            const content = await response.json();
            results = [...results, ...content.results];
            url = content.next;
        }
        return results;
    }));
    return accumulated_results;
}

//async function getGoal(token) {
    //const url = 'https://www.italictype.com/api/readinggoals/current';
    //const response = await fetch(url, {
        //method: 'GET',
        //headers : {
           //'Authorization' : 'Bearer ' + token ,
        //}
    //});
    
    //const content = await response.json();
    //return content
//}


//async function getProfile(token) {
    //const url = 'https://www.italictype.com/api/auth/users/me';
    //const response = await fetch(url, {
        //method: 'GET',
        //headers : {
           //'Authorization' : 'Bearer ' + token ,
        //}
    //});
    
    //const content = await response.json();
    //return content
//}

module.exports = { obtainData };
