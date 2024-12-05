const express = require('express');
const rateLimiter = require('express-rate-limit');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 6000;

// Rate limiter middleware
const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000, // 1-minute window
    max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
    message: "You have exceeded the request limit.\n",
});

const users = [];

// Middleware
app.use(express.json());
app.use(limiter);

app.use((req, res, next) => {
    console.log('Middleware 1 executed');
    req.user = { name: 'purush', age: 22 };
    next();
});

app.use((req, res, next) => {
    console.log('Middleware 2 executed');
    next();
});

// Root route
app.get('/', (req, res) => {
    res.send(JSON.stringify(req.user));
});

// Route for user registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    console.log('Hashed Password:', hashedPassword);

    users.push({ username, password: hashedPassword });
    res.status(201).send('User Registered');
});

// Route for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).send("Invalid username or password.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password); // Compare input password with hashed password

    if (isPasswordMatch) {
        res.status(200).send('User Logged in');
    } else {
        res.status(401).send("Invalid username or password.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is listening on port: ' + PORT);
});
