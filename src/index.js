import './scss/index.scss'


async function start(params) {
    return await Promise.resolve(`sync working`);
}


start().then(console.log)