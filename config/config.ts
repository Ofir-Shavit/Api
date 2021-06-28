const {GOOGLE_CLIENT_ID} = process.env;

export default {
    port: 8080,
    secret: 'keyboard cat',
    cors: {origin: `http://localhost`},
    googleClientId: GOOGLE_CLIENT_ID || '',
};