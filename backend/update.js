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

let settings;
try {
    const rawString = fs.readFileSync('./settings.json', 'utf8');
    settings = JSON.parse(rawString.replace(/\n/g, ''));
} catch (err) {
    if (err.code === 'ENOENT') {
        settings = {};
    } else {
        throw err;
    }
}

async function update() {
    const data = await requests.obtainData(token);

    let filtered = filters.completed(data.queues[1]);

    let public_data = {
        name : settings.name ?? null,
        avatar : settings.avatar ??'https://images.unsplash.com/photo-1666361905237-5f61f7be4fe1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        current : filters.current(data.queues[0]),
        completed : filtered[0],
        completedTotal: data.queues[1].length,
        thisYear : filtered[1],
        thisYearTotal : filtered[1].reduce((t,c) => t+c, 0),
        background : settings.background ?? null,
    };

    if (settings.hidePage) {
        public_data = filters.removeProperty(public_data, 'at_page');
    }

    if (settings.hideRating) {
        public_data = filters.removeProperty(public_data, 'rating');
    }

    //Intended to be run from the root directory of the project
    fs.writeFileSync('./src/assets/public_data.json', JSON.stringify(public_data));
}

update();
