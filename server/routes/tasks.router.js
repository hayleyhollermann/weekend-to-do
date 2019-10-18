const express = require('express');
const taskRouter = express.Router();

const pool = require ('../modules/pool.js');

taskRouter.get('/', (req, res) => {
    console.log('in GET');
    // selecting all columns from tasks table in database
    const query = 'SELECT * FROM tasks ORDER BY "id";';
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making GET query', error);
        res.sendStatus(500);        
    });
});

taskRouter.post('/', (req, res) => {
    console.log('in POST');
    // adding new task to tasks table in database
    const query = `INSERT INTO "tasks" ("task")
	VALUES($1);`;
    pool.query(query, [req.body.task])
    .then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error making insert query', error);
        res.sendStatus(500);        
    });
})

module.exports = taskRouter;