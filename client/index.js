let logs = $('.logs');

console.log(getData());

async function getData() {
    let data = await fetch('http://localhost:3001/');
    return data;
}