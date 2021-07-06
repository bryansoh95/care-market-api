const body_parser = require('body-parser');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const routes = require('./app/routes');

const app = express();
const assetsDir = path.join(__dirname, '/app/assets');
const storage = multer.diskStorage({
    destination: './app/assets',
    filename: (req, file, next) => {
        next(
            null,
            `${Date.now() + i}.${file.mimetype.split('/')[1]}`
        );
        i++;
    },
});

app.use(cors());
app.options('*', cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(routes);
app.use(multer({ storage }).any());
app.use('/assets', express.static(assetsDir));

module.exports = app;