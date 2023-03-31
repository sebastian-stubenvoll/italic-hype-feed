const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function auth(username, password) {
    const url = 'https://www.italictype.com/api/auth/jwt/create';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'username' : username,
            'password' : password,
        })
    });
    const content = await response.json();
    return content;
}

//Request handler
async function obtainData(token) {
    const queues = await getQueues(token);
    const profile = await getProfile(token);
    return { 'queues' : queues, 'profile' : profile };
}

//Request functions
async function getQueues(token) {
    const endpoint = 'https://www.italictype.com/api/bookqueueitems/?queue=';
    //Queue 1 and 2 are "currently reading" and "completed" respectively
    const results = await Promise.all([1,2].map(async x => {
        const url = endpoint + x;
        const response = await fetch(url, {
            method: 'GET',
            headers : {
               'Authorization' : 'Bearer ' + token ,
            }
        });
        const content = await response.json();
        return content;
    }));
    return results;
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


async function getProfile(token) {
    const url = 'https://www.italictype.com/api/auth/users/me';
    const response = await fetch(url, {
        method: 'GET',
        headers : {
           'Authorization' : 'Bearer ' + token ,
        }
    });
    
    const content = await response.json();
    return content
}

module.exports = { auth, obtainData };
