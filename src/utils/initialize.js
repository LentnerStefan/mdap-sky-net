import MdapSkyNet from '../const/bot';

async function getUsers() {
    return new Promise(function (resolve, reject) {
        MdapSkyNet.users.list(function (err, info) {
            if (err) {
                console.log('Something went wrong while fetching the user list \n')
                console.log('Error:', err);
                reject(err);
            } else {
                let users = [];
                for (let i in info.members) {
                    users.push({ name: info.members[i].name, id: info.members[i].id, stars: '' });
                }
                resolve(users);
            }
        });
    })
}

async function getChannels() {
    return new Promise(function (resolve, reject) {
        MdapSkyNet.channels.list(function (err, info) {
            if (err) {
                console.log('Something went wrong while fetching the channel list \n')
                console.log('Error:', err);
                reject(err);
            } else {
                let channels = [];
                for (let i in info.channels) {
                    channels.push({ name: info.channels[i].name, id: info.channels[i].id });
                }
                resolve(channels);
            }
        });
    })
}
async function initializeData() {
    console.log(`Fetching users & channels ...`);
    console.log(`DONE !
    `);
    let users = await getUsers();
    let channels = await getChannels();
    return { users, channels }
}

export default { initializeData, getUsers, getChannels }

