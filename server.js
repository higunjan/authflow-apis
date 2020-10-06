require('rootpath')();
require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('helpers/jwt');
const errorHandler = require('helpers/error-handler');
const multer  = require('multer');
const path = require('path');

app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(bodyParser.json({limit: '500mb'}));

app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// storage, location everything
let storage = multer.diskStorage({
    destination: './upload/',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

global.UPLOAD_FILE = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

// api routes
let componentList = ['users'];
componentList.forEach((ele) => {
    app.use(`/api/v1/${ele}`, require(`./component/${ele}/${ele}.controller`));
})


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : (process.env.PORT || 8000);
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
