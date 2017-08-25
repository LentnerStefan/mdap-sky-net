import inquirer from 'inquirer';

let actions=[
    'Show user list',
    'Show channel list',
    'Show channel history',
    'Show Hall of Fame',
    new inquirer.Separator(),
    'Send a message',
    'Send an image',
    new inquirer.Separator(),
    'Exit',
    new inquirer.Separator()
  ];

export default actions;