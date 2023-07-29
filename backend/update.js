const requests = require('./requests');
const filters = require('./filters');
const fs = require('fs');
const e = require('./errors');

const token = process.env.IT_TOKEN;
if (token === undefined) {
    const err = new e.TokenError("The token environment variable is not set.\nMake sure to set IT_TOKEN to your read-only API token before executing this script!")
    console.log(err.message);
    throw err;
}


async function update() {
    const data = await requests.obtainData(token);

    let filtered = filters.completed(data.queues[1]);

    let public_data = {
        //name : data.profile.name,
        name : 'Sebastian',
        //avatar : data.profile.avatar_thumbnail,
        avatar : 'https://s3.amazonaws.com/media.italictype.com/avatar/gNq4mw8/a2e179fa-640b-4143-9fbb-9edf6e2df28b_t.jpg',
        current : filters.current(data.queues[0]),
        completed : filtered[0],
        completedTotal: data.queues[1].length,
        thisYear : filtered[1],
        thisYearTotal : filtered[1].reduce((t,c) => t+c, 0),
    };
    
    //Intended to be run from the root directory of the project
    fs.writeFileSync('./src/assets/public_data.json', JSON.stringify(public_data));
}

update();
