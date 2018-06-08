fs = require('fs');

options = {};
ftpSyncOptions = {};
clientDir = "";

process.argv.forEach((val, i, array) => {
    if (i == 2) {
        if (val.indexOf(val.length - 1) != '/') val += '/';
        clientDir = val;
    }
})

fs.readFile('options.json', 'utf8', (err, data) => {
    if (err) return console.log("Error: ", err);

    options = JSON.parse(data);
    ftpSyncOptions = options.ftpSyncDefaults;

    createOptionsFile();
})

function createOptionsFile() {
    if (clientDir == "") return console.log("You need to pass the directory to create the file to as a parameter");

    var ftpSyncNewOptions = Object.assign({}, ftpSyncOptions);
    ftpSyncNewOptions.remotePath = clientDir.substr(options.basePathToIgnore.length);
    console.log(ftpSyncNewOptions);
    

    var vscodeClientDir = clientDir + ".vscode/";
    fs.mkdirSync(vscodeClientDir);
    
    fs.open(vscodeClientDir + "ftp-sync.json", "w", (err, fd) => {
      fs.writeFile(fd, JSON.stringify(ftpSyncNewOptions), err => {
        console.log(err);
      });
    });
}