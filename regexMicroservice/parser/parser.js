const parser = require('./gramatica');
const worker = require('worker_threads');
const capcon = require('capture-console');

let regex = worker.workerData;

console.log("Multithreading enabled")

async function parseRegex (regex) {

    var captures = capcon.captureStdio(async function scope() {
        try {
            await parser.parse(`Evaluar[${regex}];`);
        } catch ( err )  {
            console.log("Error");
        }
        
    })
    return captures.stdout;
}

parseRegex(regex)
    .then( resultado => {
        worker.parentPort.postMessage(resultado);
    }).catch( err => {
        worker.parentPort.postMessage(err);
    })