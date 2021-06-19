import express from 'express';
import logger from 'morgan';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(cors());

app.get('/profile', (req, res) => {

    const name = 'Ofir';
    const imageUrl = 'https://lh3.googleusercontent.com/ogw/ADea4I5RiXp7B5h-rbB2ESdTxDs37KdJZwN9N-0nkTeNHfI=s192-c-mo';

    res.json({name, imageUrl});

});

const port = 8080;

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});
