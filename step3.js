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

function catWrite(path, filename) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n${err}`);
            process.exit(1);
        }
        fs.writeFile(filename, data, 'utf8', (err, data) => {
            if (err) {
                console.error(`Couldn't write ${filename}:\n${err}`);
                process.exit(1);
            }
        })
        }
    )
    
}

function webCatWrite(path, filename) {
    axios.get(path)
    .then((data) => {
        fs.writeFile(filename, data.data, 'utf8', (err, data) => {
            if (err) {
                console.error(`Couldn't write ${filename}:\n${err}`);
                process.exit(1);
            }
        })
    })
    .catch((err) => {
        console.error(`Error fetching ${path}:\n${err}`);
        process.exit(1);
    })
}




if (process.argv[2] == "--out" && process.argv[4].startsWith("http")) {
    webCatWrite(process.argv[4], process.argv[3])
}
else if (process.argv[2] == "--out") {
    catWrite(process.argv[4], process.argv[3])
}
else if (process.argv[2].startsWith("http")) {
    webCat(process.argv[2]);
}
else {
    cat(process.argv[2]);
}