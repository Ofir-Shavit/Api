import express from 'express';
import logger from 'morgan';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(cors());

app.get('/', (req, res) => {
    const {query: {name}} = req;
    res.send(`Good luck ${name || 'Ofir'}!`);
});

const port = 80;

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});
