import express  = require('express');
import path     = require('path');
import cluster  = require('cluster');
import os       = require('os');

import indexPage from './indexPage';
import staticFiles from './staticFiles';

const isProduction = process.env['NODE_ENV'] == 'production';

switch (true) {
    case isProduction && cluster.isMaster:
        masterSection();
        break;

    case isProduction && !cluster.isMaster:
        workerSection();
        break;

    case !isProduction:
        workerSection();
        break;
}

function masterSection() {
    // Count the machine's CPUs
    const cpuCount = os.cpus().length;
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker, code, signal) {
        // Replace the dead worker, we're not sentimental
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        cluster.fork();
    });
}

function workerSection() {
    const app = express();

    // Display the index.html file
    app.get('/', indexPage);

    // load the static file service - this is dependent on the NODE_ENV
    staticFiles(app);

    app.listen(3000, function() {
        if (isProduction)
            console.log('Worker %d running!', cluster.worker.id);
        else {
            console.log('===>   Starting Server . . . . .');
            console.log('===>   Environment: ' + process.env['NODE_ENV']);
        }

    });
}
