// server.js
const cors = require('cors')
const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express(

)
const router = express.Router();
const wss = new WebSocket.Server({port: 36969});

const SUCCESS = 'SUCCESS'
const WARNING = 'WARNING'
const FAIL = 'FAIL'

class Message {
    constructor(id, type, title, content, lastSentAt) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.content = content;
        this.lastSentAt = lastSentAt;
    }
}

router.get('/api/notifications', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('"GET"');
});

router.post('/api/notifications', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('"POST"');
});

router.put('/api/notifications/:id', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.params.id);
    res.send('"PUT"');
});

router.delete('/api/notifications/:id', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.params.id);
    res.send('"DELETE"');
});

app.use('/', router)

app.use(cors({origin: 'http://localhost:19006', credentials: true}));

app.listen(46969, () => {
    console.log('loaded');
});

let messages = {};
let connectionCounter = 0;
let logServer = '';

wss.on('connection', ws => {
    let wsNumber = connectionCounter++;
    messages[wsNumber] = [];
    ws.on('message', message => {
        let messageData = JSON.parse(message);
        if (messageData.message === "Pong") {
            ws.send(JSON.stringify(new Message(1, SUCCESS, "Ping", messageData.id, Date.now())))
        } else {
            console.log("wsn", wsNumber);
            if (messageData.date != '') {
                let [year, month, day] = messageData.date.split("-");
                let sendDate = new Date(year, month, day, 0, 0, 0);
                sendByDate(ws, sendDate.getTime()-Date.now());
            }
            for (let x in messages) {
                if (messages.hasOwnProperty(x)) {
                    if (x != wsNumber) {
                        messages[x].push(new Message(1, SUCCESS, message.toString('utf8'), "some text", Date.now()));
                    }
                }
            }
            // console.log(messages)
            logServer += message + ' ';

            // let seconds = parseInt(messageData.message);
            // console.log(`Received message => ${message}`);
            // if(!isNaN(seconds)) {
            //     sendByDate(ws, seconds);
            // }
        }
    })
    broadCastMessage(ws, wsNumber);

    // ws.send(JSON.stringify(new Message(1, SUCCESS, 'Hello! Message 1!!', "xD", Date.now())));
    // ws.send('Message 2!!');
});

async function broadCastMessage(ws, wsNumber) {
    while (true) {
        if (messages[wsNumber].length === 0) {
        }
        for (let i = 0; i < messages[wsNumber].length; i++) {
            ws.send(JSON.stringify(messages[wsNumber][i]));
        }
        messages[wsNumber] = [];
        await sleep(3000);
    }
}


function sleep(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, milliseconds)
    });
}

async function sendByDate(ws, seconds) {
    let DN = Date.now();
    while (Date.now() < DN + seconds * 1000) {
        await sleep(100);
    }
    ws.send(JSON.stringify(new Message(1, SUCCESS, logServer, "xD", Date.now())));
}
