const requests = require('./requests');
const filters = require('./filters');
const fs = require('fs');

const username = process.env.IT_USER;
const password = process.env.IT_PASSWORD;


async function update() {
    const token_res = await requests.auth(username, password);
    const token = token_res.access;
    const data = await requests.obtainData(token);

    let public_data = {
        name : data.profile.name,
        avatar : data.profile.avatar_thumbnail,
        current : filters.current(data.queues[0]),
        completed : filters.completed(data.queues[1]),
    };
    
    fs.writeFileSync('./public_data.json', JSON.stringify(public_data));
}

update();
