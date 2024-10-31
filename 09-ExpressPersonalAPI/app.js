const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// In-memory storage
let names = [];
let tasks = [];

// GET: Root path
app.get('/', (req, res) => {
    // Render index.ejs instead of sending index.html
    res.render('index', { 
        locals: {
            error: null,
            greetingMessage: null,
            names: names,
            tasks: tasks
        } 
    });
});

// GET: Greet
app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name);
    }
    const greetingMessage = `Hello ${name}!`;
    res.render('index', { 
        locals: {
            error: null,
            greetingMessage: greetingMessage,
            names: names,
            tasks: tasks
        }
    });
});

// GET: Wazzup page
app.get('/greet/:index', (req, res, next) => {
    const index = req.params.index;
    if (index >= 0 && index < names.length) {
        res.render('wazzup', { name: names[index] });
    } else {
        const error = "Name index out of range!";
        next(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.render('index', { 
        locals: {
            error: err,
            greetingMessage: null,
            names: names,
            tasks: tasks
        } 
    });
});

// POST: Task
app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});

// GET: Task list (for Postman)
app.get('/task', (req, res) => {
    res.json(tasks);
});

// DELETE: Task
app.delete('/task/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.redirect('/');
});

// PUT: Add name (for Postman)
app.put('/greet/:name', (req, res) => {
    const name = req.params.name;
    if (name) {
        names.push(name);
    }
    res.json(names);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
