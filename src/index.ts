import {OAuth2Client} from 'google-auth-library';
import * as http from 'http';
import config from '../config/config';
import {upsertUser} from './db';
import {Server} from 'socket.io';
import app from './loaders/app';

declare module 'express-session' {
    export interface Session {
        userId: string;
    }
}

const authClient = new OAuth2Client(config.googleClientId);

const server = http.createServer(app);
const io = new Server(server, {cors: config.cors});

app.get('/', (req, res) => {
    res.send({response: 'I am alive'}).status(200);
});

io.on('connection', (socket => {
    console.log('A user connected!');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('message', (message) => {
       socket.emit('message',message)
    });

}));

app.post('/auth', async (req, res) => {

    const {tokenId} = req.body;

    const ticket = await authClient.verifyIdToken({
        idToken: tokenId,
        audience: config.googleClientId
    });
    const {name, email, picture} = ticket.getPayload();

    const user = await upsertUser(email, name, picture);

    req.session.userId = user.id;

    res.status(201).json(user);

});

server.listen(config.port, () => {
    console.log(`App is listening on port ${config.port}!`);
});
