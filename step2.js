const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n${err}`);
            process.exit(1);
        }
        console.log(data)
        }
    )
}

function webCat(path) {
    axios.get(path)
    .then((data) => {
        console.log(data.data)
    })
    .catch((err) => {
        console.error(`Error fetching ${path}:\n${err}`);
        process.exit(1);
    })
}

if (process.argv[2].startsWith("http")) {
    webCat(process.argv[2]);
}
else {
    cat(process.argv[2]);
}