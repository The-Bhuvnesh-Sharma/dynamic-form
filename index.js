import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// Determine the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const limiter = rateLimit({
    windowMs: 1000,
    max: 250,
    message: 'Too many requests from this IP, please try again later'
});

// Middleware
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
    }
    next();
});

app.use(
    session({
        secret: '77c52466decd45648942',
        resave: false,
        saveUninitialized: false
    })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Step 1: Display the field selection page
// app.get('/', (req, res) => {
//     res.render('index');
// });


app.post('/submit-loan', (req, res) => {
    const formData = req.body;
    console.log('Form Data:',  JSON.stringify(formData) );
    
    res.send('Loan application received!');
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Start the server
const port = 3009;
const API_URL = `http://localhost:${port}`;

app.listen(port, () => {
    console.warn(`Server started on port ${API_URL}`);
});
