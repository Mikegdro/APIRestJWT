const parser = require('./parser/gramatica');

async function parseRegex (arg) {
    let parsed = await parser.parse(`Evaluar[${regex.regex}];`);
    return parsed;
}

parseRegex(arg)
    .then( resultado => {
        postMessage(resultado)
    }).catch( err => {
        postMessage(err);
    })