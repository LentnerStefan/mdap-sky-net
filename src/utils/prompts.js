import inquirer from 'inquirer';
import actions from '../const/actions';

let promptUser = (usrList) => {
    return new Promise(function (resolve, reject) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'user_name',
                message: 'Which user ?',
                choices: usrList
            },
        ]).then(function (answers) {
            resolve(answers.user_name)
        }, (err) => {
            reject(err)
        }
            );
    })
}

let promptChannel = (channelList) => {
    return new Promise(function (resolve, reject) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'user_name',
                message: 'Wich channel ?',
                choices: channelList
            },
        ]).then(function (answers) {
            resolve(answers.user_name)
        }, (err) => {
            reject(err)
        }
            );
    })
}

let promptMessage = () => {
    return new Promise(function (resolve, reject) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'text_message',
                message: 'Text to send ?'
            },
        ]).then(function (answers) {
            resolve(answers.text_message);
        }, (err) => {
            reject(err)
        }
            );
    })
}

let promptAction = () => {
    return new Promise(function (resolve, reject) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do ?',
                choices: actions
            },
        ]).then(function (answers) {
            resolve(answers.action);
        }, (err) => {
            reject(err)
        }
            );
    })
}



let promptMsgCount = () => {
    return new Promise(function (resolve, reject) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'count',
                message: 'How many messages to you want to display ?'
            },
        ]).then(function (answers) {
            resolve(answers.count);
        }, (err) => {
            reject(err)
        }
            );
    })
}


let promptChannelsOrUsers = () => {
    return new Promise(function (resolve, reject) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Channel or user ?',
                choices: ['channels','users']
            },
        ]).then(function (answers) {
            resolve(answers.choice)
        }, (err) => {
            reject(err)
        }
            );
    })
}

let promptImageLink = () => {
    return new Promise(function (resolve, reject) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'image_link',
                message: 'Image link ?'
            },
        ]).then(function (answers) {
            resolve(answers.image_link);
        }, (err) => {
            reject(err)
        }
            );
    })
}




export default { promptChannel, promptUser, promptMessage, promptAction,promptMsgCount, promptChannelsOrUsers, promptImageLink }