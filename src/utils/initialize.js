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
                console.log(`
            *******************
            -------------------
            LISTING USERS
            `)
                for (let i in info.members) {
                    users.push({ name: info.members[i].name, usrId: info.members[i].id, stars: '' });
                }
                console.log(users);
                console.log(`
            DONE
            -------------------
            *******************
            `)
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
                console.log(`
                *******************
                -------------------
                STARTING TO 
                LIST CHANNELS
                `)
                for (let i in info.channels) {
                    channels.push({ name: info.channels[i].name, id: info.channels[i].id });
                }
                console.log(channels);
                console.log(`
                FINISHED
                LISTING CHANNELS
                -------------------
                *******************
                `)
                resolve(channels);
            }
        });
    })
}
async function initializeData() {
    let users = await getUsers();
    let channels = await getChannels();
    return { users, channels }
}

export default { initializeData, getUsers, getChannels }

