require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.argv[2] || 3001;
const connectDB = require('./config/db');
const routerHi = require('./routes/main');
const routerDocs = require('./routes/documents-route');
const routerUsers = require('./routes/users-route');

//Apply cookie-parser middleware
app.use(cookieParser());
//Run the PresentationTier
app.use(express.static(__dirname + '/../PresentationTier/react-ui/build'))
//Parse requests of content-type - application/json
app.use(express.json());
//Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost', // NGINX server as the origin
    credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

//Connect to DB
connectDB();

//Configure routes
app.use('/', routerHi);
app.use('/api/documents', routerDocs);
app.use('/api/users', routerUsers);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});