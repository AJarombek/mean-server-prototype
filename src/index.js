
const http = require('http');
const app = require('./app');

const server = http.createServer(3000);
let currentApp = app;
server.listen(3000);

if (module.hot) {
    module.hot.accept('./app', () => {
        changeListener();
    });
    module.hot.accept('./route/authRouter', () => {
        changeListener();
    });
}

function changeListener() {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
}