const requests = require('./requests');
const filters = require('./filters');
const fs = require('fs');

const token = process.env.IT_TOKEN;


async function update() {
    const data = await requests.obtainData(token);

    let public_data = {
        //name : data.profile.name,
        name : 'Sebastian',
        //avatar : data.profile.avatar_thumbnail,
        avatar : 'https://s3.amazonaws.com/media.italictype.com/avatar/gNq4mw8/a2e179fa-640b-4143-9fbb-9edf6e2df28b_t.jpg',
        current : filters.current(data.queues[0]),
        completed : filters.completed(data.queues[1]),
    };
    
    //Intended to be run from the root directory of the project
    fs.writeFileSync('./src/assets/public_data.json', JSON.stringify(public_data));
}

update();
