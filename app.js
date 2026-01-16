/*
CONFIGURATIONS & IMPORTS
*/
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

// Temporary in-memory store (Will be replaced by MongoDB later)
let tasks = [
    { id: 1, title: 'Task One', completed: false },
    { id: 2, title: 'Task Two', completed: true },
    { id: 3, title: 'Task Three', completed: false },
];

/*
MIDDLEWARES
*/
app.use(morgan('dev'));
app.use(express.json());

/*
ROUTES
*/
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

/*
ERROR HANDLING
*/


/*
START SERVER
*/
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});